import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OneTimeCharge } from './one-time-charge.entity';

@Entity()
export class RateCardItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { name: 'service_id', length: 255 })
  serviceId: string;

  @OneToOne(() => OneTimeCharge, (oneTimeCharge) => oneTimeCharge.rateCardItem)
  oneTimeCharge: OneTimeCharge;
}
