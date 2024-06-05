import { addProduct } from "../service/product/addProduct.service";

export const product_resolvers = {
  //   Query: {

  //   },
  Mutation: {
    addProduct: addProduct,
  },
};
