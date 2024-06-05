import { addToCart, getCart } from "../service/cart/cart.service";

export const cart_resolvers = {
  Query: {
    getCart,
  },
  Mutation: {
    addToCart,
  },
};
