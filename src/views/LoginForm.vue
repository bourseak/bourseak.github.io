<template>
  <div
    dir="rtl"
    class="my-border row p-5 col-5 col-lg-3 centered-container mt-5"
  >
    <h3 class="w-color">ورود به حساب</h3>
    <input
      class="my-input interface m-2 p-3"
      type="text"
      placeholder="شماره مبایل"
    />
    <input
      class="my-input interface m-2 p-3"
      type="password"
      placeholder="رمز عبور"
    />
    <input
      class="p-3 w-100 interface m-1 my-border my-btn mt-5"
      type="submit"
      value="ورود"
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

<script setup></script>

<style scoped></style>
