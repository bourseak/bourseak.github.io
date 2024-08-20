<template>
  <div
    dir="rtl"
    class="my-border row p-5 col-5 col-lg-3 centered-container mt-5 darker_bg"
  >
    <div>
      <h3 class="w-color">ورود به حساب</h3>

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
      type="password"
      placeholder="رمز عبور"
      v-model="user.password"
    />
    <input
      class="p-3 w-100 interface m-1 my-border my-btn mt-5"
      type="submit"
      value="ورود"
      @click="login_data"
    />
    <div class="row mt-5 p-1">
      <router-link
        to="/singup"
        class="b-color y-color-hover col-6"
        style="text-decoration: none"
        >اکانت ندارید؟ ثبت‌نام کنید</router-link
      >

      <router-link
        to="/singup"
        class="o-color y-color-hover col-6"
        style="text-decoration: none"
        >فراموشی رمز</router-link
      >
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        phone: null,
        password: null,
      },
      show_loading: false,
    };
  },
  methods: {
    check_data() {
      if (!this.user.phone) {
        Swal.fire("خطا", "شماره درست وارد نشده است", "error");
        return false;
      }
      if (!this.user.password) {
        Swal.fire("خطا", "رمز عبور درست وارد نشده است", "error");
        return false;
      }
      return true;
    },
    login_data() {
      if (this.check_data()) {
        this.show_loading = true;
        axios
          .post(`${this.$host}/api/token/`, this.user)
          .then((data) => {
            this.$set_cookie("token", data.data.access);
            window.open("/dashboard");
            // this.$router.push("/dashboard");
          })
          .catch((err) => {
            this.show_loading = false;
            if (err.response.status === 401) {
              this.show_loading = false;
              Swal.fire("خطا", "کاربری با این اطلاعات یافت نشد!", "error");
            }
          });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
