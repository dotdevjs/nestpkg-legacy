/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeOrmModule } from '@nestpkg/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';

describe('TypeOrmModule', () => {
  it('should be defined', () => {
    expect(TypeOrmModule).toBeDefined();
  });

  describe('registerEventSubscribers', () => {
    const TestSubscriber = jest.fn().mockImplementation(
      () =>
        ({
          listenTo: jest.fn(),
        } as EntitySubscriberInterface)
    );

    EventSubscriber()(TestSubscriber);

    it('should register event subscriber providers', async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        imports: [TypeOrmModule.forTest()],
        providers: [TestSubscriber],
      }).compile();

      await moduleRef.init();

      expect(TestSubscriber).toBeCalled();

      await moduleRef.close();
    });
  });
});
