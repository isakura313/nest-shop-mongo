import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly img: string;

  readonly price: number;

  readonly discount: boolean;

  readonly category: string;

  readonly title: string;

  readonly rating: number;
}
