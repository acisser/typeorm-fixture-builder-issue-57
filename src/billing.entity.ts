import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OneTimeCharge } from './one-time-charge.entity';

@Index('billing_pk', ['id'], { unique: true })
@Entity()
export class Billing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { name: 'billing_date' })
  billingDate: string;

  @OneToMany(() => OneTimeCharge, (oneTimeCharge) => oneTimeCharge.billing)
  oneTimeCharges: OneTimeCharge[];
}
