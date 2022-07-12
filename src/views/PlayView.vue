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
        class="container grid justify-center mx-auto"
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
    <!-- popup start game -->
    <button
      v-if="isProcessing == true"
      type="button"
      class="absolute top-1/2 left-1/2 transition -translate-x-1/2 -translate-y-1/2 bg-white"
      disabled
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="animate-spin h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
        />
      </svg>

      Processing...
    </button>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import router from "@/router";

import { ArrayFunction } from "@/use/arrayfunction";

import CardCom from "@/components/CardCom.vue";
import PopupEndGame from "@/components/PopupEndGame.vue";
export default {
  components: { CardCom, PopupEndGame },
  setup() {
    const store = useStore();
    const count = computed(() => {
      return (
        Math.floor(store.getters["count_step/getStep"] / 2) +
        (store.getters["count_step/getStep"] % 2)
      );
    });
    store.dispatch("image/setTotalImage", 0);
    store.dispatch("image/setTotalLoaded", 0);

    const { shuffle } = ArrayFunction();
    //#region popup high score
    const isPopup = ref(false);
    //#endregion
    //back to home page when refesh page
    if (store.state.playMode == 0) {
      router.push("/");
    }

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
    const preventClick = ref(true);
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
    //#region  game timer
    const isProcessing = ref(true);
    const timer = ref(0);
    const doTimer = ref(true);
    function startTimer() {
      setInterval(() => {
        if (doTimer.value == true) timer.value += 0.1;
      }, 100);
    }
    watch(store.state, (newValue, oldValue) => {
      if (store.getters["image/loadImageComplete"] == true) {
        startTimer();
        preventClick.value = false;
        isProcessing.value = false;
      }
    });
    //#endregion game timer
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
      isProcessing,
    };
  },
};
</script>
