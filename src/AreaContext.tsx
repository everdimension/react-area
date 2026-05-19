import {
  createContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

interface ComponentHolder {
  value: ReactNode;
  /**
   * Marker DOM node rendered at the `Content`'s position in the tree. Used to
   * order components by document position rather than by mount timing.
   */
  node: Element | null;
}

export interface AreaContextValue {
  addComponent: (areaId: string | number, component: ComponentHolder) => void;
  removeComponent: (
    areaId: string | number,
    component: ComponentHolder,
  ) => void;
  updateComponent: (
    areaId: string | number,
    component: ComponentHolder,
  ) => void;
  getComponents: (areaId: string) => ReactNode[] | null;
}

export const AreaContext = createContext<AreaContextValue>({
  addComponent: () => {},
  removeComponent: () => {},
  updateComponent: () => {},
  getComponents: () => null,
});

/**
 * Orders two registered components by the document position of their marker
 * nodes, so content always renders in tree order regardless of mount timing.
 */
function compareDocumentOrder(a: ComponentHolder, b: ComponentHolder) {
  if (!a.node || !b.node) {
    return 0;
  }
  const position = a.node.compareDocumentPosition(b.node);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    return 1;
  }
  return 0;
}

export function AreaProvider(props: { children: ReactNode }) {
  const [components, setComponents] = useState<{
    [key: string]: Set<ComponentHolder>;
  }>({});

  const addComponent = useCallback(
    (areaId: string | number, component: ComponentHolder) => {
      setComponents((components) => {
        const existingComponents = components[areaId] || new Set();
        if (existingComponents.has(component)) {
          return components;
        }
        existingComponents.add(component);
        return {
          ...components,
          [areaId]: existingComponents,
        };
      });
    },
    [],
  );

  const removeComponent = useCallback(
    (areaId: string | number, ref: ComponentHolder) => {
      setComponents((components) => {
        const existingComponents = components[areaId];
        if (!existingComponents) {
          return components;
        }
        existingComponents.delete(ref);
        return { ...components };
      });
    },
    [],
  );

  const updateComponent = useCallback(
    (areaId: string | number, _component: ComponentHolder) => {
      setComponents((components) => {
        const existingComponents = components[areaId];
        if (!existingComponents) {
          return components;
        }
        return { ...components };
      });
    },
    [],
  );

  const getComponents = useCallback(
    (areaId: string) => {
      if (!(areaId in components)) {
        return null;
      }
      const areaComponents = Array.from(components[areaId]);
      areaComponents.sort(compareDocumentOrder);
      return areaComponents.map((component) => component.value);
    },
    [components],
  );

  const value = useMemo(
    () => ({
      addComponent,
      getComponents,
      removeComponent,
      updateComponent,
    }),
    [addComponent, getComponents, removeComponent, updateComponent],
  );

  return <AreaContext.Provider {...props} value={value} />;
}
