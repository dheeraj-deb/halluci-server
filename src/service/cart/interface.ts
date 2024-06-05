import { ObjectId } from "mongoose";

export interface AddToCartInput {
  userId: string;
  product: {
    productId: ObjectId;
    variantId: ObjectId;
    quantity: number;
  };
}
