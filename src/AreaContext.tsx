import React, { useState, useCallback, useMemo } from 'react';

interface ComponentHolder {
  value: React.ReactElement;
  orderNumber: number | null;
}

interface AreaContextValue {
  addComponent: (areaId: string | number, component: ComponentHolder) => void;
  removeComponent: (
    areaId: string | number,
    component: ComponentHolder,
  ) => void;
  updateComponent: (
    areaId: string | number,
    component: ComponentHolder,
  ) => void;
  getComponents: (areaId: string) => React.ReactElement[] | null;
}

export const AreaContext = React.createContext<AreaContextValue>({
  // @ts-ignore
  addComponent: (areaId: string, component: ComponentHolder) => {},
  // @ts-ignore
  removeComponent: (areaId: string, component: ComponentHolder) => {},
  // @ts-ignore
  updateComponent: (areaId: string, component: ComponentHolder) => {},
  // @ts-ignore
  getComponents: (areaId: string) => null,
});

export function AreaProvider(props: React.Props<any>) {
  const [components, setComponents] = useState<{
    [key: string]: Set<ComponentHolder>;
  }>({});

  const addComponent = useCallback((areaId, component) => {
    setComponents(components => {
      const existingComponents = components[areaId] || new Set();
      if (existingComponents.has(component)) {
        console.log('component has already been registererd');
        return components; // skip update
      }
      existingComponents.add(component);
      return {
        ...components,
        [areaId]: existingComponents,
      };
    });
  }, []);

  const removeComponent = useCallback((areaId, ref) => {
    setComponents(components => {
      const existingComponents = components[areaId];
      if (!existingComponents) {
        return components; // skip update
      }
      existingComponents.delete(ref);
      existingComponents.forEach(component => {
        component.orderNumber = null;
      });
      return { ...components };
    });
  }, []);

  const updateComponent = useCallback((areaId, _component) => {
    setComponents(components => {
      const existingComponents = components[areaId];
      if (!existingComponents) {
        return components; // skip update
      }
      return { ...components };
    });
  }, []);

  const getComponents = useCallback(
    areaId => {
      if (!(areaId in components)) {
        return null;
      }
      const areaComponents = Array.from(components[areaId]);

      // TODO:
      // Instead of sorting, we can "insert" the component at the correct
      // position by its ".orderNumber". Perhaps we need to use an alternative
      // to Set, though.
      areaComponents.sort((a, b) => a.orderNumber! - b.orderNumber!);
      return areaComponents.map(component => component.value);
    },
    [components],
  );

  const value = useMemo(
    () => ({ addComponent, getComponents, removeComponent, updateComponent }),
    [addComponent, getComponents, removeComponent, updateComponent],
  );

  return <AreaContext.Provider {...props} value={value} />;
}
