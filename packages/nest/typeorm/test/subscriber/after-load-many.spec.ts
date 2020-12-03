/* eslint-disable @typescript-eslint/no-empty-function */
import { Connection, EventSubscriber, Repository } from 'typeorm';
import { Test, TestEntityFixture, TestingModule } from '@nestpkg/testing';
import { TypeOrmModule } from '@nestpkg/typeorm';

describe('AfterLoadMany', () => {
  @EventSubscriber()
  class AfterLoadManySubscriber {
    afterLoadMany() {}
  }

  AfterLoadManySubscriber.prototype.afterLoadMany = jest.fn();

  let moduleRef: TestingModule, repository: Repository<TestEntityFixture>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forTest({
          entities: [TestEntityFixture],
          subscribers: [AfterLoadManySubscriber],
        }),
      ],
    }).compile();

    repository = moduleRef.get(Connection).getRepository(TestEntityFixture);
  });

  it('should trigger "afterLoadMany" event', async () => {
    await repository.save(new TestEntityFixture());
    await repository.find();
    expect(AfterLoadManySubscriber.prototype.afterLoadMany).toHaveBeenCalled();
  });
});
