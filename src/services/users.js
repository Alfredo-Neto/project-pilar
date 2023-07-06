import { apolloProvider } from "@/utils/request.js";

export default {
  getDomains: ({ query, variables = {} }) => {
    console.log("CHEGUEI NO SERVICE");

    return apolloProvider.defaultClient.query({
      query: query,
      variables: {
        ...variables,
      },
    });
  },
};
