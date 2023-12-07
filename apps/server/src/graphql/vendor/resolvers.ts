import { GraphQLError } from 'graphql';

import { ResolverTypeWrapper, Resolvers } from '@/generated/graphql';
import db from '@/modules/db';
import VendorService from '@/services/vendor';
import { GqlContext } from '@/graphql/types';
import { requireAuthorization } from '@/utils/auth';
import { Vendor } from '@prisma/client';


const vendorResolver: Resolvers = {
    Query: {
        vendors: async (_, __, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN', 'VENDOR']);
            return await db.vendor.findMany();
        },
        vendor: async (_, { id }) => {
            const foundVendor = await db.vendor.findUnique({ where: { id } });

            if (!foundVendor) {
                throw new GraphQLError(`Vendor with ID ${id} not found`);
            }

            return foundVendor;
        }
    },
    Mutation: {

        vendorLogin: async (_, { email, password }) => {
            const vendor = await VendorService.login({ email, password });
            if (vendor) {
                return vendor;
            } else {
                throw new GraphQLError('Invalid login credentials');
            }
        }
    }
}

export default vendorResolver;