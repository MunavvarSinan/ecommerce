
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
            return await Admin.createAdmin({ name, phone, email, password });
        },
        adminLogin: async (_, { email, password }) => {
            const admin = await Admin.login({ email, password });
            if (admin) {
                return admin; // Return the complete Admin object
            } else {
                throw new Error('Invalid login credentials');
            }
        },

        // createVendor: async (_, { name, email, phone, password }, context: GqlContext) => {
        //     await requireAuthorization({ context }, ['ADMIN']);
        //     const vendor = await Admin.createVendor({ name, email, phone, password });
        //     return vendor;
        // }
    },
    Query: {
        getAdmins: async (_: any, __: any, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN']);
            return await Admin.getAdmins();

        }
    }
}

export default adminResolvers;