import User from "../models/user.model";
import { getProfile } from "../service/profile/profile.service";


export const profileResolvers = {
  Query: {
    getProfile,
  },
  
};
