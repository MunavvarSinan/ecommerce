import { loadFilesSync } from "@graphql-tools/load-files";

import storeResolver from "./store/resolvers";
import vendorResolver from "./vendor/resolvers";
import adminResolvers from "./admin/resolvers";

export const typeDefs = loadFilesSync(`src/graphql/**/*.graphql`);
export const resolvers = [storeResolver, vendorResolver, adminResolvers];
