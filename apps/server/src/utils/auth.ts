import { GqlContext } from "@/graphql/types";
import db, { Vendors } from "@/modules/db";
import { Role } from "@prisma/client";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
};

export function createAuthToken(user: Pick<Vendors | User, 'id'>): string {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });
}

export function verifyAuthToken(authToken: string) {
    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET as string) as { userId: string };
    if (!userId) throw new GraphQLError('Invalid auth token');
    return db.vendors.findUnique({ where: { id: userId } });

}

export const requireAuthorization = async ({ context }: { context: GqlContext }, allowedRoles: Role[]) => {
    if (!context.currentUser) {
        throw new GraphQLError('You must be logged in to perform this action');
    }

    if (!allowedRoles.some(role => context.userRoles.includes(role))) {
        throw new GraphQLError('You are not authorized to perform this action');
    }
};