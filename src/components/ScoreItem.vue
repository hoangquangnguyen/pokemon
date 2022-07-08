<template>
  <div
    class="flex flex-row items-center justify-center max-w-[1200px] overflow-hidden text-sm"
  >
    <div class="w-[90px] flex justify-start ml-1">
      <p>{{ rank }}</p>
    </div>
    <div class="w-[250px] flex justify-start">
      <span class="max-w-[250px] text-ellipsis overflow-hidden ...">{{
        playername
      }}</span>
    </div>
    <div class="w-[100px] flex justify-start">{{ step }}</div>
    <div class="w-[120px] flex justify-start">{{ time }}</div>
    <div class="w-[200px] flex justify-start">{{ formatDate(date) }}</div>
  </div>
  <hr class="border border-white w-full" />
</template>
<script lang="ts">
import { Timestamp } from "@firebase/firestore";

export default {
  props: {
    rank: { type: [Number, String] },
    playername: String,
    step: { type: [Number, String] },
    time: { type: [Number, String] },
    date: Timestamp,
  },
  setup() {
    function formatDate(date: Timestamp) {
      let d = date.toDate();
      let month = (d.getMonth() + 1).toString().padStart(2, "0");
      let day = d.getDate().toString().padStart(2, "0");
      let year = d.getFullYear();
      let hour = d.getHours().toString().padStart(2, "0");
      let min = d.getMinutes().toString().padStart(2, "0");
      let sec = d.getSeconds().toString().padStart(2, "0");
      return (
        hour + ":" + min + ":" + sec + " " + year + "." + month + "." + day
      );
    }
    return { formatDate };
  },
};
</script>
