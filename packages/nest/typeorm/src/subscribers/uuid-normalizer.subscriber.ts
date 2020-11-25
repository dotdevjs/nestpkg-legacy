import { EventSubscriber, InsertEvent } from 'typeorm';

@EventSubscriber()
export class UuidNormalizerSubscriber {
  beforeInsert(event: InsertEvent<any>) {
    console.log(`BEFORE POST INSERTED: `, event);
  }
}
