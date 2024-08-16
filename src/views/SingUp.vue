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
      v-model="user.phone"
    />

    <input
      class="my-input interface m-2 p-3"
      type="email"
      placeholder="ایمیل"
      v-model="user.email"
    />

    <input
      class="my-input interface m-2 p-3"
      type="text"
      placeholder="نام"
      v-model="user.first_name"
    />

    <input
      class="my-input interface m-2 p-3"
      type="text"
      placeholder="نام خانوادگی"
      v-model="user.last_name"
    />

    <input
      class="my-input interface m-2 p-3"
      type="password"
      placeholder="رمز عبور"
      v-model="user.password"
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
import axios from "axios";

export default {
  data() {
    return {
      user: {
        phone: null,
        first_name: null,
        email: null,
        last_name: null,
        password: null,
      },
      re_password: null,
      show_loading: false,
    };
  },
  methods: {
    check_data() {
      if (!this.user.phone) {
        Swal.fire("خطا", "شماره وارد نشده است!", "error");
        return false;
      }

      if (!this.user.first_name) {
        Swal.fire("خطا", "نام وارد نشده است!", "error");
        return false;
      }

      if (!this.user.last_name) {
        Swal.fire("خطا", "نام خانودادگی وارد نشده است!", "error");
        return false;
      }

      if (!this.user.password || this.user.password.length < 8) {
        Swal.fire("خطا", "رمز عبور باید بیش از هشت کاراکتر باشد!", "error");
        return false;
      }

      if (this.re_password !== this.user.password) {
        Swal.fire("خطا", "تکرار رمز عبور یکسان نیست!", "error");
        return false;
      }

      if (!this.user.email) {
        Swal.fire("خطا", "ایمیل وارد نشده است", "error");
        return false;
      }

      return true;
    },
    singup_data() {
      if (this.check_data()) {
        this.show_loading = true;
        axios
          .post(`${this.$host}/api/user/`, this.user)
          .then((data) => {
            this.$set_cookie("token", data.data.token);
            this.$router.push("dashboard");
          })
          .catch((err) => {
            if (err.response.data.phone) {
              Swal.fire("خطا", err.response.data.phone[0], "error");
            }
            if (err.response.data.email) {
              Swal.fire("خطا", err.response.data.email[0], "error");
            }
          });
      }
    },
  },
  mounted() {},
};
</script>
