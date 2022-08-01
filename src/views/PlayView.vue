<template>
  <div class="relative">
    <div
      class="lg:absolute text-white flex flex-row lg:flex-col items-center justify-between select-none mx-3 lg:mb-0 mb-6 mt-6"
    >
      <div>
        <p>Step</p>
        <p>{{ countStep }}</p>
      </div>

      <div>
        <p class="lg:mt-[20px]">Time(s)</p>
        <p>{{ timer.toFixed(1) }}</p>
      </div>
      <router-link to="/" class="lg:mt-[200px] text-sm"
        >back to home</router-link
      >
    </div>
    <div class="lg:mt-4" :class="{ 'pointer-events-none': preventClick }">
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
          @eventFlip="checkRule(index)"
        />
      </div>
    </div>
    <PopupEndGame
      v-if="isPopup"
      class="fixed top-[20%] left-1/2 transition -translate-x-1/2"
      :time="timer.toFixed(1)"
      :step="countStep"
    />
    <!-- popup start game -->
    <button
      v-if="isProcessing"
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

import CardCom from "@/components/CardCom.vue";
import PopupEndGame from "@/components/PopupEndGame.vue";
import { GameRule } from "@/use/PlayGame/game_rule";
export default {
  components: { CardCom, PopupEndGame },
  setup() {
    const store = useStore();
    //const { countStep } = GameRule();
    const countStep = computed(() => {
      return (
        Math.floor(store.getters["count_step/getStep"] / 2) +
        (store.getters["count_step/getStep"] % 2)
      );
    });
    store.dispatch("image/setTotalImage", 0);
    store.dispatch("image/setTotalLoaded", 0);
    const isPopup = ref(false);
    //back to home page when refesh page
    if (store.state.playMode == 0) {
      router.push("/");
    }
    const {
      matrix,
      classContent,
      cardHeight,
      cardWidth,
      preventClick,
      checkArr,
      complete,
      initCard,
    } = GameRule();
    checkArr.value = [];
    initCard();
    //#region  game timer
    const { isProcessing } = GameRule();
    const timer = ref(0);
    const doTimer = ref(true);
    function startTimer() {
      setInterval(() => {
        if (doTimer.value == true) timer.value += 0.1;
      }, 100);
    }
    watch(store.state.image, (newValue, oldValue) => {
      if (store.getters["image/loadImageComplete"] == true) {
        startTimer();
        preventClick.value = false;
        isProcessing.value = false;
      }
    });
    //#endregion game timer
    //#region manager v-for obj
    let itemRefs: any[] = [];
    const setItemRef = (el: any) => {
      if (el != null && itemRefs.length < matrix.value.length) {
        itemRefs.push(el);
      }
    };
    //#endregion manager v-for obj
    //#region checkgame rule
    function checkRule(index: number) {
      if (checkArr.value.length == 2) {
        return;
      }
      checkArr.value.push(index);
      if (checkArr.value.length == 2) {
        preventClick.value = true;
        if (
          matrix.value[checkArr.value[0]] == matrix.value[checkArr.value[1]]
        ) {
          setTimeout(() => {
            itemRefs[checkArr.value[0]].setDisableCard();
            itemRefs[checkArr.value[1]].setDisableCard();
            checkArr.value = [];
            complete.value -= 2;
            preventClick.value = false;
            if (complete.value == 0) {
              doTimer.value = false;
              isPopup.value = true;
            }
          }, 200);
        } else {
          setTimeout(() => {
            itemRefs[checkArr.value[0]].onFlipDown();
            itemRefs[checkArr.value[1]].onFlipDown();
            checkArr.value = [];
            preventClick.value = false;
          }, 800);
        }
      }
    }
    //#endregion
    return {
      matrix,
      classContent,
      cardHeight,
      cardWidth,
      countStep,
      checkRule,
      preventClick,
      isPopup,
      timer,
      isProcessing,
      setItemRef,
    };
  },
};
</script>
