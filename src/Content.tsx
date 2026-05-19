import {
  useLayoutEffect,
  useEffect,
  useContext,
  useRef,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import { AreaContext } from './AreaContext';

interface ComponentData {
  value: ReactNode;
  node: Element | null;
}

export function useRender(areaId: string, children: ReactNode) {
  const { addComponent, removeComponent, updateComponent } =
    useContext(AreaContext);
  const markerRef = useRef<HTMLTemplateElement>(null);
  const ref = useRef<ComponentData>({ value: children, node: null });

  useLayoutEffect(() => {
    const data = ref.current;
    data.node = markerRef.current;
    addComponent(areaId, data);
    return () => {
      removeComponent(areaId, data);
    };
  }, [areaId, addComponent, removeComponent]);

  useEffect(() => {
    if (children !== ref.current.value) {
      ref.current.value = children;
      updateComponent(areaId, ref.current);
    }
  }, [areaId, children, updateComponent]);

  return markerRef;
}

export const Content = ({
  name: areaId,
  children,
}: PropsWithChildren<{ name: string }>) => {
  const markerRef = useRender(areaId, children);
  // `<template>` is a script-supporting element: it renders nothing, has no
  // layout, and is valid as a child of restrictive parents (`<table>`,
  // `<select>`, `<ul>`, ...) where a `<span>` would not be. It exists purely
  // as a positional marker so the area can order content by document position.
  return <template ref={markerRef} />;
};
