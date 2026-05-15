import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react';

interface ComponentHolder {
  value: ReactElement;
  orderNumber: number | null;
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
  getComponents: (areaId: string) => ReactElement[] | null;
  orderNumberRef: {
    current: number;
  };
}

export const AreaContext = createContext<AreaContextValue>({
  addComponent: () => {},
  removeComponent: () => {},
  updateComponent: () => {},
  getComponents: () => null,
  orderNumberRef: { current: 0 },
});

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
        existingComponents.forEach((component) => {
          component.orderNumber = null;
        });
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

      // TODO:
      // Instead of sorting, we can "insert" the component at the correct
      // position by its ".orderNumber". Perhaps we need to use an alternative
      // to Set, though.
      areaComponents.sort((a, b) => a.orderNumber! - b.orderNumber!);
      return areaComponents.map((component) => component.value);
    },
    [components],
  );

  const orderNumberRef = useRef(0);

  const value = useMemo(
    () => ({
      addComponent,
      getComponents,
      removeComponent,
      updateComponent,
      orderNumberRef,
    }),
    [addComponent, getComponents, removeComponent, updateComponent],
  );

  return <AreaContext.Provider {...props} value={value} />;
}
