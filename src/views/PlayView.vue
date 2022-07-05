<template>
  <div>
    <div
      class="lg:absolute top-0 left-[5%] text-white flex flex-row lg:flex-col items-center justify-between select-none mx-3"
    >
      <div>
        <p>Step</p>
        <p>{{ count }}</p>
      </div>

      <div>
        <p class="lg:mt-[20px]">Time(s)</p>
        <p>0.0</p>
      </div>
      <router-link to="/" class="mt-[200px]">back to home</router-link>
    </div>
    <div
      class="relative container grid gap-y-2 justify-center mx-auto mt-2"
      :class="[classContent]"
    >
      <div
        v-for="num in matrix"
        :key="num"
        class="flex items-center justify-center"
      >
        <CardCom :width="cardWidth" :height="cardHeight" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

import CardCom from "@/components/CardCom.vue";
import router from "@/router";

export default {
  components: { CardCom },
  setup() {
    const store = useStore();
    const count = computed(() => {
      return store.state.countStep;
    });
    //back to home page when refesh page
    if (store.state.playMode == 0) {
      router.push("/");
    }
    const matrix = ref([1, 2]);
    const matrix4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const matrix6 = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];
    const matrix8 = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
      58, 59, 60, 61, 62, 63, 64,
    ];

    const classContent = ref("");
    const cardWidth = ref("0px");
    const cardHeight = ref("0px");
    const matrixLevel = computed<number>(() => {
      return store.state.playMode;
    });

    if (matrixLevel.value == 4) {
      matrix.value = matrix4;
      classContent.value = "grid-cols-4 w-[360px] md:w-[500px]";
      cardHeight.value = "130px";
      cardWidth.value = "90px";
    } else if (matrixLevel.value == 6) {
      matrix.value = matrix6;
      classContent.value = "grid-cols-6 w-[600px]";
      cardHeight.value = "100px";
      cardWidth.value = "90px";
    } else {
      matrix.value = matrix8;
      classContent.value = "grid-cols-8 w-[700px]";
    }

    return { matrix, classContent, cardHeight, cardWidth, count };
  },
};
</script>
