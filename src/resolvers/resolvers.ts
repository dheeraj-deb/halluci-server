import User from "../models/user.model";

export const resolvers = {
  Query: {
    users: () => User.find(),
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const user = new User({ name, email, password });
      await user.save();
      return user;
    },
  },
};
