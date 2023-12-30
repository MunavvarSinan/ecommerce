export const links = {
  twitter: "https://x.com/SinanMunavvar",
  github: "https://github.com/MunavvarSinan",
};

export const contactConfig = {
  email: "munavvarsinan321@gmail.com",
};

export const REPOSITORY_OWNER = "MunavvarSinan";
export const REPOSITORY_NAME = "ecommerce";
export const REPOSITORY_URL = "https://github.com/MunavvarSinan/ecommerce";
// TODO: update store frontend url
export const baseUrl = "https://test.com";

export const BASE_URL =
  process.env.NODE_ENV === "production" ? baseUrl : "http://localhost:3000";

export const siteConfig = {
  name: "Ecommerce Admin",
  shortName: "Ecommerce Admin",
  author: "Munavvar sinan k p",
  description: "Ecommerce Admin app build using Next.js 14 and Tailwind css",
  handles: {
    twitter: "@SinanMunavvar",
  },
  url: {
    base: BASE_URL,
    owner: REPOSITORY_OWNER,
  },
  adminNav: [
    {
      title: "Home",
      href: "/admin",
    },
    {
      title: "vendors",
      href: "/admin/vendors",
    },
    {
      title: "stores",
      href: "/admin/stores",
    },
    {
      title: "products",
      href: "/admin/products",
    },
    {
      title: "orders",
      href: "/admin/orders",
    },
    {
      title: "customers",
      href: "/admin/customers",
    },
    {
      title: "Profile",
      href: "/admin/profile",
    },
    {
      title: "settings",
      href: "/admin/settings",
    },
  ],
  links,
};
