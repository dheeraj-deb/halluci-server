import { mergeResolvers } from '@graphql-tools/merge';
import { user_resolvers } from './user.resolver';

const resolversArray = [user_resolvers];

export const resolvers = mergeResolvers(resolversArray);