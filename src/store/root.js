import { parseNetworkError } from "../utils/request";
import * as apiMethods from "../services";

export const SET_API_CALL_IN_PROGRESS = "SET_API_CALL_IN_PROGRESS";
export const SET_GENERAL_ERRORS = "SET_GENERAL_ERRORS";

export default {
  state: {
    isAPICallInProgress: false,
    generalErrors: [],
    domains: [],
  },
  mutations: {
    [SET_API_CALL_IN_PROGRESS]: (state, status) => {
      state.isAPICallInProgress = status;
    },
    [SET_GENERAL_ERRORS]: (state, error) => {
      state.generalErrors.push(error);
    },
    fetchDomains(state, payload) {
      state.domains.push([...payload]);
      console.log("MUTATION payload", payload);
      console.log("MUTATION state", state.domains);
    },
  },
  actions: {
    fetchDomains(context, payload) {
      return new Promise((resolve, reject) => {
        context
          .dispatch("api", payload)
          .then((result) => {
            console.log("RESULT FETCHDOMAINS", { result });
            context.commit("fetchDomains", result.data.domains);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    /**
     * Dispatch AJAX calls
     * @param {String} entity e.g. `users`
     * @param {String} action method name eg. `getById`
     */
    async api({ commit }, { entity, action, payload = {}, query, params }) {
      console.log("CHEGUEI NA API");

      try {
        const response = await apiMethods[entity][action]({
          payload,
          query,
          params,
        });
        commit(SET_GENERAL_ERRORS, "OLHA O ERRINHO AQUI");
        console.log("resultado na api: ", { response });
        return response;
      } catch (error) {
        const errorPayload = {
          [`${entity}_${action}_request`]: parseNetworkError(error),
        };
        commit(SET_GENERAL_ERRORS, errorPayload);
      }
    },
  },
};
