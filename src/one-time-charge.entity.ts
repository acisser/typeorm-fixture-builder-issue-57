import {
  BaseEntity,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Billing } from './billing.entity';
import { Deployment } from './deployment.entity';
import { RateCardItem } from './rate-card-item.entity';

@Index('otc_billing_idx', ['billing'], {})
@Index('one_time_charge_pk', ['deployment', 'rateCardItem'], {
  unique: true,
})
@Entity()
export class OneTimeCharge extends BaseEntity {
  @ManyToOne(() => Billing, (billing) => billing.oneTimeCharges, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_billing', referencedColumnName: 'id' }])
  billing: Billing;

  @PrimaryColumn({ type: 'integer', name: 'id_deployment' })
  @OneToOne(() => Deployment, (deployment) => deployment.oneTimeCharges, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'id_deployment', referencedColumnName: 'id' }])
  deployment: Deployment;

  @PrimaryColumn({ type: 'integer', name: 'id_source_rate_card_item' })
  @OneToOne(() => RateCardItem, (rateCardItem) => rateCardItem.oneTimeCharge, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'id_source_rate_card_item', referencedColumnName: 'id' },
  ])
  rateCardItem: RateCardItem;
}
