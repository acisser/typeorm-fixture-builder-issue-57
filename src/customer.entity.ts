import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity()
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProjectEntity, (projects) => projects.customer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  projects: ProjectEntity[];
}
