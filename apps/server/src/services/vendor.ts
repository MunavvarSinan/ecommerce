import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';

import { Resolvers } from '@/generated/graphql';
import db, { genId } from '@/modules/db';
import { createAuthToken } from '@/utils/auth';


class VendorService {
    public static async getVendorByEmail(email: string) {
        return await db.vendor.findUnique({ where: { email }, include: { stores: true } });
    }
    public static async login({ email, password }: Resolvers) {
        const foundVendor = await VendorService.getVendorByEmail(email);
        if (!foundVendor) {
            throw new GraphQLError(`Email/Password combination is incorrect`);
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundVendor.passwordHash);

        if (!isPasswordCorrect) {
            throw new GraphQLError('Email/Password combination is incorrect');
        }
        const user = {
            id: foundVendor.id,
            role: foundVendor.role
        }
        return { authToken: createAuthToken(foundVendor), user };
    }
    public static async vendorExists(vendorId: string) {
        const existingVendor = await db.vendor.findUnique({
            where: {
                id: vendorId,
            },
        });

        return !!existingVendor;
    }

    private static async storeExists(name: string) {
        const existingStore = await db.store.findFirst({
            where: { name },
        });

        return !existingStore;
    }
    private static async generateSlug(name: string) {
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        const existingStore = await db.store.findFirst({
            where: {
                slug,
            },
        });

        if (!existingStore) {
            return slug;
        }

        return `${slug}-${genId()}`;
    }
    public static async createStore({ name, description, vendorId }: CreateStoreInput) {
        const vendorExists = await VendorService.vendorExists(vendorId);
        if (!vendorExists) {
            throw new GraphQLError('Vendor does not exist');
        }
        const slug = await VendorService.generateSlug(name);
        console.log({ slug });
        const storeExists = await VendorService.storeExists(name);
        if (!storeExists) {
            throw new GraphQLError('Store already exists with that name');
        }
        try {
            console.log('Creating store');
            console.log({ name, description, vendorId });
            return await db.store.create({
                data: {
                    id: genId(),
                    name,
                    description,
                    slug,
                    vendor: {
                        connect: {
                            id: vendorId,
                        },
                    }
                },
                include: {
                    vendor: true,

                },
            });
            // return store
        } catch (error) {
            throw new GraphQLError('Error creating store');
        }
    }
    public static async getAllStores() {
        return await db.store.findMany({ include: { vendor: true } });
    }
}

export default VendorService;