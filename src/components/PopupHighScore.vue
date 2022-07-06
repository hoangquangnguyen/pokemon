<!-- you'll be on the walls of the hall of fame -->
<template>
  <div
    class="absolute bg-white rounded-lg flex flex-col gap-y-2 items-center justify-center border-4 border-black"
  >
    <h1>Congratulation</h1>
    <h1>Rank:{{ rank }}</h1>
    <h2>Step:{{ step }}</h2>
    <h2>Time(s):{{ time }}</h2>
    <h1>Your name will be on the walls of the Hall Of Fame</h1>
    <input
      type="text"
      placeholder="Enter your name"
      :v-model="inputYourName"
      class="border border-gray-800"
    />
    <button class="px-5 py-2 mt-2 text-white bg-orange-600">Send</button>
    <router-link to="/" class="px-5 py-2 mb-2 text-blue-700"
      >New game</router-link
    >
    <router-link to="/" class="fixed top-0 right-0 p-1 text-white bg-red-600"
      >x</router-link
    >
  </div>
</template>
<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    step: Number,
    time: Number,
  },
  setup(prop: any, context: any) {
    const rank = ref(999);
    return { rank };
  },
};
</script>
