import User from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginInput, RegisterInput, RegistrationResponse } from "./interface";

export const registration = async (
  _: any,
  { name, shopname, phonenumber, address, password }: RegisterInput
): Promise<RegistrationResponse> => {
  const user = new User({ name, shopname, phonenumber, address, password });
  await user.save();
  return {
    status: 200,
    message: "User Registered Successfully",
  };
};

export const login = async (_: any, { name, password }: LoginInput) => {
  const user = await User.findOne({ name });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  if (!user.verified) {
    throw new Error("User is not verified");
  }

  const token = jwt.sign({ id: user._id }, "test111", {
    expiresIn: "1h",
  });

  return {
    name: user.name,
    token,
    status: 200,
    message: "User logged in successfully",
  };
};
