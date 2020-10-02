import * as React from 'react';
import { RenderArea } from '../../.';

export function Layout() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.5fr 1.5fr',
        gridGap: 15,
        maxWidth: 400,
      }}
    >
      <div style={{ border: '1px solid' }}>
        <h3>Nav</h3>
        <RenderArea name="navigation"></RenderArea>
      </div>
      <div style={{ border: '1px solid' }}>
        <h3>Main</h3>
        <RenderArea name="main"></RenderArea>
      </div>
    </div>
  );
}
