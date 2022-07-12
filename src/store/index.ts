import { createStore } from "vuex";
import { ArrayFunction } from "@/use/arrayfunction";
import count_step from "./modules/count_step";
import image from "./modules/image";
const state = {
  playMode: 0,
};
const getters = {};
const mutations = {
  setplaymodeM(state: any, payload: number) {
    state.playMode = payload;
  },
};
const actions = {
  setplaymode(context: any, num: number) {
    context.commit("setplaymodeM", num);
  },
};
const modules = { count_step, image };
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules,
});
