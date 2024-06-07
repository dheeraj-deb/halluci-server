import mongoose, { Types } from "mongoose";
import Product from "../../models/product.model";
import { AddProductInput } from "./interface";
import { NotFoundException } from "../../utils/errors";

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


export const getProducts = async (
  _: any,
  { }
) => {
  try {
    const products = await Product.find().lean()
    console.log(products,'got products');
    
    return products
  } catch (error) {
    return {
      status: 500,
      message: "Could not add product",
    };
  }
};


export const getProduct = async (
  _: any,
  { id }: { id: string }
) => {
  try {
    
    const product = await Product.findById(id).lean()
    console.log(id,product);
    if (!product) throw new NotFoundException("Could find the product")

    return product

  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};