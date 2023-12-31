import { GraphQLError } from 'graphql';

import { Resolvers } from '@/generated/graphql';
import db from '@/modules/db';
import VendorService from '@/services/vendor';
import { requireAuthorization } from '@/utils/auth';
import { GqlContext } from '../types';


const vendorResolver: Resolvers = {
    Query: {
        vendor: async (_, { id }) => {
            const foundVendor = await db.vendor.findUnique({ where: { id } });

            if (!foundVendor) {
                throw new GraphQLError(`Vendor with ID ${id} not found`);
            }

            return foundVendor;
        },
        getAllStores: async (_, __, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN', 'VENDOR']);
            const stores = await VendorService.getAllStores();
            if (stores) {
                return stores;
            } else {
                throw new GraphQLError('No stores found');

            }
        },
        getStore: async (_, { vendorId, storeId }, context: GqlContext) => {
            await requireAuthorization({ context }, ['ADMIN', 'VENDOR']);
            const store = await VendorService.getStore(vendorId, storeId as string);
            return store;
        }
    },
    Mutation: {
        createStore: async (_, { name, description, vendorId }) => {
            return await VendorService.createStore({ name, description, vendorId });
        }
    }
}

export default vendorResolver;
