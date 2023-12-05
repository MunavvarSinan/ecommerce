import { Role } from "@prisma/client";

import { Vendor } from "@/generated/graphql"

export type GqlContext = {
    currentUser: Vendor | null;
    userRoles: Role[];
}
