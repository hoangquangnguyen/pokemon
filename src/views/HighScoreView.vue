<template>
  <div
    class="relative text-white mx-auto mt-10 flex flex-col items-center justify-center"
  >
    <button class="fixed left-0 top-0 p-5 border border-white" @click="goHome">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </button>
    <h1 class="text-4xl select-none">Hall of Fame</h1>
    <div class="mt-10 flex flex-row gap-0 items-center justify-center">
      <button
        class="px-5 py-2 border-2 border-white hover:bg-slate-500"
        :class="{ 'text-blue-600': isMode1 }"
        @click="clickMode1"
      >
        4 x 4
      </button>
      <button
        class="px-5 py-2 border-2 border-white hover:bg-slate-500"
        :class="{ 'text-blue-600': isMode2 }"
        @click="clickMode2"
      >
        6 x 6
      </button>
      <button
        class="px-5 py-2 border-2 border-white hover:bg-slate-500"
        :class="{ 'text-blue-600': isMode3 }"
        @click="clickMode3"
      >
        6 x 9
      </button>
      <button
        class="ml-5 p-3 rounded-full bg-slate-900 hover:bg-slate-700"
        @click="onRefesh"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
    <div
      class="flex flex-col items-center gap-2 mt-4 overflow-y-auto overflow-x-hidden"
    >
      <div
        class="flex flex-row items-center justify-center max-w-[1200px] select-none text-sm"
      >
        <div class="w-[90px] flex justify-start ml-1"><p>Rank</p></div>
        <div class="w-[250px] flex justify-start">Player</div>
        <div class="w-[100px] flex justify-start">Step</div>
        <div class="w-[120px] flex justify-start">Time(s)</div>
        <div class="w-[200px] flex justify-center">Date</div>
      </div>
      <hr class="border border-white w-full" />
      <div v-if="isMode1" class="flex flex-col items-center">
        <ScoreItem
          v-for="(item, index) in easyData"
          :key="index"
          :rank="index + 1"
          :playername="item.playername"
          :step="item.step"
          :time="item.time"
          :date="item.createdate"
        />
      </div>
      <div v-if="isMode2" class="flex flex-col items-center">
        <ScoreItem
          v-for="(item, index) in normalData"
          :key="index"
          :rank="index + 1"
          :playername="item.playername"
          :step="item.step"
          :time="item.time"
          :date="item.createdate"
        />
      </div>
      <div v-if="isMode3" class="flex flex-col items-center">
        <ScoreItem
          v-for="(item, index) in hardData"
          :key="index"
          :rank="index + 1"
          :playername="item.playername"
          :step="item.step"
          :time="item.time"
          :date="item.createdate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { easyCollect } from "@/data/firebasedata";

import ScoreItem from "@/components/ScoreItem.vue";
export default {
  components: { ScoreItem },
  setup() {
    const router = useRouter();
    const { getAll } = easyCollect();
    function goHome() {
      router.push("/");
    }
    const easyData = ref();
    const normalData = ref();
    const hardData = ref();
    //#region hode/show play mode
    const isMode1 = ref(true);
    const isMode2 = ref(false);
    const isMode3 = ref(false);
    getAll("easy").then(
      (d) =>
        (easyData.value = d.sort((a, b) => a.step - b.step || a.time - b.time))
    );
    function clickMode1() {
      isMode1.value = true;
      isMode2.value = false;
      isMode3.value = false;
      getAll("easy").then(
        (d) =>
          (easyData.value = d.sort(
            (a, b) => a.step - b.step || a.time - b.time
          ))
      );
    }
    function clickMode2() {
      isMode1.value = false;
      isMode2.value = true;
      isMode3.value = false;
      getAll("normal").then(
        (d) =>
          (normalData.value = d.sort(
            (a, b) => a.step - b.step || a.time - b.time
          ))
      );
    }
    function clickMode3() {
      isMode1.value = false;
      isMode2.value = false;
      isMode3.value = true;
      getAll("hard").then(
        (d) =>
          (hardData.value = d.sort(
            (a, b) => a.step - b.step || a.time - b.time
          ))
      );
    }
    function onRefesh() {
      if (isMode1.value == true) {
        clickMode1();
      } else if (isMode2.value == true) {
        clickMode2();
      } else {
        clickMode3();
      }
    }
    //#endregion hode/show play mode
    return {
      isMode1,
      isMode2,
      isMode3,
      clickMode1,
      clickMode2,
      clickMode3,
      goHome,
      easyData,
      normalData,
      hardData,
      onRefesh,
    };
  },
};
</script>
