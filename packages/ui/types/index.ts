import { ApolloError } from "@apollo/client";
import { Icons } from "../components/ui/icons";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  active?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
};

export type MENU_ITEM_PROPS = NavItem;


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
