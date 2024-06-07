import { addProduct, getProduct, getProducts } from "../service/product/product.service";

export const product_resolvers = {
    Query: {
     getProducts,
     getProduct
    },
  Mutation: {
    addProduct: addProduct,
  },
};
