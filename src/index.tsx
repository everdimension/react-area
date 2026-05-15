import type { FC, ReactNode } from 'react';
import { AreaProvider } from './AreaContext';
import { RenderArea } from './RenderArea';
import { Content } from './Content';

export { AreaProvider, RenderArea, Content };

export function createRenderingPair(areaId: string) {
  const pair = {} as {
    RenderArea: FC;
    Content: FC<{ children?: ReactNode }>;
  };
  pair.RenderArea = (props) => <RenderArea {...props} name={areaId} />;
  pair.Content = ({ children }) => <Content name={areaId}>{children}</Content>;
  return pair;
}
