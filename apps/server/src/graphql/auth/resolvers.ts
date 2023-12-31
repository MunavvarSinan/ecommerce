import { GraphQLError } from "graphql";

import { Resolvers } from "@/generated/graphql";
import Auth from "@/services/auth";
import { DateTimeScalar } from "@/utils/constants";

const authResolvers: Resolvers = {
  DateTime: DateTimeScalar,
  ME: {
    __resolveType(obj, context, info) {
      if (obj.role === 'ADMIN') {
        return 'Admin'; // You need to replace this condition with your logic
      } else if (obj.role === 'VENDOR') {
        return 'Vendor'; // Replace this condition as well
      } else {
        return null; // Couldn't determine the type
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await Auth.login({ email, password });
      if (user) {
        return user;
      } else {
        throw new GraphQLError('Invalid login credentials');
      }
    }
  },
  Query: {
    me: async (_, __, context) => {
      console.log('me called');
      if (!context.currentUser) {
        throw new GraphQLError('You must be logged in to perform this action');
      }
      return context.currentUser;
    }
  }
}

export default authResolvers;
