import React from 'react';
import { SubtreeProvider } from './Subtree';
import { RenderingArea } from './RenderingArea';
import { RenderToArea } from './RenderToArea';

export { SubtreeProvider, RenderingArea, RenderToArea };

export function createRenderingPair(areaId: string) {
  const pair = {} as { RenderingArea: React.FC; RenderToArea: React.FC };
  pair.RenderingArea = props => <RenderingArea {...props} areaId={areaId} />;
  pair.RenderToArea = ({ children }) => (
    <RenderToArea areaId={areaId}>{children}</RenderToArea>
  );
  return pair;
}
