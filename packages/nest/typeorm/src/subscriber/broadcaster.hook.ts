/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/ban-ts-comment */
import { Broadcaster } from 'typeorm/subscriber/Broadcaster';

import { afterLoadMany } from './after-load-many';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const monkeypatch = require('monkeypatch');

monkeypatch(Broadcaster.prototype, 'broadcastLoadEventsForAll', async function (
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
  result: any,
  metadata: any,
  entities: any
) {
  // @ts-ignore
  await afterLoadMany(this, result, metadata, entities);

  // @ts-ignore
  await callback.call(this, result, metadata, entities);
});
