<template>
  <div
    class="mx-auto w-full overflow-hidden flex flex-col text-white mt-[100px]"
  >
    <div class="flex flex-row items-center justify-center select-none">
      <h1 class="text-5xl">Pokémon Memmories</h1>
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
        <span>8 x 8</span>
        <span>hard</span>
      </button>
    </div>
    <a href="/" class="mt-[100px] flex flex-col items-center">
      <p class="text-3xl text-gray-200 hover:text-white">High score</p>
      <hr class="w-[150px]" />
    </a>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    function onPlay4x4() {
      store.dispatch("setplaymode", 4);
      router.push("/play");
    }
    function onPlay6x6() {
      store.dispatch("setplaymode", 6);
      router.push("/play");
    }
    function onPlay8x8() {
      console.log("play 8x8");
    }
    return { onPlay4x4, onPlay6x6, onPlay8x8 };
  },
};
</script>
