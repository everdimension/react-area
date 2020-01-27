import React from 'react';
import { AreaProvider } from './AreaContext';
import { RenderArea } from './RenderArea';
import { Content } from './Content';

export { AreaProvider, RenderArea, Content };

export function createRenderingPair(areaId: string) {
  const pair = {} as { RenderArea: React.FC; Content: React.FC };
  pair.RenderArea = props => <RenderArea {...props} areaId={areaId} />;
  pair.Content = ({ children }) => (
    <Content areaId={areaId}>{children}</Content>
  );
  return pair;
}
