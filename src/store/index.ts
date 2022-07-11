import { createStore } from "vuex";
import { ArrayFunction } from "@/use/arrayfunction";
import count_step from "./modules/count-step";
const state = {
  countStep: 0,
  playMode: 0,
  cardImg: [1, 2, 3, 4, 5, 6, 7, 8],
};
const getters = {};
const mutations = {
  incrementM(state: any) {
    state.countStep++;
  },
  setplaymodeM(state: any, payload: number) {
    state.playMode = payload;
  },
  setstepM(state: any, payload: number) {
    state.countStep = payload;
  },
  cardResetM(state: any) {
    state.cardImg = [];
    for (let index = 1; index <= 151; index++) {
      state.cardImg.push(index);
    }
  },
  cardShuffleM(state: any) {
    const { shuffle } = ArrayFunction();
    state.cardImg = shuffle(state.cardImg);
  },
  pickCardImgM(state: any, payload: number) {
    const { getN_elemental } = ArrayFunction();
    state.cardImg = getN_elemental(state.cardImg, payload);
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
  cardReset(context: any) {
    context.commit("cardResetM");
  },
  cardShuffle(context: any) {
    context.commit("cardShuffleM");
  },
  pickCardImg(context: any, num: number) {
    // because matrix get from 1,and img array get from 0 then the imgarray get langer than +1
    context.commit("pickCardImgM", num + 1);
  },
};
// const modules = { count_step:
//   { namespace=true,
//     module_count_step} };
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    count_step,
  },
});
