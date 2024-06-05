import { mergeResolvers } from "@graphql-tools/merge";
import { user_resolvers } from "./user.resolver";
import { product_resolvers } from "./product.resolver";
import { cart_resolvers } from "./cart.resolver";

const resolversArray = [user_resolvers, product_resolvers, cart_resolvers];

export const resolvers = mergeResolvers(resolversArray);
