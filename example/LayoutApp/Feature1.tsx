import * as React from 'react';
import { useState } from 'react';
import { Content } from '../../src';
import { TestComponent } from '../TestComponent';

export const Feature1: React.FunctionComponent<{}> = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <>
      <Content name="navigation">
        <TestComponent name="nav1">
          <div>nav1 {enabled ? 'on' : 'off'}</div>
        </TestComponent>
      </Content>
      <Content name="settings">
        <TestComponent name="settings1">
          <label>
            <input
              type="checkbox"
              checked={enabled}
              onChange={event => {
                setEnabled(event.target.checked);
              }}
            />{' '}
            feature1
          </label>
        </TestComponent>
      </Content>
    </>
  );
};
