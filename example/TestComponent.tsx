import { type PropsWithChildren, useEffect } from 'react';

let globalI = 0;

export function TestComponent({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  const i = globalI++;
  console.log('rendering', name, i);
  useEffect(() => {
    console.log('mounting', name, i);
    return () => {
      console.log('unmounting', name, i);
    };
  }, []);
  return <div>{children}</div>;
}
