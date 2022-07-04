<template>
  <div
    class="mx-auto w-full overflow-hidden flex flex-col text-white mt-[200px]"
  >
    <h1 class="text-5xl">Pokemon Memmories</h1>
    <div class="flex flex-row items-center gap-20 justify-center mt-20">
      <button class="homepage-button hover:text-green-300">
        <span>4 x 4</span>
        <span>easy</span>
      </button>
      <button class="homepage-button hover:text-blue-300">
        <span>6 x 6</span>
        <span>normal</span>
      </button>
      <button class="homepage-button hover:text-red-300">
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
export default {
  setup() {
    return {};
  },
};
</script>
