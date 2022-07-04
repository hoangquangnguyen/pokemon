<template>
  <div class="w-[80px] h-[120px] flex items-center">
    <div
      class="card__inner"
      :class="{ 'is-flipped': isFlipped }"
      @click="onToggleFlipCard"
    >
      <div class="card__face card__face--back bg-black">back</div>
      <div class="card__face card__face--font">font</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const isFlipped = ref(false);
    function onToggleFlipCard() {
      isFlipped.value = !isFlipped.value;
    }

    return { onToggleFlipCard, isFlipped };
  },
};
</script>
