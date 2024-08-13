<template>
  <div style="background-color: #313131; height: 100vh">
    <NavbarCmp />

    <div class="container mpage">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.mpage {
  margin-top: 1%;
}
</style>

<script>
import NavbarCmp from "@/components/NavbarCmp.vue";

export default {
  components: {
    NavbarCmp,
  },
};
</script>
