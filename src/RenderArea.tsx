import { useContext, type ReactNode } from 'react';
import { AreaContext, type AreaContextValue } from './AreaContext';

type RenderCallback = (components: ReactNode[]) => ReactNode;

interface Props {
  name: string;
  children?: ReactNode | RenderCallback;
}

const EMPTY_ARRAY: ReactNode[] = [];

export const RenderArea = ({ name: areaId, children }: Props): ReactNode => {
  const context = useContext<AreaContextValue>(AreaContext);
  const components = context.getComponents(areaId);
  return typeof children === 'function'
    ? children(components || EMPTY_ARRAY)
    : components;
};
