import { GraphQLError } from "graphql";
import bcrypt from 'bcrypt';

import db, { genId } from "@/modules/db";
import { SALT_ROUNDS } from "@/utils/constants";
import { CreateAdminInput, CreateVendorInput } from "interfaces/admin";

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

        const createdAdmin = await db.admin.create({
            data: { id, name, email, phone, passwordHash },
        });

        return createdAdmin;
    }
    public static async createVendor({ name, email, password, phone }: CreateVendorInput) {
        const foundVendor = await Admin.getAdminByEmail(email);
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
}

export default Admin;