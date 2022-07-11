import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";
const state = {
  countStep: 0,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
//Example
// export default {
//   namespaced: true,
//   state: {
//       data: {},
//   },
//   getters: {
//       data: state => state.data,
//   },
//   actions: {
//       async getData({commit }) {
//           const data = await fetch('https://api.coincap.io/v2/assets');
//           commit('SET_DATA', await data.json());
//       },
//   },
//   mutations: {
//       SET_DATA(state, data) {
//           state.data = data;
//       },
//   }
// }
