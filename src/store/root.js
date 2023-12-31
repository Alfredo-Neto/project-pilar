import { parseNetworkError } from "../utils/request";
import * as apiMethods from "../services";

export const SET_API_CALL_IN_PROGRESS = "SET_API_CALL_IN_PROGRESS";
export const SET_GENERAL_ERRORS = "SET_GENERAL_ERRORS";

export default {
  state: {
    isAPICallInProgress: false,
    generalErrors: [],
    session: {},
    incomingMails: [],
  },
  mutations: {
    [SET_API_CALL_IN_PROGRESS]: (state, status) => {
      state.isAPICallInProgress = status;
    },
    [SET_GENERAL_ERRORS]: (state, error) => {
      state.generalErrors.push(error);
    },
    setSession(state, payload) {
      state.session = payload;
    },
    setIncomingMails(state, payload) {
      state.incomingMails = payload;
    },
  },
  actions: {
    async fetchSession(context, payload) {
      return new Promise((resolve, reject) => {
        context
          .dispatch("api", payload)
          .then((result) => {
            context.commit("setSession", result.data.introduceSession);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },

    async fetchIncomingMails(context, payload) {
      return new Promise((resolve, reject) => {
        context
          .dispatch("api", payload)
          .then((result) => {
            context.commit("setIncomingMails", result.data.session.mails);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },

    async api({ commit }, { entity, action, payload = {}, query, params }) {
      try {
        const response = await apiMethods[entity][action]({
          payload,
          query,
          params,
        });
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
