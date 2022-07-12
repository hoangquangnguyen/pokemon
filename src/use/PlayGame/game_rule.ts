import { computed, ref } from "vue";
import { useStore } from "vuex";
import { ArrayFunction } from "../arrayfunction";

//#region  use var
const { shuffle } = ArrayFunction();
//#endregion

//#region process var
const matrix = ref([1, 2]);
const matrix4 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const matrix6 = [
  1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12,
  13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
];
const matrix9 = [
  1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12,
  13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22,
  22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
];
const classContent = ref("");
const cardWidth = ref("0px");
const cardHeight = ref("0px");
const isProcessing = ref(true);
const preventClick = ref(true);
const checkArr = ref([1, 2]);
const complete = ref(matrix.value.length);

//#endregion
function initCard() {
  const store = useStore();
  const matrixLevel = computed<number>(() => {
    return store.state.playMode;
  });
  store.dispatch("image/cardReset");
  store.dispatch("image/cardShuffle");
  if (matrixLevel.value == 4) {
    store.dispatch("image/pickImageForCard", 8);
    store.dispatch("image/setTotalImage", 16);
    matrix.value = shuffle(matrix4);
    classContent.value =
      "grid-cols-4 w-[360px] md:w-[400px] gap-y-[10px] mt-10";
    cardHeight.value = "130px";
    cardWidth.value = "90px";
  } else if (matrixLevel.value == 6) {
    store.dispatch("image/pickImageForCard", 18);
    store.dispatch("image/setTotalImage", 36);
    matrix.value = shuffle(matrix6);
    classContent.value = "grid-cols-6 w-[600px] gap-y-[10px] mt-2";
    cardHeight.value = "100px";
    cardWidth.value = "90px";
  } else {
    store.dispatch("image/pickImageForCard", 27);
    store.dispatch("image/setTotalImage", 54);
    matrix.value = shuffle(matrix9);
    classContent.value = "grid-cols-9 w-[780px] gap-y-[7px] mt-2";
    cardHeight.value = "95px";
    cardWidth.value = "80px";
  }
}

export function GameRule() {
  return {
    matrix,
    classContent,
    cardHeight,
    cardWidth,
    isProcessing,
    preventClick,
    checkArr,
    complete,
    initCard,
  };
}
