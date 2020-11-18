/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any */

import { METADATA_ENTITY_PROVIDER } from '../typeorm.constants';

export const EntityProvider = (...entities: any[]): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata(METADATA_ENTITY_PROVIDER, entities, target);
  };
};
