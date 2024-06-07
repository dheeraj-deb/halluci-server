import { mergeResolvers ,} from "@graphql-tools/merge";
import { user_resolvers } from "./user.resolver";
import { product_resolvers } from "./product.resolver";
import { cart_resolvers } from "./cart.resolver";
import { authResolver } from "./auth.resolver";
import { profileResolvers } from "./profile.resolver";

const resolversArray = [user_resolvers, product_resolvers, cart_resolvers,authResolver,profileResolvers];

export const resolvers = mergeResolvers(resolversArray);
