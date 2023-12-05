
import { Resolvers } from "@/generated/graphql";
import Admin from "@/services/admin";
import { DateTimeScalar } from '@/utils/constants';
import { GqlContext } from "../types";
import { requireAuthorization } from "@/utils/auth";


const adminResolvers: Resolvers = {
    DateTime: DateTimeScalar,
    Mutation: {
        createAdmin: async (_, { name, phone, email, password }, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN']);
            const admin = await Admin.createAdmin({ name, phone, email, password });
            return admin;
        },
        createVendor: async (_, { name, email, phone, password }, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN']);
            const vendor = await Admin.createVendor({ name, email, phone, password });
            return vendor;
        }
    },
    Query: {
        
    }
}

export default adminResolvers;