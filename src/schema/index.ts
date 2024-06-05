import { readFileSync } from 'fs';
import { join } from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';

const UserTypeDefs = readFileSync(join(__dirname, 'user.schema.graphql'), 'utf-8');
const ProductTypeDefs = readFileSync(join(__dirname, 'product.schema.graphql'), 'utf-8');
const CaryTypeDefs = readFileSync(join(__dirname, 'cart.schema.graphql'), 'utf-8');

export const typeDefs = mergeTypeDefs([UserTypeDefs, ProductTypeDefs, CaryTypeDefs]);