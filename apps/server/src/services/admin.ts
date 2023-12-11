import { GraphQLError } from "graphql";
import bcrypt from 'bcrypt';

import db, { genId } from "@/modules/db";
import { SALT_ROUNDS } from "@/utils/constants";
import { CreateAdminInput, CreateVendorInput } from "interfaces/admin";
import { createAuthToken } from "@/utils/auth";

class Admin {
    public static async getAdminByEmail(email: string) {
        return await db.admin.findUnique({ where: { email } });
    }
    public static async createAdmin({ name, email, password, phone }: CreateAdminInput) {
        const foundAdmin = await Admin.getAdminByEmail(email);
        if (foundAdmin) {
            throw new GraphQLError(`Admin with email ${email} already exists`);
        }
        const id = genId();
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        return await db.admin.create({
            data: { id, name, email, phone, passwordHash },
        });
    }
    public static async login({ email, password }: { email: string, password: string }) {
        const foundAdmin = await Admin.getAdminByEmail(email);
        if (!foundAdmin) {
            throw new GraphQLError(`Email/Password combination is incorrect`);
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundAdmin.passwordHash);

        if (!isPasswordCorrect) {
            throw new GraphQLError('Email/Password combination is incorrect');
        }

        return { authToken: createAuthToken(foundAdmin) };
    }
    // public static async createVendor({ name, email, password, phone }: CreateVendorInput) {
    //     const foundVendor = await Admin.getAdminByEmail(email);
    //     if (foundVendor) {
    //         throw new GraphQLError(`Vendor with email ${email} already exists`);
    //     }
    //     const id = genId();
    //     const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    //     const createdVendor = await db.vendor.create({
    //         data: { id, name, email, phone, passwordHash },
    //     });

    //     return createdVendor;
    // }
    public static async getAdmins() {
        return await db.admin.findMany();
    }
}

export default Admin;