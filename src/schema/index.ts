import { readFileSync } from 'fs';
import { join } from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';

const ProductTypeDefs = readFileSync(join(__dirname, 'product.schema.graphql'), 'utf-8');
const UserTypeDefs = readFileSync(join(__dirname, 'user.schema.graphql'), 'utf-8');

export const typeDefs = mergeTypeDefs([UserTypeDefs, ProductTypeDefs]);