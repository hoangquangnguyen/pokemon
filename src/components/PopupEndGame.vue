<!-- you'll be on the walls of the hall of fame -->
<template>
  <div
    class="absolute bg-white rounded-lg flex flex-col gap-y-2 items-center justify-center border-4 border-black"
  >
    <h1>Congratulation</h1>
    <h2>Step:{{ step }}</h2>
    <h2>Time(s):{{ time }}</h2>
    <h1>Your name will be on the walls of the Hall Of Fame</h1>
    <input
      type="text"
      placeholder="Enter your name"
      v-model="yourname"
      class="border border-gray-800"
    />
    <button class="px-5 py-2 mt-2 text-white bg-orange-600" @click="onSend">
      Send
    </button>
    <router-link to="/" class="px-5 py-2 mb-2 text-blue-700"
      >New game</router-link
    >
    <router-link to="/" class="fixed top-0 right-0 p-1 text-white bg-red-600"
      >x</router-link
    >
  </div>
</template>
<script lang="ts">
import { easyCollect } from "@/data/firebasedata";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: {
    step: Number,
    time: Number,
  },
  setup(prop: any, context: any) {
    // const rank = ref(999);
    const yourname = ref("anonymous");
    const { add } = easyCollect();
    const store = useStore();
    const router = useRouter();
    //
    function onSend() {
      if (yourname.value == "") yourname.value = "anonymous";
      if (store.state.playMode == 4) {
        add("easy", {
          playername: yourname.value,
          step: prop.step,
          time: prop.time,
        });
      } else if (store.state.playMode == 6) {
        add("normal", {
          playername: yourname.value,
          step: prop.step,
          time: prop.time,
        });
      } else {
        add("hard", {
          playername: yourname.value,
          step: prop.step,
          time: prop.time,
        });
      }
      router.push("/");
    }
    return { onSend, yourname };
  },
};
</script>
