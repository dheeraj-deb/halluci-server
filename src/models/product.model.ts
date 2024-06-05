import mongoose, { Mongoose, Schema } from "mongoose";

const VariationsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  variations: [VariationsSchema],
});

export default mongoose.model("Product", ProductSchema);
