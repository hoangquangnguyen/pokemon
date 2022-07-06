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
        class="card_face card_face-font bg-white text-black"
        :style="{
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          'background-size': 'contain',
          backgroundImage: `url(${require('@/assets/image/' +
            cardindex +
            '.png')})`,
        }"
      ></div>
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

    function onToggleFlipCard() {
      if (isDisable.value == false) {
        if (isFlipped.value == false) {
          isFlipped.value = true;
          store.dispatch("increment", 0);
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
    return {
      onToggleFlipCard,
      isFlipped,
      isDisable,
      onStartAnimation,
      onEndAnimation,
      onFlipDown,
      setDisableCard,
    };
  },
};
</script>
