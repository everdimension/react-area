import { BasicDemo } from './demos/BasicDemo';
import { MultipleDemo } from './demos/MultipleDemo';
import { FanOutDemo } from './demos/FanOutDemo';
import { AddRemoveDemo } from './demos/AddRemoveDemo';

export function App() {
  return (
    <div className="page">
      <header className="page-head">
        <h1 className="page-title">react-area</h1>
        <p className="page-sub">
          Slot-fill behavior demos. Each outlined box is a component in the
          React tree. Dashed boxes are slots; solid colored boxes are content.
        </p>
        <div className="legend">
          <span className="legend-item">
            <span className="legend-swatch legend-slot" />
            RenderArea — a named slot
          </span>
          <span className="legend-item">
            <span className="legend-swatch legend-content" />
            Content — fills a slot
          </span>
          <span className="legend-item">
            matching color = one content, shown at both sites
          </span>
        </div>
      </header>
      <main className="gallery">
        <BasicDemo />
        <MultipleDemo />
        <FanOutDemo />
        <AddRemoveDemo />
      </main>
    </div>
  );
}
