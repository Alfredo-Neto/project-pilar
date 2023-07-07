import { apolloProvider } from "@/utils/request.js";

export default {
  mutate: async ({ payload, query = {} }) => {
    const { stringify, parse } = JSON;
    const variables = parse(stringify(query));
    return await apolloProvider.defaultClient.mutate({
      mutation: payload,
      variables: {
        ...variables,
      },
    });
  },

  query: async ({ payload, query = {} }) => {
    const { stringify, parse } = JSON;
    const variables = parse(stringify(query));
    return await apolloProvider.defaultClient.query({
      query: payload,
      variables: {
        ...variables,
      },
      fetchPolicy: "no-cache",
    });
  },
};
