import bcrypt from 'bcrypt';
import { GraphQLError } from "graphql";
import db from "@/modules/db";
import { createAuthToken } from "@/utils/auth";


class Auth {
  public static async getUserByEmail(email: string) {
    return await db.admin.findUnique({ where: { email } }) ||
      await db.vendor.findUnique({ where: { email } });
  }

  public static async login({ email, password }: { email: string, password: string }) {
    const foundUser = await Auth.getUserByEmail(email);
    if (!foundUser) {
      throw new GraphQLError(`Email/Password combination is incorrect`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.passwordHash);

    if (!isPasswordCorrect) {
      throw new GraphQLError('Email/Password combination is incorrect');
    }
    const user = {
      id: foundUser.id,
      role: foundUser.role,
    }
    return { authToken: await createAuthToken(foundUser), user };
  }
}

export default Auth
