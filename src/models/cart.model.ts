import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      variants: [
        {
          variantId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product.variations",
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

export default mongoose.model("Cart", CartSchema);
