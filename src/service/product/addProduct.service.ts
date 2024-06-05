import mongoose from "mongoose";
import Product from "../../models/product.model";
import { AddProductInput } from "./interface";

export const addProduct = async (
  _: any,
  { name, description, category, price, image, variations }: AddProductInput
) => {
  try {
    // Generate unique IDs for variations
    const variationIds = variations?.map(() => new mongoose.Types.ObjectId());

    // Create the variations array with the generated IDs
    const variationsWithIds = variations?.map((variation, index) => ({
      _id: variationIds[index],
      ...variation,
    }));

    // Create the product with variations
    const product = new Product({
      name,
      description,
      category,
      price,
      image,
      variations: variationsWithIds,
    });

    // Save the product to the database
    await product.save();

    return {
      status: 200,
      message: "Product added successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Could not add product",
    };
  }
};
