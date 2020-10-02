import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { AreaProvider, RenderArea, Content } from '../.';
import { Layout } from './LayoutApp/Layout';
import { Feature1 } from './LayoutApp/Feature1';
import { Feature2 } from './LayoutApp/Feature2';
import { TestComponent } from './TestComponent';

const App = () => {
  const [show, setShow] = useState(false);
  return (
    <AreaProvider>
      <h2>App testing</h2>
      <div style={{ border: '2px solid', margin: 20, padding: 10 }}>
        <h3>First area</h3>
        <RenderArea name="one" />
      </div>
      <Content name="one">
        <p>hello</p>
      </Content>
      <Content name="one">
        <p>world</p>
      </Content>
      <div style={{ border: '2px solid', margin: 20, padding: 10 }}>
        <RenderArea name="two">
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
        <Content name="two">
          just text
          <p>world</p>
        </Content>
        <Content name="two">
          <div>This should be first</div>
        </Content>
        <Content name="two">
          {show ? <div>This should be second</div> : null}
        </Content>
        <Content name="two">
          <div>This should be last</div>
        </Content>
      </div>

      <div style={{ border: '2px solid magenta' }}>
        <RenderArea name="three" />
      </div>

      <div>
        <Content name="three">
          <TestComponent name="test1">
            test1 test3; prev visible: {String(show)}
          </TestComponent>
        </Content>
        <Content name="three">
          <TestComponent name="test2">test2</TestComponent>
        </Content>
        <Content name="three">
          <TestComponent name="test3">
            test3; prev visible: {String(show)}
          </TestComponent>
        </Content>
      </div>
      <div>
        <Layout />
        <Feature1 />
        <Feature2 />
      </div>
    </AreaProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
