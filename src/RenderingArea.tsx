import React from 'react';
import { SubtreeContext } from './Subtree';

const { useContext } = React;

export const RenderingArea: React.FunctionComponent<{ areaId: string }> = ({
  areaId,
}) => {
  const context = useContext<typeof SubtreeContext>(SubtreeContext);
  const children = context.getComponents(areaId);
  return (children as unknown) as React.ReactElement;
};
