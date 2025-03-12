<template>
  <div>
    <button class="btn btn-outline-light" @click="back()">
      <span class="icono-caretLeft"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "BackTag",
  props: {
    backTo: String,
  },
  methods: {
    back() {
      this.$router.push(this.backTo);
    },
  },
};
</script>

<style scoped></style>
