import { Test } from '@nestjs/testing';
import { NestApplicationContext } from '@nestjs/core';
import { TypeOrmModule, Entity, getRepositoryToken } from '@nestpkg/typeorm';
import { EventSubscriber, PrimaryGeneratedColumn } from 'typeorm';

describe('after-load-many', () => {
  let afterLoadManyCalled = false;

  beforeEach(() => {
    afterLoadManyCalled = false;
  });

  @EventSubscriber()
  class AfterLoadManySubscriber {
    afterLoadMany() {
      afterLoadManyCalled = true;
    }
  }

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

  it('should be called', async () => {
    const repository = moduleRef.get(getRepositoryToken(AfterLoadManyEntity));
    await repository.save(new AfterLoadManyEntity());
    const results = await repository.find();
    // TODO: use mock instead of hack
    expect(afterLoadManyCalled).toBeTruthy();
  });
});
