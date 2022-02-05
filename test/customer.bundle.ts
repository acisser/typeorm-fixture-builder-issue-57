import { fixture } from 'typeorm-fixture-builder';
import { CustomerEntity } from '../src/customer.entity';
import { ProjectEntity } from '../src/project.entity';
import { Deployment } from '../src/deployment.entity';
import { RateCardItem } from '../src/rate-card-item.entity';
import { Billing } from '../src/billing.entity';
import { OneTimeCharge } from '../src/one-time-charge.entity';

export const customer = fixture(CustomerEntity, {
  id: 1,
  name: 'Netflix',
});

export const project = fixture(ProjectEntity, {
  id: 1,
  name: 'Netflix Project',
  customer: customer,
});
export const deployment = fixture(Deployment, {
  id: 1,
  billingStartDate: '2022-01-20',
});

export const rateCardItem = fixture(RateCardItem, {
  id: 1,
  serviceId: 'testrateCardItem_serviceId',
});

export const billing = fixture(Billing, {
  id: 1,
  billingDate: '2022-02-01T09:58:30.000',
});

export const oneTimeCharge = fixture(OneTimeCharge, {
  billing: billing,
  deployment: deployment,
  rateCardItem: rateCardItem,
});
