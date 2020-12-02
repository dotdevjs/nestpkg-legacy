import { Column, Connection, Entity } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {
  PrimaryGeneratedColumn,
  Repository,
  TypeOrmModule,
  Sluggable,
  SluggableColumn,
  SluggableSubscriber,
} from '@nestpkg/typeorm';

describe('SluggableDecorator', () => {
  @Entity()
  class SluggableEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @SluggableColumn({
      source: 'name',
      update: true,
      slugify: {
        lower: true,
      },
    })
    slug: Sluggable['slug'];
  }

  let moduleRef: TestingModule,
    connection: Connection,
    repository: Repository<SluggableEntity>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forTest({
          entities: [SluggableEntity],
          // subscribers: [SluggableSubscriber],
        }),
      ],
    }).compile();

    await moduleRef.init();
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
