import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestEntityFixture {
  @PrimaryGeneratedColumn()
  id: number;
}
