import React from 'react';
import { AreaContext } from './AreaContext';

const { useEffect, useContext, useRef } = React;

interface ComponentData {
  value: React.ReactElement;
  orderNumber: number | null;
}

export function useRender(areaId: string, children: React.ReactElement) {
  const { addComponent, removeComponent, updateComponent, orderNumberRef } =
    useContext(AreaContext);
  const ref = useRef<ComponentData>({ value: children, orderNumber: null });

  if (ref.current.orderNumber == null) {
    ref.current.orderNumber = orderNumberRef.current;
  }
  orderNumberRef.current += 1;

  useEffect(() => {
    addComponent(areaId, ref.current);
    return () => {
      removeComponent(areaId, ref.current);
    };
  }, [ref.current, addComponent, removeComponent]);

  useEffect(() => {
    ref.current.value = children;
    updateComponent(areaId, ref.current);
  }, [children]);
}

export const Content = ({
  name: areaId,
  children,
}: React.PropsWithChildren<{ name: string }>) => {
  useRender(areaId, children as React.ReactElement);
  return null;
};
