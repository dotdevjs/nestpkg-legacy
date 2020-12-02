/* eslint-disable @typescript-eslint/no-empty-function */
import { Connection, EventSubscriber } from 'typeorm';
import { NestApplicationContext } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestpkg/typeorm';

import { TypeOrmEntity } from '../__fixtures__/typeorm.entity';

describe('AfterLoadMany', () => {
  @EventSubscriber()
  class AfterLoadManySubscriber {
    afterLoadMany() {}
  }

  AfterLoadManySubscriber.prototype.afterLoadMany = jest.fn();

  let moduleRef: NestApplicationContext;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forTest({
          entities: [TypeOrmEntity],
          subscribers: [AfterLoadManySubscriber],
        }),
      ],
    }).compile();
  });

  it('should listen "afterLoadMany" event', async () => {
    const repository = moduleRef.get(Connection).getRepository(TypeOrmEntity);
    await repository.save(new TypeOrmEntity());
    await repository.find();
    expect(AfterLoadManySubscriber.prototype.afterLoadMany).toHaveBeenCalled();
  });
});
