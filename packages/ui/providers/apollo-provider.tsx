"use client";

import React from "react";

import { ApolloLink, from, HttpLink } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import clientCookies from "js-cookie";

if (process.env.NODE_ENV === "development") {
  console.log("ApolloProvider: Development mode");
  loadDevMessages();
  loadErrorMessages();
}

export function ApolloWrapper({
  children,
  delay: delayProp,
  token,
}: React.PropsWithChildren<{ delay: number; token: string; }>) {

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );

  function makeClient() {
    const httpLink = new HttpLink({
      uri: "http://0.0.0.0:8080/graphql",
      fetchOptions: { cache: "no-store" },
    });
    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        };
      });

      return forward(operation);
    });
    const delayLink = new ApolloLink((operation, forward) => {
      const delay =
        typeof window === "undefined"
          ? delayProp
          : clientCookies.get("apollo-x-custom-delay") ?? delayProp;
      operation.setContext(({ headers = {} }) => {
        return {
          headers: {
            ...headers,
            "x-custom-delay": delay,
          },
        };
      });

      return forward(operation);
    });
    const link =
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: false,
            cutoffDelay: 100,
          }),
          delayLink,
          authLink,
          httpLink,
        ])
        : ApolloLink.from([delayLink, authLink, httpLink]);

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link,
    });
  }
}
