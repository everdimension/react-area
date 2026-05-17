import { useState } from 'react';
import { AreaProvider } from '../../src';
import { Demo, TreeNode, Slot, DeclaredContent } from '../components/visuals';

const TONES = [1, 2, 3, 4, 5];
const MAX_FEATURES = 5;

export function AddRemoveDemo() {
  const [count, setCount] = useState(2);

  return (
    <Demo
      index="04"
      title="Add and remove features live"
      description="Mounting or unmounting a feature registers or removes its Content immediately. The declaration marker and the rendered payload appear and disappear together."
    >
      <div className="controls">
        <button
          type="button"
          onClick={() => setCount((c) => Math.min(MAX_FEATURES, c + 1))}
          disabled={count >= MAX_FEATURES}
        >
          + add feature
        </button>
        <button
          type="button"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          disabled={count <= 0}
        >
          − remove feature
        </button>
        <span className="controls-status">
          {count} feature{count === 1 ? '' : 's'} mounted
        </span>
      </div>
      <AreaProvider>
        <TreeNode label="<AreaProvider>">
          <TreeNode label="<Panel>">
            <Slot area="widgets" />
          </TreeNode>
          {Array.from({ length: count }, (_, index) => {
            const label = `<Widget${index + 1}Feature>`;
            return (
              <TreeNode key={index} label={label}>
                <DeclaredContent
                  area="widgets"
                  from={label}
                  tone={TONES[index % TONES.length]}
                >
                  Widget {index + 1}
                </DeclaredContent>
              </TreeNode>
            );
          })}
        </TreeNode>
      </AreaProvider>
    </Demo>
  );
}
