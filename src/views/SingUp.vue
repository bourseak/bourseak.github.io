<template>
  <div
    dir="rtl"
    class="my-border row p-5 col-5 col-lg-3 centered-container mt-5"
  >
    <div>
      <h3 class="w-color">ساخت حساب</h3>

      <!-- loding...-->
      <div v-if="show_loading">
        <div class="spinner-grow p-color" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow g-color" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow b-color" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow o-color" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <input
      class="my-input interface m-2 p-3 number-to-text"
      type="number"
      placeholder="شماره مبایل"
      v-model="phone"
    />

    <input
      class="my-input interface m-2 p-3"
      type="text"
      placeholder="نام"
      v-model="name"
    />

    <input
      class="my-input interface m-2 p-3"
      type="text"
      placeholder="نام خانوادگی"
      v-model="last_name"
    />

    <input
      class="my-input interface m-2 p-3"
      type="password"
      placeholder="رمز عبور"
      v-model="password"
    />

    <input
      class="my-input interface m-2 p-3"
      type="password"
      placeholder="تکرار رمز عبور"
      v-model="re_password"
    />

    <input
      class="p-3 w-100 interface m-1 my-border my-btn mt-5"
      type="submit"
      value="ایجاد حساب"
      @click="singup_data"
    />
    <router-link
      to="/login"
      class="mt-5 b-color y-color-hover"
      style="text-decoration: none"
      >اکانت دارید؟ وارد شوید</router-link
    >
  </div>
</template>

<style scoped></style>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      phone: null,
      name: null,
      last_name: null,
      password: null,
      re_password: null,
      show_loading: false,
    };
  },
  methods: {
    check_data() {
      if (!this.phone) {
        Swal.fire("خطا", "شماره اشتباه وارد شده است!", "error");
        return false;
      }

      if (!this.name) {
        Swal.fire("خطا", "نام اشتباه وارد شده است!", "error");
        return false;
      }

      if (!this.last_name) {
        Swal.fire("خطا", "نام خانودادگی اشتباه وارد شده است!", "error");
        return false;
      }

      if (!this.password || this.password.length < 8) {
        Swal.fire("خطا", "رمز عبور اشتباه وارد شده است!", "error");
        return false;
      }

      if (this.re_password !== this.password) {
        Swal.fire("خطا", "تکرار رمز عبور اشتباه است!", "error");
        return false;
      }
      return true;
    },
    singup_data() {
      if (this.check_data()) {
        this.show_loading = true;
      }
    },
  },
  mounted() {},
};
</script>
