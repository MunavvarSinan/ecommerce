"use client";

import React from 'react';
import clientCookies from 'js-cookie';

import { ApolloLink, HttpLink } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import {
    ApolloNextAppProvider,
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";


if (process.env.NODE_ENV === "development") {
    console.log("ApolloProvider: Development mode");
    loadDevMessages();
    loadErrorMessages();
}

export function ApolloWrapper({
    children,
    delay: delayProp,
}: React.PropsWithChildren<{
    delay: number;
}>) {
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
                    httpLink,
                ])
                : ApolloLink.from([delayLink, httpLink]);

        return new NextSSRApolloClient({
            cache: new NextSSRInMemoryCache(),
            link,
        });
    }
}