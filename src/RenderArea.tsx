import { useContext, type ReactElement, type ReactNode } from 'react';
import { AreaContext, type AreaContextValue } from './AreaContext';

type RenderCallback = (components: ReactElement[]) => ReactNode;

interface Props {
  name: string;
  children?: ReactNode | RenderCallback;
}

const EMPTY_ARRAY: ReactElement[] = [];

export const RenderArea = ({ name: areaId, children }: Props) => {
  const context = useContext<AreaContextValue>(AreaContext);
  const components = context.getComponents(areaId);
  return (
    typeof children === 'function'
      ? (children as RenderCallback)(components || EMPTY_ARRAY)
      : components
  ) as ReactElement;
};
