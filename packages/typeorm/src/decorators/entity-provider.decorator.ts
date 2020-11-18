/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any */

export const EntityProvider = (...entities: any[]): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.set(target, 'entities', entities);
  };
};
