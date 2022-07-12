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
      <div
        class="card_face card_face-back bg-[#030426ed] flex items-center justify-center"
      >
        <img
          src="@/assets/image/icon_back.png"
          alt=""
          class="h-[50p] w-[50px]"
        />
      </div>
      <div
        class="card_face card_face-font bg-white text-black flex items-center justify-center"
      >
        <img
          class="object-cover h-[90px] w-[80px]"
          :src="require('@/assets/image/' + imgIndex + '.png')"
          alt=""
          @load="isLoaded"
        />
      </div>
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
    index: Number,
    cardindex: {
      type: [Number, String, Object],
    },
  },
  setup(props: any, context: any) {
    const store = useStore();
    const isFlipped = ref(false);
    const isDisable = ref(false);
    const imgIndex = ref(1);
    imgIndex.value = store.state.image.cardImg[props.cardindex];
    function onToggleFlipCard() {
      if (isDisable.value == false) {
        if (isFlipped.value == false) {
          isFlipped.value = true;
          //access call actions increment() from root store
          //store.dispatch("increment");
          //access call actions incrementStep() from module store count_step
          store.dispatch("count_step/incremenStep");
          context.emit("eventFlip", props.index);
        }
      }
    }
    function onFlipDown() {
      if (isFlipped.value == true) isFlipped.value = false;
    }
    function setDisableCard() {
      if (isDisable.value == true) isDisable.value = false;
    }
    function onStartAnimation() {
      isDisable.value = true;
    }
    function onEndAnimation() {
      isDisable.value = false;
    }
    function isLoaded() {
      store.dispatch("image/increaseLoaded", 1);
    }
    return {
      onToggleFlipCard,
      isFlipped,
      isDisable,
      onStartAnimation,
      onEndAnimation,
      onFlipDown,
      setDisableCard,
      imgIndex,
      isLoaded,
    };
  },
};
</script>
