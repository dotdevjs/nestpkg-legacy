/* eslint-disable @typescript-eslint/no-empty-function */
import { Test } from '@nestjs/testing';
import { NestApplicationContext } from '@nestjs/core';
import { TypeOrmModule, Entity, getRepositoryToken } from '@nestpkg/typeorm';
import { EventSubscriber, PrimaryGeneratedColumn } from 'typeorm';

describe('after-load-many', () => {
  @EventSubscriber()
  class AfterLoadManySubscriber {
    afterLoadMany() {}
  }

  AfterLoadManySubscriber.prototype.afterLoadMany = jest.fn();

  @Entity()
  class AfterLoadManyEntity {
    @PrimaryGeneratedColumn()
    id: number;
  }

  let moduleRef: NestApplicationContext;

  const AfterLoadManyOrmModule = TypeOrmModule.forFeature([
    AfterLoadManyEntity,
  ]);

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forTest({
          subscribers: [AfterLoadManySubscriber],
        }),
        AfterLoadManyOrmModule,
      ],
    }).compile();
  });

  it('should call afterLoadMany method on subscriber', async () => {
    const repository = moduleRef.get(getRepositoryToken(AfterLoadManyEntity));
    await repository.save(new AfterLoadManyEntity());
    await repository.find();
    expect(AfterLoadManySubscriber.prototype.afterLoadMany).toHaveBeenCalled();
  });
});
