"use client";
import { PropsWithChildren } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://graphigo.prd.galaxy.eco/query",
});

const authLink = setContext((_, { headers }) => {
  const customHeaders = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZGRyZXNzIjoiMHg2NjRCMDdFQTg5NjlkNjQzQjBhQ2M0ODI5YzExM0Y2QzIwNTE0RjY1IiwiQWRkcmVzc1R5cGUiOjEsIk5vbmNlIjoiZUhnNzA4bVdnWGVBN2g5cDMiLCJleHAiOjE2OTk2MTAxNjcsIkp3dEVycm9yIjpudWxsfQ.25mEYpYGjeEccv7346m59iphOoAxiErBA8TvOI-O7Dg",
  };

  return {
    headers: {
      ...headers,
      ...customHeaders,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function GQlProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
