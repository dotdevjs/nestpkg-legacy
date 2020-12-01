import { Entity } from '@nestpkg/typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
