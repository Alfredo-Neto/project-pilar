// import rootStore from "@/store/root";

// export default {
//   namespaced: true,
//   state: {
//     domains: [],
//   },
//   mutations: {
//     fetchDomains(state, payload) {
//       state.domains.push([...payload]);
//     },
//   },
//   actions: {
//     async fetchDomains({ commit }, payload) {
//       console.log({ rootStore });
//       return new Promise((resolve, reject) => {
//         rootStore.actions
//           .api(payload)
//           .then((result) => {
//             commit("fetchDomains", result.data.domains);
//             resolve();
//           })
//           .catch(() => {
//             reject();
//           });
//       });
//     },
//   },
//   getters: {},
// };
