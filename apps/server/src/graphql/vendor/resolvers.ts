import { GraphQLError } from 'graphql';

import { Resolvers } from '@/generated/graphql';
import db from '@/modules/db';
import VendorService from '@/services/vendor';


const vendorResolver: Resolvers = {
    Query: {
        vendor: async (_, { id }) => {
            const foundVendor = await db.vendor.findUnique({ where: { id } });

            if (!foundVendor) {
                throw new GraphQLError(`Vendor with ID ${id} not found`);
            }

            return foundVendor;
        },
        getAllStores: async () => {
            const stores = await VendorService.getAllStores();
            if (stores) {
                return stores;
            } else {
                throw new GraphQLError('No stores found');

            }
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
        },
        createStore: async (_, { name, description, vendorId }) => {
            try {
                return await VendorService.createStore({ name, description, vendorId });

            } catch (error) {
                throw new GraphQLError('Error creating store');
            }
        }
    }
}

export default vendorResolver;