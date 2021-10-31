import React from 'react';
import { AreaProvider } from './AreaContext';
import { RenderArea } from './RenderArea';
import { Content } from './Content';

export { AreaProvider, RenderArea, Content };

export function createRenderingPair(areaId: string) {
  const pair = {} as { RenderArea: React.FC; Content: React.FC };
  pair.RenderArea = (props) => <RenderArea {...props} name={areaId} />;
  pair.Content = ({ children }) => <Content name={areaId}>{children}</Content>;
  return pair;
}
