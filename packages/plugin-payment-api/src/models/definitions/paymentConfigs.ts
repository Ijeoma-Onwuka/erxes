import { Document, Schema } from 'mongoose';
import { PAYMENT_KINDS } from '../../../constants';
import { field } from './utils';

export interface IPaymentConfig {
  name: string;
  kind: string;
  status: string;
  config: any;
}

export interface IPaymentConfigDocument extends IPaymentConfig, Document {
  _id: string;
}

export const paymentConfigSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' }),
  kind: field({
    type: String,
    required: true,
    label: 'Kind',
    enum: PAYMENT_KINDS.ALL
  }),
  status: field({ type: String, label: 'Status' }),
  config: field({ type: Object, label: 'Config' }),
  createdAt: field({ type: Date, default: new Date(), label: 'Created at' })
});
