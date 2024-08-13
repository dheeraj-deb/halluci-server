import { addProduct, getProduct, getProducts,getCategories } from "../service/product/product.service";

export const product_resolvers = {
    Query: {
     getProducts,
     getProduct,
     getCategories
    },
  Mutation: {
    addProduct: addProduct,
  },
};
