
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
            await requireAuthorization({ context }, ['ADMIN']);
            const vendor = await Admin.createVendor({ name, email, phone, password, address });
            if (vendor) {
                return vendor;
            } else {
                throw new GraphQLError('Error creating vendor');
            }
        },
        createCategory: async (_, { name, parentId, description }, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN']);
            const { createdCategory } = await Admin.createCategory({ name, parentId });
            return createdCategory;
        },
        updateCategory: async (_, { id, name, parentId, description }, context: GqlContext) => {
            // await requireAuthorization({ context }, ['ADMIN']);
            const { updatedCategory } = await Admin.updateCategory({ id, name, parentId, description });
            return updatedCategory;
        },
        deleteCategory: async (_, { id }, context: GqlContext) => {
            // await requireAuthorization({ context }, ['ADMIN']);
            const { deletedCategory } = await Admin.deleteCategory({ id });
            if (deletedCategory) {
                return deletedCategory;
            } else {
                throw new GraphQLError('Error deleting category');
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
        getCategories: async (_: any, __: any, context: GqlContext) => {
            // await requireAuthorization({ context }, ['ADMIN']);
            return await Admin.getCategories();
        },
        getCategory: async (_: any, { id }: any, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN']);
            const category = await Admin.getCategoryById(id);
            if (category) {
                return category;
            } else {
                throw new GraphQLError('Category not found');
            }
        },

    }
}

export default adminResolvers;
