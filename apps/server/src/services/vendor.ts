import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';

import db, { genId } from '@/modules/db';
import { SALT_ROUNDS } from '@/utils/constants';
import { Resolvers } from '@/generated/graphql';
import { createAuthToken } from '@/utils/auth';


export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    phone: string;
    // Add other fields as needed
}

class VendorService {
    public static async getVendorByEmail(email: string) {
        return await db.vendors.findUnique({ where: { email }, include: { stores: true } });
    }
    public static async createUser({ name, email, password, phone }: CreateUserInput) {
        const foundVendor = await VendorService.getVendorByEmail(email);
        if (foundVendor) {
            throw new GraphQLError(`Vendor with email ${email} already exists`);
        }
        const id = genId();
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const createdVendor = await db.vendors.create({
            data: { id, name, email, phone, passwordHash },
        });

        return createdVendor;
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

        return { authToken: createAuthToken(foundVendor) };
    }
}

export default VendorService;