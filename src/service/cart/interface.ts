import { ObjectId } from "mongoose";

export interface AddToCartInput {
  userId: string;
  productId: ObjectId;
  products: {
    variantId: ObjectId;
    quantity: number;
  }[];
}

