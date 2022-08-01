import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";
const state = {
  totalImage: 0,
  totalLoaded: 0,
  totalAssetImage: 189,
  cardImg: [1, 2, 3, 4, 5, 6, 7, 8],
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
