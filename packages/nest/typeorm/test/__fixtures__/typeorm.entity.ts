import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from '@nestpkg/typeorm';

@Entity()
export class TypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
