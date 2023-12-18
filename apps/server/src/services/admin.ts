import bcrypt from 'bcrypt';
import { GraphQLError } from "graphql";

import db, { genId } from "@/modules/db";
import { createAuthToken } from "@/utils/auth";
import { SALT_ROUNDS } from "@/utils/constants";
import { CreateAdminInput, CreateVendorInput } from "interfaces/admin";

class Admin {
    private static async getAdminByEmail(email: string) {
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
        const user = {
            id: foundAdmin.id,
            role: foundAdmin.role,
        }
        return { authToken: createAuthToken(foundAdmin), user };
    }
    public static async createVendor({ name, email, password, phone, address }: CreateVendorInput) {
        const foundVendor = await Admin.getAdminByEmail(email);
        if (foundVendor) {
            throw new GraphQLError(`Vendor with email ${email} already exists`);
        }
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        return await db.vendor.create({
            data: { id: genId(), name, email, phone, passwordHash, address },
        });
    }
    public static async getAdmins() {
        return await db.admin.findMany();
    }
    public static async getUserById(id: string, role: string) {
        return await db.admin.findUnique({ where: { id } });
    }
    public static async getVendors() {
        return await db.vendor.findMany({
            include: {
                stores: {
                    include: { vendor: true }
                }
            }
        });
    }
}

export default Admin;