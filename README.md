# React Area

_NOTE_: For now, this is an experimental Proof of Concept.

## Install

```
npm install react-area
```

## Getting Started

First, wrap your app in the `<AreaProvider />` component:

```js
import { AreaProvider } from 'react-area';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(
  <AreaProvider>
    <YourApp />
  </AreaProvider>,
  document.getElementById('root'),
);
```

Next, anywhere in your app you can define an "render area" with a `<RenderArea />` component:

```js
import { RenderArea } from 'react-area';
import React from 'react';

function Layout() {
  return (
    <div>
      <aside>
        <RenderArea name="navigation" />
      </aside>
      <main>
        <RenderArea name="main" />
      </main>
    </div>
  );
}
```

And then, from any other component you can render inside those areas
by using the `<Content />` component:

```js
import { Content } from 'react-area';
import React from 'react';

function SomeFeature() {
  return (
    <>
      <Content name="navigation">
        <a href="/some-feature">SomeFeature</a>
      </Content>

      <Content name="main">
        <div>Feature Content</div>
      </Content>
    </>
  );
}
```

## Prior Art

This project is heavily inspired by these projects:

- Slot Fill by Cam West: https://github.com/camwest/react-slot-fill
- SlotFill by wordpress: https://github.com/WordPress/gutenberg/tree/master/packages/components/src/slot-fill
