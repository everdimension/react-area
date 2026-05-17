import type { ReactNode } from 'react';
import { Content, RenderArea } from '../../src';

export function Demo({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="demo">
      <header className="demo-head">
        <h2 className="demo-title">
          <span className="demo-index">{index}</span>
          {title}
        </h2>
        <p className="demo-desc">{description}</p>
      </header>
      <div className="demo-stage">{children}</div>
    </section>
  );
}

export function TreeNode({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  return (
    <div className="node">
      <span className="node-label">{label}</span>
      <div className="node-body">{children}</div>
    </div>
  );
}

export function Slot({ area }: { area: string }) {
  return (
    <div className="slot">
      <span className="slot-tag">{`<RenderArea name="${area}" />`}</span>
      <div className="slot-body">
        <RenderArea name={area} />
      </div>
    </div>
  );
}

export function DeclaredContent({
  area,
  from,
  tone,
  children,
}: {
  area: string;
  from: string;
  tone: number;
  children: ReactNode;
}) {
  return (
    <>
      <span className="marker" data-tone={tone}>
        {`<Content name="${area}" />`}
      </span>
      <Content name={area}>
        <div className="payload" data-tone={tone}>
          <span className="payload-from">{from}</span>
          <span>{children}</span>
        </div>
      </Content>
    </>
  );
}
