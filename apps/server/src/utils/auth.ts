import { GqlContext } from "@/graphql/types";
import db from "@/modules/db";
import { Admin, Role, Vendor } from "@prisma/client";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

interface UserWithIdAndRole {
    id: string;
    role: string;
}

export function createAuthToken(user: UserWithIdAndRole): string {
    return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });
}

export function verifyAuthToken(authToken: string) {
    const { userId, role } = jwt.verify(authToken, process.env.JWT_SECRET as string) as { userId: string, role: string };
    if (!userId || !role) {
        throw new GraphQLError('Invalid auth token');
    }
    if (role === 'ADMIN') {
        return db.admin.findUnique({ where: { id: userId } });
    } else if (role === 'VENDOR') {
        return db.vendor.findUnique({ where: { id: userId } });
    } else if (role === 'BUYER') {
        return db.user.findUnique({ where: { id: userId } });
    } else {
        throw new GraphQLError('Invalid auth token');
    }
}

export const requireAuthorization = async ({ context }: { context: GqlContext }, allowedRoles: Role[]) => {
    if (!context.currentUser) {
        throw new GraphQLError('You must be logged in to perform this action');
    }

    if (!allowedRoles.some(role => context.userRole === role)) {
        throw new GraphQLError('You are not authorized to perform this action');
    }
};