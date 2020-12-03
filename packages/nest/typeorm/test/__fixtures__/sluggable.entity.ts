import { Column, Entity } from 'typeorm';
import {
  PrimaryGeneratedColumn,
  Sluggable,
  SluggableColumn,
} from '@nestpkg/typeorm';

@Entity()
export class SluggableEntity {
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
