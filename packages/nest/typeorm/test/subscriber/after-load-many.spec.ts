/* eslint-disable @typescript-eslint/no-empty-function */
import { NestApplicationContext } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestpkg/typeorm';
import { EventSubscriber } from 'typeorm';

import { TypeOrmEntity } from '../__fixtures__/typeorm.entity';

describe('after-load-many', () => {
  @EventSubscriber()
  class AfterLoadManySubscriber {
    afterLoadMany() {}
  }

  AfterLoadManySubscriber.prototype.afterLoadMany = jest.fn();

  let moduleRef: NestApplicationContext;

  const AfterLoadManyOrmModule = TypeOrmModule.forFeature([TypeOrmEntity]);

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forTest(), AfterLoadManyOrmModule],
    }).compile();
  });

  it('should listen "afterLoadMany" event', async () => {
    const repository = moduleRef.get(getRepositoryToken(TypeOrmEntity));
    await repository.save(new TypeOrmEntity());
    await repository.find();
    expect(AfterLoadManySubscriber.prototype.afterLoadMany).toHaveBeenCalled();
  });
});
