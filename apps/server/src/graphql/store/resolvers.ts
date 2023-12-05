import { GraphQLError } from 'graphql';

import { ResolverTypeWrapper, Resolvers, Store } from '@/generated/graphql';
import db, { genId } from '@/modules/db';

const storeResolver: Resolvers = {
    Mutation: {
        createStore: async (_, { name, vendorId }) => {
            try {
                const id = genId();
                const createdStore = await db.store.create({ data: { id, name, vendorId } });

                const updatedVendor = await db.vendors.update({
                    where: { id: vendorId },
                    data: {
                        stores: {
                            connect: { id: createdStore.id }
                        }
                    }
                });
                console.log('Updated Vendor:', updatedVendor);
                return createdStore;
            } catch (error) {
                console.error('Error creating store:', error);
                throw new GraphQLError('Failed to create store');
            }
        },
        deleteStore: async (_, { id, vendorId }) => {
            const deletedStore = await db.store.delete({ where: { id, vendorId } });
            return deletedStore;
        },
        deleteAllStores: async () => {
            const deletedStores = await db.store.deleteMany();
            return deletedStores as unknown as ResolverTypeWrapper<Store>[];
        },
        updateStore: async (_, { id, name, vendorId }) => {
            const updatedStore = await db.store.update({ where: { id, vendorId }, data: { name } });
            return updatedStore;
        }
    },
    Query: {
        stores: async (_, { vendorId }) => {
            return await db.store.findMany({ where: { vendorId } });
        },
        store: async (_, { id, vendorId }) => {
            const foundStore = await db.store.findUnique({ where: { id, vendorId } });

            if (!foundStore) {
                throw new Error(`Store with ID ${id} not found`);
            }

            return foundStore;
        }
    }
}

export default storeResolver;
