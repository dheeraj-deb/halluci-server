import * as bcrypt from 'bcrypt';
export const encryptPassword = async (password: string) =>
  await bcrypt.hash(password, 10);
export const comparePassword = async (
  password: string,
  encryptedPassword: string,
) => await bcrypt.compare(password, encryptedPassword);
