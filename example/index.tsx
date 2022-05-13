import * as React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AreaProvider, RenderArea, Content } from '../src/index';
import { Layout } from './LayoutApp/Layout';
import { Feature1 } from './LayoutApp/Feature1';
import { Feature2 } from './LayoutApp/Feature2';
import { TestComponent } from './TestComponent';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

function Main() {
  const [showArea, setShowArea] = useState(true);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);

  return (
    <div>
      <h2>App testing</h2>
      <div style={{ border: '2px solid', margin: 20, padding: 10 }}>
        <h3>
          First area{' '}
          <button onClick={() => setShowArea(!showArea)}>toggle</button>
        </h3>
        {showArea ? <RenderArea name="one" /> : null}
      </div>
      <Content name="one">
        <p>hello</p>
      </Content>
      <Content name="one">
        <p>world</p>
      </Content>
      <div style={{ border: '2px solid', margin: 20, padding: 10 }}>
        <RenderArea name="two">
          {(components) => (
            <>
              <h3>Second area: {components.length} elements rendered</h3>
              <button onClick={() => setShow2(!show2)}>toggle content</button>
              {components}
            </>
          )}
        </RenderArea>
        <button onClick={() => setShow1(!show1)}>toggle show1</button>
      </div>

      <div>
        <Content name="two">
          just text
          <p>world</p>
        </Content>
        {show1 ? (
          <Content name="two">
            <div>This should be first</div>
          </Content>
        ) : null}
        <Content name="two">
          {show2 ? <div>This should be second</div> : null}
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
            test1 test3; prev visible: {String(show2)}
          </TestComponent>
        </Content>
        <Content name="three">
          <TestComponent name="test2">test2</TestComponent>
        </Content>
        <Content name="three">
          <TestComponent name="test3">
            test3; prev visible: {String(show2)}
          </TestComponent>
        </Content>
      </div>
      <div>
        <Layout />
        <Feature1 />
        <Feature2 />
      </div>
    </div>
  );
}

function TestRenderCallback() {
  const { pathname } = useLocation();
  console.log('rendering TestRenderCallback');
  return (
    <div>
      <RenderArea
        name="testRenderCallback"
        children={(components) => {
          console.log(pathname, components.length);
          return <div>We have {components.length} components</div>;
        }}
      ></RenderArea>
      <Routes>
        <Route
          path="1"
          element={
            <div>
              Start <Link to="/test2/2">Go to 2</Link>
            </div>
          }
        ></Route>
        <Route
          path="2"
          element={
            <div>
              Finish
              <Content name="testRenderCallback">content</Content>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

const App = () => {
  return (
    <AreaProvider>
      <BrowserRouter>
        <Link to="/">Main</Link> <Link to="/test2/1">Test2...</Link>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test2/*" element={<TestRenderCallback />} />
        </Routes>
      </BrowserRouter>
    </AreaProvider>
  );
};

createRoot(document.getElementById('root')).render(<App />);
