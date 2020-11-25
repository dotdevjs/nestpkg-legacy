/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventSubscriber, InsertEvent } from 'typeorm';
import { validate as validateUUID } from 'uuid';

@EventSubscriber()
export class UuidNormalizerSubscriber {
  async beforeInsert(event: InsertEvent<any>) {
    for (const relMetadata of event.metadata.relations) {
      if (!validateUUID(event.entity[relMetadata.propertyName])) {
        continue;
      }

      // TODO: Exception? findOneOrFail?
      const targetEntity: any = await event.manager.findOne(
        relMetadata.inverseRelation.target,
        {
          where: {
            uuid: event.entity[relMetadata.propertyName],
          },
        }
      );

      if (!targetEntity) {
        continue;
      }

      event.entity[relMetadata.propertyName] = targetEntity.id;
    }
  }
}
