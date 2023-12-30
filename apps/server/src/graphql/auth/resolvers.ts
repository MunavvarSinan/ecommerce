import { GraphQLError } from "graphql";

import { Resolvers } from "@/generated/graphql";
import Auth from "@/services/auth";
import { DateTimeScalar } from "@/utils/constants";

const authResolvers: Resolvers = {
  DateTime: DateTimeScalar,
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await Auth.login({ email, password });
      if (user) {
        return user;
      } else {
        throw new GraphQLError('Invalid login credentials');
      }
    }
  }
}

export default authResolvers;
