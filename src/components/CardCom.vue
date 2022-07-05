<template>
  <div
    class="flex items-center justify-center text-white"
    :style="{ width: width, height: height }"
  >
    <div
      class="card_inner"
      :class="{ 'is-flipped': isFlipped }"
      @click="onToggleFlipCard(isDisable)"
      @transitionstart="onStartAnimation"
      @transitionend="onEndAnimation"
    >
      <div class="card_face card_face-back bg-[#030426ed]"></div>
      <div class="card_face card_face-font bg-white text-black"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    width: String,
    height: String,
  },
  setup(props: any) {
    const store = useStore();
    const isFlipped = ref(false);
    const isDisable = ref(false);

    function onToggleFlipCard(disable: boolean) {
      if (isDisable.value == false) {
        isFlipped.value = !isFlipped.value;
        if (isFlipped.value == true) store.dispatch("increment", 0);
      }
    }
    function onStartAnimation() {
      isDisable.value = true;
    }
    function onEndAnimation() {
      isDisable.value = false;
    }
    return {
      onToggleFlipCard,
      isFlipped,
      isDisable,
      onStartAnimation,
      onEndAnimation,
    };
  },
};
</script>
