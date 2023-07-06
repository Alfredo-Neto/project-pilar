import VueApollo from "vue-apollo";
import { HttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { DEFAULT_API_URLS } from "./enum";
import { getStorage } from "./localStorage";

import store from "../store";
import { SET_API_CALL_IN_PROGRESS } from "../store/root";

const { stringify, parse } = JSON;
export const parseNetworkError = (error) => parse(stringify(error));

const withBaseURLContext = () =>
  process.env.NODE_ENV
    ? DEFAULT_API_URLS[process.env.NODE_ENV.toUpperCase()]
    : DEFAULT_API_URLS.development;

const httpLink = new HttpLink({
  uri: withBaseURLContext(),
});

const authMiddleware = new ApolloLink((operation, forward) => {
  store.commit(SET_API_CALL_IN_PROGRESS, true);

  const token = getStorage("token");
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  return forward(operation);
});

const link = ApolloLink.from([authMiddleware, httpLink]);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export { apolloClient, apolloProvider };
