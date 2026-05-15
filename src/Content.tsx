import {
  useLayoutEffect,
  useEffect,
  useContext,
  useRef,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { AreaContext } from './AreaContext';

interface ComponentData {
  value: ReactElement;
  orderNumber: number | null;
}

export function useRender(areaId: string, children: ReactElement) {
  const { addComponent, removeComponent, updateComponent, orderNumberRef } =
    useContext(AreaContext);
  const ref = useRef<ComponentData>({ value: children, orderNumber: null });

  if (ref.current.orderNumber == null) {
    ref.current.orderNumber = orderNumberRef.current;
  }
  orderNumberRef.current += 1;

  useLayoutEffect(() => {
    addComponent(areaId, ref.current);
    return () => {
      removeComponent(areaId, ref.current);
    };
  }, [ref.current, addComponent, removeComponent]);

  useEffect(() => {
    if (children !== ref.current.value) {
      ref.current.value = children;
      updateComponent(areaId, ref.current);
    }
  }, [children]);
}

export const Content = ({
  name: areaId,
  children,
}: PropsWithChildren<{ name: string }>) => {
  useRender(areaId, children as ReactElement);
  return null;
};
