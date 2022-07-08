<template>
  <div class="relative">
    <div
      class="lg:absolute top-0 left-[10px] text-white flex flex-row lg:flex-col items-center justify-between select-none mx-3 lg:mb-0 mb-6 mt-6"
    >
      <div>
        <p>Step</p>
        <p>{{ count }}</p>
      </div>

      <div>
        <p class="lg:mt-[20px]">Time(s)</p>
        <p>{{ timer.toFixed(1) }}</p>
      </div>
      <router-link to="/" class="lg:mt-[200px] text-sm"
        >back to home</router-link
      >
    </div>
    <div class="lg:mt-6" :class="{ 'pointer-events-none': preventClick }">
      <div
        class="relative container grid justify-center mx-auto"
        :class="[classContent]"
      >
        <CardCom
          v-for="(num, index) in matrix"
          :key="index"
          :index="index"
          :cardindex="num"
          :ref="setItemRef"
          :width="cardWidth"
          :height="cardHeight"
          class="flex items-center justify-center"
          @eventFlip="checkRule($event)"
        />
      </div>
    </div>
    <PopupEndGame
      v-if="isPopup"
      class="fixed top-[20%] left-1/2 transition -translate-x-1/2"
      :time="timer.toFixed(1)"
      :step="count"
    />
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import router from "@/router";

import { ArrayFunction } from "@/use/arrayfunction";

import CardCom from "@/components/CardCom.vue";
import PopupEndGame from "@/components/PopupEndGame.vue";
export default {
  components: { CardCom, PopupEndGame },
  setup(_: any, context: any) {
    const store = useStore();
    const count = computed(() => {
      return (
        Math.floor(store.state.countStep / 2) + (store.state.countStep % 2)
      );
    });
    const { shuffle } = ArrayFunction();
    //#region popup high score
    const isPopup = ref(false);
    //#endregion
    //back to home page when refesh page
    if (store.state.playMode == 0) {
      router.push("/");
    }
    //#region  game timer
    const timer = ref(0);
    const doTimer = ref(true);
    function startTimer() {
      setInterval(() => {
        if (doTimer.value == true) timer.value += 0.1;
      }, 100);
    }
    startTimer();
    //#endregion
    //#region init matrix
    const matrix = ref([1, 2]);
    const matrix4 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    const matrix6 = [
      1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
      12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
    ];
    const matrix9 = [
      1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
      12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21,
      21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
    ];
    //#endregion init matrix
    //#region init card
    const classContent = ref("");
    const cardWidth = ref("0px");
    const cardHeight = ref("0px");
    const matrixLevel = computed<number>(() => {
      return store.state.playMode;
    });
    //shuffle image in asset
    store.dispatch("cardReset");
    store.dispatch("cardShuffle");
    if (matrixLevel.value == 4) {
      store.dispatch("pickCardImg", 8);
      matrix.value = shuffle(matrix4);
      classContent.value =
        "grid-cols-4 w-[360px] md:w-[400px] gap-y-[10px] mt-10";
      cardHeight.value = "130px";
      cardWidth.value = "90px";
    } else if (matrixLevel.value == 6) {
      store.dispatch("pickCardImg", 18);
      matrix.value = shuffle(matrix6);
      classContent.value = "grid-cols-6 w-[600px] gap-y-[10px] mt-2";
      cardHeight.value = "100px";
      cardWidth.value = "90px";
    } else {
      store.dispatch("pickCardImg", 27);
      matrix.value = shuffle(matrix9);
      classContent.value = "grid-cols-9 w-[780px] gap-y-[7px] mt-2";
      cardHeight.value = "95px";
      cardWidth.value = "80px";
    }
    //#endregion innit card
    //#region manager v-for obj
    let itemRefs: any[] = [];
    const setItemRef = (el: any) => {
      if (el != null && itemRefs.length < matrix.value.length) {
        itemRefs.push(el);
      }
    };
    //#endregion manager v-for obj
    //#region game rule
    const preventClick = ref(false);
    let checkArr: number[] = [];
    let complete = matrix.value.length;
    function checkRule(index: number) {
      if (checkArr.length == 2) {
        return;
      }
      checkArr.push(index);
      if (checkArr.length == 2) {
        preventClick.value = true;
        if (matrix.value[checkArr[0]] == matrix.value[checkArr[1]]) {
          setTimeout(() => {
            itemRefs[checkArr[0]].setDisableCard();
            itemRefs[checkArr[1]].setDisableCard();
            checkArr = [];
            complete -= 2;
            preventClick.value = false;
            if (complete == 0) {
              doTimer.value = false;
              isPopup.value = true;
            }
          }, 200);
        } else {
          setTimeout(() => {
            itemRefs[checkArr[0]].onFlipDown();
            itemRefs[checkArr[1]].onFlipDown();
            checkArr = [];
            preventClick.value = false;
          }, 800);
        }
      }
    }
    //#endregion game rule
    return {
      matrix,
      classContent,
      cardHeight,
      cardWidth,
      count,
      checkRule,
      setItemRef,
      preventClick,
      isPopup,
      timer,
    };
  },
};
</script>
