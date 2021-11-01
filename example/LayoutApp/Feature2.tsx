import * as React from 'react';
import { useState } from 'react';
import { Content, RenderArea } from '../../src';
import { TestComponent } from '../TestComponent';

export const Feature2: React.FunctionComponent<{}> = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <>
      <Content name="navigation">
        <TestComponent name="nav2">nav2 {enabled ? 'on' : 'off'}</TestComponent>
      </Content>
      <Content name="settings">
        <TestComponent name="settings2">
          <label>
            <input
              type="checkbox"
              checked={enabled}
              onChange={event => {
                setEnabled(event.target.checked);
              }}
            />{' '}
            feature2
          </label>
        </TestComponent>
      </Content>

      <Content name="main">
        <RenderArea name="settings"></RenderArea>
      </Content>
    </>
  );
};
