
import { Resolvers } from "@/generated/graphql";
import Admin from "@/services/admin";
import { requireAuthorization } from "@/utils/auth";
import { DateTimeScalar } from '@/utils/constants';
import { GqlContext } from "../types";
import { GraphQLError } from "graphql";


const adminResolvers: Resolvers = {
    DateTime: DateTimeScalar,
    Mutation: {
        createAdmin: async (_, { name, phone, email, password }, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN']);
            return await Admin.createAdmin({ name, phone, email, password });
        },
        createVendor: async (_, { name, email, phone, password, address }, context: GqlContext) => {
            // await requireAuthorization({ context }, ['ADMIN']);
            const vendor = await Admin.createVendor({ name, email, phone, password, address });
            if (vendor) {
                return vendor;
            } else {
                throw new GraphQLError('Error creating vendor');
            }
        }
    },
    Query: {
        getAdmins: async (_: any, __: any, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN']);
            return await Admin.getAdmins();
        },
        getAdmin: async (_: any, { id, role }: any, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN', 'VENDOR', 'BUYER']);
            const admin = await Admin.getUserById(id, role);
            if (admin) {
                return admin;
            } else {
                throw new GraphQLError('Admin not found');
            }
        },
        getVendors: async (_: any, __: any, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN']);
            const vendors = await Admin.getVendors();
            if (vendors) {
                return vendors;
            } else {
                throw new GraphQLError('No vendors found');
            }
        },
    }
}

export default adminResolvers;
