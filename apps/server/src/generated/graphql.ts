import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  passwordHash: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type AuthResult = {
  __typename?: 'AuthResult';
  authToken: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: Admin;
  createAdmin: Admin;
  createCategory: Category;
  createStore: Store;
  createVendor: Vendor;
  deleteAllStores: Array<Store>;
  deleteStore: Store;
  deleteVendor: Vendor;
  updateStore: Store;
  updateVendor: Vendor;
  vendorLogin: AuthResult;
};


export type MutationAdminLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateAdminArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']['input'];
  products?: InputMaybe<Array<ProductInput>>;
};


export type MutationCreateStoreArgs = {
  name: Scalars['String']['input'];
  vendorId: Scalars['String']['input'];
};


export type MutationCreateVendorArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationDeleteStoreArgs = {
  id: Scalars['ID']['input'];
  vendorId: Scalars['String']['input'];
};


export type MutationDeleteVendorArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateStoreArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  vendorId: Scalars['String']['input'];
};


export type MutationUpdateVendorArgs = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationVendorLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  store?: Maybe<Store>;
  storeId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductInput = {
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdmin: Admin;
  getAdmins: Array<Admin>;
  getVendor: Vendor;
  getVendors: Array<Vendor>;
  store: Store;
  stores: Array<Store>;
  vendor: Vendor;
  vendors: Array<Vendor>;
};


export type QueryGetAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetVendorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStoreArgs = {
  id: Scalars['ID']['input'];
  vendorId: Scalars['String']['input'];
};


export type QueryStoresArgs = {
  vendorId: Scalars['String']['input'];
};


export type QueryVendorArgs = {
  id: Scalars['String']['input'];
};

export type Store = {
  __typename?: 'Store';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  updatedAt: Scalars['DateTime']['output'];
  vendorId: Scalars['String']['output'];
};

export type Vendor = {
  __typename?: 'Vendor';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  passwordHash: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
  stores?: Maybe<Array<Store>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Admin: ResolverTypeWrapper<Admin>;
  AuthResult: ResolverTypeWrapper<AuthResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  Query: ResolverTypeWrapper<{}>;
  Store: ResolverTypeWrapper<Store>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Vendor: ResolverTypeWrapper<Vendor>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Admin: Admin;
  AuthResult: AuthResult;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Product: Product;
  ProductInput: ProductInput;
  Query: {};
  Store: Store;
  String: Scalars['String']['output'];
  Vendor: Vendor;
}>;

export type AdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passwordHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResult'] = ResolversParentTypes['AuthResult']> = ResolversObject<{
  authToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  adminLogin?: Resolver<ResolversTypes['Admin'], ParentType, ContextType, RequireFields<MutationAdminLoginArgs, 'email' | 'password'>>;
  createAdmin?: Resolver<ResolversTypes['Admin'], ParentType, ContextType, RequireFields<MutationCreateAdminArgs, 'email' | 'name' | 'password' | 'phone'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'name'>>;
  createStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationCreateStoreArgs, 'name' | 'vendorId'>>;
  createVendor?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<MutationCreateVendorArgs, 'email' | 'name' | 'password' | 'phone'>>;
  deleteAllStores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType>;
  deleteStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationDeleteStoreArgs, 'id' | 'vendorId'>>;
  deleteVendor?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<MutationDeleteVendorArgs, 'id'>>;
  updateStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationUpdateStoreArgs, 'id' | 'name' | 'vendorId'>>;
  updateVendor?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<MutationUpdateVendorArgs, 'email' | 'id' | 'password' | 'phone'>>;
  vendorLogin?: Resolver<ResolversTypes['AuthResult'], ParentType, ContextType, RequireFields<MutationVendorLoginArgs, 'email' | 'password'>>;
}>;

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  storeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAdmin?: Resolver<ResolversTypes['Admin'], ParentType, ContextType, RequireFields<QueryGetAdminArgs, 'id'>>;
  getAdmins?: Resolver<Array<ResolversTypes['Admin']>, ParentType, ContextType>;
  getVendor?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<QueryGetVendorArgs, 'id'>>;
  getVendors?: Resolver<Array<ResolversTypes['Vendor']>, ParentType, ContextType>;
  store?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<QueryStoreArgs, 'id' | 'vendorId'>>;
  stores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QueryStoresArgs, 'vendorId'>>;
  vendor?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<QueryVendorArgs, 'id'>>;
  vendors?: Resolver<Array<ResolversTypes['Vendor']>, ParentType, ContextType>;
}>;

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vendorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VendorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vendor'] = ResolversParentTypes['Vendor']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passwordHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stores?: Resolver<Maybe<Array<ResolversTypes['Store']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Admin?: AdminResolvers<ContextType>;
  AuthResult?: AuthResultResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  Vendor?: VendorResolvers<ContextType>;
}>;

