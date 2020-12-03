import { Connection } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Repository,
  TypeOrmModule,
  SluggableColumn,
  SluggableSubscriber,
} from '@nestpkg/typeorm';

import { SluggableEntity } from '../__fixtures__/sluggable.entity';

describe('SluggableDecorator', () => {
  let moduleRef: TestingModule,
    connection: Connection,
    repository: Repository<SluggableEntity>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forTest({
          entities: [SluggableEntity],
          subscribers: [SluggableSubscriber],
        }),
      ],
    }).compile();

    connection = moduleRef.get(Connection);
    repository = connection.getRepository(SluggableEntity);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(SluggableColumn).toBeDefined();
  });

  it('should update slug value from source column', async () => {
    const sluggableEntity = Object.assign(new SluggableEntity(), {
      name: 'Slug name',
    });

    await repository.save(sluggableEntity);
    expect(sluggableEntity.slug).toBe('slug-name');

    sluggableEntity.name = 'Slug name 2';
    await repository.save(sluggableEntity);
    expect(sluggableEntity.slug).toBe('slug-name-2');
  });
});
