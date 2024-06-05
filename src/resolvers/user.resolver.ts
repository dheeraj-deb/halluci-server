import User from "../models/user.model";
import { login, registration } from "../service/user/registration.service";

export const user_resolvers = {
  Query: {
    getUsers: () => User.find(),
  },
  Mutation: {
    registration: registration,
    login: login,
  },
};
