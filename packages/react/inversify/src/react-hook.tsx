import React, { useContext } from 'react';
import { Container as InversifyContainer, interfaces } from 'inversify';

const InversifyContext = React.createContext<{
  container: InversifyContainer | null;
}>({
  container: null,
});

type Props = {
  container: InversifyContainer;
};

export const InversifyProvider: React.FC<Props> = (props) => {
  return (
    <InversifyContext.Provider value={{ container: props.container }}>
      {props.children}
    </InversifyContext.Provider>
  );
};

export function useContainer<U extends any[]>(
  ...deps: interfaces.ServiceIdentifier<any>[]
): U {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new Error();
  }

  // !!unsafe cast!!!
  return deps.map((token) => container.get<U>(token)) as U;
}

// export function useContainer<T>(identifier: interfaces.ServiceIdentifier<T>) {
//   const { container } = useContext(InversifyContext);
//   if (!container) {
//     throw new Error();
//   }
//   return container.get<T>(identifier);
// }
