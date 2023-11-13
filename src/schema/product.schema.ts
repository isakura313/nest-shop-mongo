import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  img: string;

  @Prop()
  price: number;
  
  @Prop()
  category: string;

  @Prop()
  discount: boolean;

  @Prop()
  title: string;

  @Prop()
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
