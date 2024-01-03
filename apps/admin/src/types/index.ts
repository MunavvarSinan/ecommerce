import { ApolloError } from "@apollo/client";

import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
};

export type MENU_ITEM_PROPS = NavItem;

export type DataTableSearchableColumn<TData> = {
  id: keyof TData;
  title: string;
};
export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type DataTableFilterableColumn<TData> =
  DataTableSearchableColumn<TData> & {
    options: Option[];
  };

export type ProductsTableShellProps = {
  data: VENDOR_DATA[];
  pageCount: number;
};
export interface CategoriesTableProps {
  data: CATEGORIES_DATA[];
  pageCount: number;
}

export interface VENDOR_DATA {
  email: string;
  id: string;
  name: string;
  address: string;
  phone: string;
  role: string;
  stores: {
    id: string;
    name: string;
    slug: string;
    description: string;
  }[];
}

export type VENDORS_TYPE = {
  data: {
    getVendors: VENDOR_DATA[]; // Now an array of VENDOR_DATA objects
  };
};

export interface GET_CATEGORY_TYPE {
  data: {
    getCategory: CATEGORIES_DATA;
  };
}
export interface CATEGORIES_DATA {
  id: string;
  name: string;
  parentId: string | null;
  isActive: boolean;
  description: string | null;
  subcategories: CATEGORIES_DATA[];
}

export interface DETETE_CATEGORY_TYPE {
  data: {
    deleteCategory: CATEGORIES_DATA;
  };
}

export type CATEGORIES_TYPE = {
  data: {
    getCategories: CATEGORIES_DATA[];
  };
};

export type ADD_CATEGORY_TYPE = {
  data: {
    createCategory: CATEGORIES_DATA;
  };
}

export type USER_DATA = {
  data: {
    me: {
      id: string;
      name: string;
      email: string;
    };
  };
  error: ApolloError;
};

export interface CheckboxHeaderProps {
  // Type for the table object with relevant methods
  table: {
    getIsAllPageRowsSelected: () => boolean;
    toggleAllPageRowsSelected: (isSelected: boolean) => void;
  };
  // Type for the setSelectedRowIds function
  setSelectedRowIds: (ids: string[]) => void;
  // Type for the data array (optional)
  data: VENDOR_DATA[] | CATEGORIES_DATA[];
}
