import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OneTimeCharge } from './one-time-charge.entity';

@Entity()
export class Deployment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { name: 'billing_start_date', nullable: true })
  billingStartDate: string | null;

  @OneToMany(() => OneTimeCharge, (oneTimeCharge) => oneTimeCharge.deployment)
  oneTimeCharges: OneTimeCharge[];
}
