import { createStore } from "vuex";
const state = {
  countStep: 0,
  playMode: 4,
};
const getters = {};
const mutations = {
  incrementM(state: any, payload: number) {
    state.countStep++;
  },
  setplaymodeM(state: any, payload: number) {
    state.playMode = payload;
  },
  setstepM(state: any, payload: number) {
    state.countStep = payload;
  },
};
const actions = {
  increment(context: any) {
    context.commit("incrementM");
  },
  setplaymode(context: any, num: number) {
    context.commit("setplaymodeM", num);
  },
  setstep(context: any, num: number) {
    context.commit("setstepM", num);
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
