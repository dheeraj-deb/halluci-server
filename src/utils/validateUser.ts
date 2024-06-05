import User from "../models/user.model";

export const validateUser = async function (userId: Object) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Invalid user id");
  }

  return user;
};
