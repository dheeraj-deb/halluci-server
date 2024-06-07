import User from "../models/user.model";


export const user_resolvers = {
  Query: {
    getUsers: () => User.find(),
  },
  
};
