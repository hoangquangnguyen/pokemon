import { createStore } from "vuex";
const state = {
  countStep: 0,
};
const getters = {};
const mutations = {
  incrementM(state: any, payload: number) {
    state.countStep++;
  },
};
const actions = {
  increment(context: any) {
    context.commit("incrementM");
  },
};
const modules = {};
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules,
});
