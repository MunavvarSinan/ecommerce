import { loadFilesSync } from "@graphql-tools/load-files";

import vendorResolver from "./vendor/resolvers";
import adminResolvers from "./admin/resolvers";
import authResolvers from "./auth/resolvers";

export const typeDefs = loadFilesSync(`src/graphql/**/*.graphql`);
export const resolvers = [vendorResolver, adminResolvers, authResolvers];
