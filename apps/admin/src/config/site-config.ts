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
export const baseUrl = "";

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
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "vendors",
      href: "/vendors",
    },
    {
      title: "stores",
      href: "/stores",
    },
    {
      title: "products",
      href: "/products",
    },
    {
      title: "orders",
      href: "/orders",
    },
    {
      title: "customers",
      href: "/customers",
    },
    {
      title: "Profile",
      href: "/profile",
    },
    {
      title: "settings",
      href: "/settings",
    },
  ],
  links,
};
