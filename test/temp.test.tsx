import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SubtreeProvider } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubtreeProvider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
