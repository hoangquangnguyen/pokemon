<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
  <!-- <div class="h-full grid grid-cols-4 gap-1 items-center p-5">
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
    <card-com />
  </div> -->
  <home-page />
</template>

<script lang="ts">
import HomePage from "./views/HomePage.vue";

export default {
  components: { HomePage },
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
