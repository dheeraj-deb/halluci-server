import mongoose, { Types } from "mongoose";
import Product from "../../models/product.model";
import { AddProductInput } from "./interface";
import { NotFoundException } from "../../utils/errors";
import CategoryModel from "../../models/category.model";

export const addProduct = async (
  _: any,
  { name, description, category, price, image, variations, stock }: AddProductInput
) => {
  try {
    // Generate unique IDs for variations
    const variationIds = variations?.map(() => new mongoose.Types.ObjectId());

    // Create the variations array with the generated IDs
    const variationsWithIds = variations?.map((variation, index) => ({
      _id: variationIds[index],
      ...variation,
    }));
    console.log(variationsWithIds);

    // Create the product with variations
    const product = new Product({
      name,
      description,
      category,
      price,
      image,
      stock,
      variations: variationsWithIds,
    });

    // Save the product to the database
    await product.save();

    return {
      status: 200,
      message: "Product added successfully",
    };
  } catch (error) {
    console.log(error);

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
    console.log(products, 'got products');

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
    console.log(id, product);
    if (!product) throw new NotFoundException("Could find the product")

    return product

  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};


export const getCategories = async()  => {
  try {
    const categories = await CategoryModel.find().lean()
    console.log(categories, 'got products');

    return categories
  } catch (error) {
    return {
      status: 500,
      message: "Could not get categories",
    };
  }
}