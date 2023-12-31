import { Role } from "@prisma/client";

import { Admin, Vendor } from "@/generated/graphql"

export type GqlContext = {
    currentUser: Vendor | Admin | null;
    userRoles: Role | null;
}
