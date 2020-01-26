import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SubtreeProvider, RenderingArea, RenderToArea } from '../.';

const App = () => {
  return (
    <SubtreeProvider>
      <h2>App testing</h2>
      <div style={{ border: '2px solid' }}>
        <RenderingArea areaId="main" />
      </div>
      <RenderToArea areaId="main">
        <p>hey</p>
      </RenderToArea>
    </SubtreeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
