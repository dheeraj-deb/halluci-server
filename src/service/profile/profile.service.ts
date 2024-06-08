import { UnauthorizedException } from "../../utils/errors";

export const getProfile = async (
  _: any,
  input: { userId: string },
  context: Record<string, any>
) => {
  console.log(context.auth, context.user);

  if (!context.auth) throw new UnauthorizedException("please login");
  return { status: 200, data: context.user };
};
