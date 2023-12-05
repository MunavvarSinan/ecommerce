import { GraphQLError } from 'graphql';

import { Resolvers } from '@/generated/graphql';
import db from '@/modules/db';
import VendorService from '@/services/vendor';
import { GqlContext } from '@/graphql/types';
import { requireAuthorization } from '@/utils/auth';


const vendorResolver: Resolvers = {
    Query: {
        vendors: async (_, __, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN', 'VENDOR']);
            return await db.vendors.findMany({});
        },
        vendor: async (_, { id }) => {
            const foundVendor = await db.vendors.findUnique({ where: { id } });

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