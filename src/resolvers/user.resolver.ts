import User from "../models/user.model";
import { activate, getUser, getUsers } from "../service/user/user.service";


export const user_resolvers = {
  Query: {
    getUsers,
    getUser,

  },
  Mutation: {
    activate
  }

};
