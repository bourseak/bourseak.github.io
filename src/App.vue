<template>
  <div style="height: 100%">
    <NavbarCmp />

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Vazirmatn, Vazir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #313131;
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
