<template>
  <div
    class="mx-auto w-full overflow-hidden flex flex-col text-white mt-[100px]"
  >
    <div class="flex flex-row items-center justify-center select-none">
      <h1 class="lg:text-5xl text-3xl">Pokémon Memories</h1>
      <img
        src="@/assets/image/poke-ball.png"
        alt=""
        class="h-[80px] w-[80px] ml-2"
      />
    </div>

    <div class="flex flex-row items-center gap-20 justify-center mt-20">
      <button class="homepage-button hover:text-green-300" @click="onPlay4x4">
        <router-link to="/play">4x4</router-link>
        <span>easy</span>
      </button>
      <button class="homepage-button hover:text-blue-300" @click="onPlay6x6">
        <span>6 x 6</span>
        <span>normal</span>
      </button>
      <button class="homepage-button hover:text-red-300" @click="onPlay8x8">
        <span>6 x 9</span>
        <span>hard</span>
      </button>
    </div>
    <div class="mt-[100px] flex flex-col items-center">
      <router-link
        to="/highscore"
        class="text-3xl text-gray-200 hover:text-white"
        >High score</router-link
      >
      <hr class="w-[150px]" />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    store.dispatch("count_step/setStep", 0);
    store.dispatch("image/setTotalLoaded", 0);
    function onPlay4x4() {
      store.dispatch("setplaymode", 4);
      router.push("/play");
    }
    function onPlay6x6() {
      store.dispatch("setplaymode", 6);
      router.push("/play");
    }
    function onPlay8x8() {
      store.dispatch("setplaymode", 8);
      router.push("/play");
    }
    return { onPlay4x4, onPlay6x6, onPlay8x8 };
  },
};
</script>
