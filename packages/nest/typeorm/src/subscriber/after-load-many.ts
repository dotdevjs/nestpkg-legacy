/* eslint-disable @typescript-eslint/no-explicit-any */
export async function afterLoadMany(
  self: any,
  result: any,
  metadata: any,
  entities: any
): Promise<void> {
  if (!self.queryRunner.connection.subscribers.length) {
    return;
  }

  self.queryRunner.connection.subscribers.forEach((subscriber: any) => {
    if (
      self.isAllowedSubscriber(subscriber, metadata.target) &&
      subscriber.afterLoadMany
    ) {
      const executionResult = subscriber.afterLoadMany(entities, {
        connection: self.queryRunner.connection,

        queryRunner: self.queryRunner,

        manager: self.queryRunner.manager,
        entity: entities,
        metadata: metadata,
      });

      if (executionResult instanceof Promise) {
        result.promises.push(executionResult);
      }
      result.count++;
    }
  });
}
