<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
  <play-view />
</template>

<script lang="ts">
import PlayView from "./views/PlayView.vue";

export default {
  components: { PlayView },
  setup() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: "Press Start 2P", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
</style>
