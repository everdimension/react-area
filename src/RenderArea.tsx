import React from 'react';
import { AreaContext } from './AreaContext';

const { useContext } = React;

type RenderCallback = (components: React.ReactElement[]) => React.ReactNode;

interface Props {
  areaId: string;
  children?: React.ReactNode | RenderCallback;
}

const EMPTY_ARRAY = [] as React.ReactElement[];

export const RenderArea: React.FunctionComponent<Props> = ({
  areaId,
  children,
}) => {
  const context = useContext<typeof AreaContext>(AreaContext);
  const components = context.getComponents(areaId);
  return typeof children === 'function'
    ? (children as RenderCallback)(components || EMPTY_ARRAY)
    : components;
};
