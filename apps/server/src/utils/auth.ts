import { GqlContext } from "@/graphql/types";
import db from "@/modules/db";
import { Admin, Role, Vendor } from "@prisma/client";
import { GraphQLError } from "graphql";
import { jwtVerify } from "jose";

import { SignJWT } from "jose";
interface UserWithIdAndRole {
    id: string;
    role: string;
}

export function createAuthToken(user: UserWithIdAndRole) {
    // return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, {
    //     expiresIn: "7d",
    // });
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24; // 1 day
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    const alg = "HS256";
    return new SignJWT({ userId: user.id, role: user.role }).setProtectedHeader({ alg, typ: 'JWT' }).setIssuedAt(iat).setExpirationTime(exp).setNotBefore(iat).sign(secret);
}

export async function verifyAuthToken(authToken: string) {
    // const { userId, role } = jwt.verify(authToken, process.env.JWT_SECRET as string) as { userId: string, role: string };
    const { payload } = await jwtVerify(authToken, new TextEncoder().encode(process.env.JWT_SECRET as string));
    const { role, userId }: { role: string, userId: string } = payload as { role: string, userId: string };
    console.log(role, userId);
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

    if (context.userRoles && allowedRoles.some(role => context.userRoles!.includes(role))) {
        // User is authorized
    } else {
        throw new GraphQLError('You are not authorized to perform this action');
    }
};
