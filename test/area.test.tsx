import { describe, it, expect } from 'vitest';
import { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import {
  AreaProvider,
  RenderArea,
  Content,
  createRenderingPair,
} from '../src';

function Slot({ name }: { name: string }) {
  return (
    <div data-testid={`slot-${name}`}>
      <RenderArea name={name} />
    </div>
  );
}

function getSlotText(name: string) {
  return screen.getByTestId(`slot-${name}`).textContent ?? '';
}

describe('react-area', () => {
  it('renders Content into the matching RenderArea slot', () => {
    render(
      <AreaProvider>
        <Slot name="toolbar" />
        <Content name="toolbar">Save</Content>
      </AreaProvider>,
    );

    expect(getSlotText('toolbar')).toBe('Save');
  });

  it('renders multiple Contents into one area in render order', () => {
    render(
      <AreaProvider>
        <Slot name="toolbar" />
        <Content name="toolbar">A</Content>
        <Content name="toolbar">B</Content>
        <Content name="toolbar">C</Content>
      </AreaProvider>,
    );

    expect(getSlotText('toolbar')).toBe('ABC');
  });

  it('keeps multiple areas independent', () => {
    render(
      <AreaProvider>
        <Slot name="left" />
        <Slot name="right" />
        <Content name="left">L</Content>
        <Content name="right">R</Content>
      </AreaProvider>,
    );

    expect(getSlotText('left')).toBe('L');
    expect(getSlotText('right')).toBe('R');
  });

  it('renders nothing when no Content targets the area', () => {
    render(
      <AreaProvider>
        <Slot name="empty" />
      </AreaProvider>,
    );

    expect(getSlotText('empty')).toBe('');
  });

  it('removes Content when it unmounts', () => {
    function Harness({ show }: { show: boolean }) {
      return (
        <AreaProvider>
          <Slot name="toolbar" />
          <Content name="toolbar">Keep</Content>
          {show ? <Content name="toolbar">Removable</Content> : null}
        </AreaProvider>
      );
    }

    const { rerender } = render(<Harness show={true} />);
    expect(getSlotText('toolbar')).toBe('KeepRemovable');

    rerender(<Harness show={false} />);
    expect(getSlotText('toolbar')).toBe('Keep');
  });

  it('re-renders the area when a Content updates its children', () => {
    let setLabel!: (value: string) => void;
    function Updating() {
      const [label, set] = useState('first');
      setLabel = set;
      return <Content name="toolbar">{label}</Content>;
    }

    render(
      <AreaProvider>
        <Slot name="toolbar" />
        <Updating />
      </AreaProvider>,
    );

    expect(getSlotText('toolbar')).toBe('first');

    act(() => {
      setLabel('second');
    });

    expect(getSlotText('toolbar')).toBe('second');
  });

  it('supports the render-prop form of RenderArea', () => {
    render(
      <AreaProvider>
        <div data-testid="slot-list">
          <RenderArea name="list">
            {(components) => <ul>{components.map((c, i) => <li key={i}>{c}</li>)}</ul>}
          </RenderArea>
        </div>
        <Content name="list">one</Content>
        <Content name="list">two</Content>
      </AreaProvider>,
    );

    const items = screen.getByTestId('slot-list').querySelectorAll('li');
    expect(Array.from(items).map((li) => li.textContent)).toEqual([
      'one',
      'two',
    ]);
  });

  it('renders deferred Content once its RenderArea appears later', () => {
    function Harness({ showArea }: { showArea: boolean }) {
      return (
        <AreaProvider>
          {showArea ? <Slot name="late" /> : null}
          <Content name="late">deferred</Content>
        </AreaProvider>
      );
    }

    const { rerender } = render(<Harness showArea={false} />);
    expect(screen.queryByText('deferred')).toBeNull();

    rerender(<Harness showArea={true} />);
    expect(getSlotText('late')).toBe('deferred');
  });

  it('inserts a late-mounted Content at its tree position, not at the end', () => {
    function Harness({ showFirst }: { showFirst: boolean }) {
      return (
        <AreaProvider>
          <Slot name="toolbar" />
          {showFirst ? <Content name="toolbar">First</Content> : null}
          <Content name="toolbar">Second</Content>
        </AreaProvider>
      );
    }

    const { rerender } = render(<Harness showFirst={false} />);
    expect(getSlotText('toolbar')).toBe('Second');

    rerender(<Harness showFirst={true} />);
    expect(getSlotText('toolbar')).toBe('FirstSecond');
  });

  it('restores tree order when a middle Content is unmounted and remounted', () => {
    function Harness({ showMiddle }: { showMiddle: boolean }) {
      return (
        <AreaProvider>
          <Slot name="toolbar" />
          <Content name="toolbar">A</Content>
          {showMiddle ? <Content name="toolbar">B</Content> : null}
          <Content name="toolbar">C</Content>
        </AreaProvider>
      );
    }

    const { rerender } = render(<Harness showMiddle={true} />);
    expect(getSlotText('toolbar')).toBe('ABC');

    rerender(<Harness showMiddle={false} />);
    expect(getSlotText('toolbar')).toBe('AC');

    rerender(<Harness showMiddle={true} />);
    expect(getSlotText('toolbar')).toBe('ABC');
  });

  it('does not re-render Content output when the parent re-renders with stable children', () => {
    let renderCount = 0;
    function Recorder() {
      renderCount += 1;
      return <span>recorder</span>;
    }
    const stableElement = <Recorder />;

    function Harness({ tick }: { tick: number }) {
      return (
        <AreaProvider>
          <Slot name="x" />
          <Content name="x">{stableElement}</Content>
          <span data-testid="tick">{tick}</span>
        </AreaProvider>
      );
    }

    const { rerender } = render(<Harness tick={0} />);
    expect(screen.getByText('recorder')).toBeTruthy();
    const baseline = renderCount;

    rerender(<Harness tick={1} />);
    rerender(<Harness tick={2} />);

    expect(screen.getByTestId('tick').textContent).toBe('2');
    expect(renderCount).toBe(baseline);
  });

  it('createRenderingPair produces a bound RenderArea/Content pair', () => {
    const { RenderArea: ToolbarArea, Content: ToolbarContent } =
      createRenderingPair('toolbar');

    render(
      <AreaProvider>
        <div data-testid="slot-toolbar">
          <ToolbarArea />
        </div>
        <ToolbarContent>Bound</ToolbarContent>
      </AreaProvider>,
    );

    expect(screen.getByTestId('slot-toolbar').textContent).toBe('Bound');
  });
});
