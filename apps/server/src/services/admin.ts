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
    public static async createCategory({ name, parentId, description }: { name: string, parentId?: string | null, description?: string }) {
        try {
            // Generate a unique ID, handling potential collisions
            const uniqueId = genId()
            const createdCategory = await db.category.create({
                data: {
                    id: uniqueId,
                    name,
                    parentId: parentId || undefined,
                    description: description || undefined,
                },
            });

            if (parentId) {
                const updatedParentCategory = await db.category.update({
                    where: { id: parentId },
                    data: {
                        subcategories: {
                            connect: { id: uniqueId },
                        },
                    },
                });
            }

            return { createdCategory };
        } catch (error) {
            // Handle errors gracefully, logging or re-throwing as appropriate
            console.error('Error creating category:', error);
            throw error;
        }
    }
    public static async updateCategory({ id, name, parentId, description }: { id: string, name?: string | null, parentId?: string | null, description?: string | null }) {
        try {
            let updatedCategory;

            if (parentId) {
                // If parentId is provided, update the subcategory
                updatedCategory = await db.category.update({
                    where: { id },
                    data: {
                        name: name || undefined,
                        parentId: parentId || undefined,
                        description: description || undefined,
                    },
                    include: { subcategories: true },
                });
            } else {
                // If parentId is not provided, update the parent category
                updatedCategory = await db.category.update({
                    where: { id },
                    data: {
                        name: name || undefined,
                        description: description || undefined,
                    },
                });
            }

            return { updatedCategory };
        } catch (error) {
            // Handle errors gracefully, logging or re-throwing as appropriate
            console.error('Error updating category:', error);
            throw error;
        }
    }

    public static async deleteCategory({ id }: { id: string }) {
        try {
            const category = await db.category.findUnique({ where: { id } });

            if (!category) {
                return { error: 'Category not found' };
            }

            if (category.parentId === null) {
                // Delete parent category and all subcategories
                await db.category.deleteMany({
                    where: {
                        id: {
                            in: [id, ...(await db.category.findMany({ where: { parentId: id } })).map((sub) => sub.id)],
                        },
                    },
                });
            } else {
                // Delete individual subcategory
                await db.category.delete({ where: { id } });
            }

            return { deletedCategory: category };
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
    public static async getCategories() {
        return await db.category.findMany({ where: { parentId: null }, include: { subcategories: true } }); // Retrieve only top-level categories
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
    public static async getCategoryById(id: string) {
        return await db.category.findUnique({ where: { id }, include: { subcategories: { include: { subcategories: true } } } });
    }
}

export default Admin;
