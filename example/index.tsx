import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { AreaProvider, RenderArea, Content } from '../.';

const App = () => {
  const [show, setShow] = useState(false);
  return (
    <AreaProvider>
      <h2>App testing</h2>
      <div style={{ border: '2px solid', margin: 20, padding: 10 }}>
        <h3>First area</h3>
        <RenderArea areaId="one" />
      </div>
      <Content areaId="one">
        <p>hello</p>
      </Content>
      <Content areaId="one">
        <p>world</p>
      </Content>
      <div style={{ border: '2px solid', margin: 20, padding: 10 }}>
        <RenderArea areaId="two">
          {components => (
            <>
              <h3>Second area: {components.length} elements rendered</h3>
              <button onClick={() => setShow(!show)}>toggle content</button>
              {components}
            </>
          )}
        </RenderArea>
      </div>

      <div>
        <Content areaId="two">
          just text
          <p>world</p>
        </Content>
        <Content areaId="two">
          <div>This should be first</div>
        </Content>
        {show ? (
          <Content areaId="two">
            <div>This should be second</div>
          </Content>
        ) : null}
        <Content areaId="two">
          <div>This should be last</div>
        </Content>
      </div>
    </AreaProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
