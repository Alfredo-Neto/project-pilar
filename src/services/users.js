import { apolloProvider } from "@/utils/request.js";

export default {
  mutate: async ({ payload, query = {} }) => {
    console.log("CHEGUEI NO SERVICE MUTATE", { payload });

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
    console.log("CHEGUEI NO SERVICE QUERY", { payload, query });

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
