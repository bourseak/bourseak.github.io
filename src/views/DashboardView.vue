<template>
  <div class="row" style="height: 50px">
    <div class="my-border col-10 col-xl-12 m-4 mt-5 row p-1">
      <button class="my-btn interface m-1 btn-bg">
        <span class="icono-plus"></span>
      </button>

      <button class="my-btn interface m-1 btn-bg">
        <span class="icono-search"></span>
      </button>
    </div>

    <div
      class="my-border col-10 col-xl-12 m-4 mt-1 p-5 darker_bg cardy-container mb-5"
    >
      <i v-if="!onwatch" style="color: #95a5a6">
        <span class="icono-exclamationCircle" style="color: #af7ac5"></span>
        هنوز هیچ سهامی به واچ لیست اضافه نکرده‌اید
      </i>
    </div>
  </div>
</template>

<style scoped>
.cardy-container {
  overflow-y: scroll;
  height: 800px;
  max-height: 800px;
  min-height: 800px;
}

::-webkit-scrollbar {
  width: 7px;
  display: none;
}

::-webkit-scrollbar-track {
  background-color: #313131;
}

::-webkit-scrollbar-thumb {
  border-radius: 13px;
  background-color: #505050;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #606060;
  border-radius: 13px;
}

.btn-bg {
  background-color: #404040;
  width: 5%;
  border: none;
  color: #1abc9c;
  border-radius: 13px;
}

.btn-bg:hover {
  background-color: #353535;
  color: #af7ac5;
}
</style>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      onwatch: null,
    };
  },
  methods: {
    get_watchlist() {
      if (!this.$is_logedin()) {
        Swal.fire({
          title: "خطا",
          text: "شما باید اول وارد شوید!",
          icon: "warning",
        });
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.get_watchlist();
  },
};
</script>
