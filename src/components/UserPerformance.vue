<template>
  <div>
    <div class="container row align-content-center justify-content-center p-3">
      <div class="row col-12 col-lg-3">
        <div class="row align-items-center">
          <input
            type="text"
            class="user-input interface text-center m-1 col-10 disable-input"
            disabled
            :value="user.phone"
          />
          <label class="col-1">شماره</label>
        </div>

        <div class="row align-items-center">
          <input
            type="text"
            class="user-input interface text-center m-1 col-10 disable-input"
            disabled
            :value="user.email"
          />
          <label class="col-1">ایمیل</label>
        </div>

        <div class="row align-items-center mt-3">
          <input
            type="text"
            class="user-input interface text-center m-1 col-10"
            v-model="user.first_name"
          />
          <label class="col-1">نام</label>
        </div>

        <div class="row align-items-center">
          <input
            type="text"
            class="interface text-center user-input m-1 col-10"
            v-model="user.last_name"
          />
          <label class="col-1">نام خانوادگی</label>
        </div>

        <div class="row align-items-center mt-3">
          <input
            type="text"
            class="interface text-center user-input m-1 col-10"
            v-model="new_password"
            placeholder="رمز عبور جدید"
          />
          <label class="col-1">رمز جدید</label>
        </div>

        <div class="row align-items-center mt-3">
          <button class="my-border my-btn interface m-1 p-2 col-10">
            ذخیره تغییرات
          </button>
        </div>
      </div>
      <hr class="m-5" />

      <button class="my-btn interface my-border w-25 p-2" @click="logout">
        خروج از حساب کاربری
      </button>
      <hr class="m-5" />
    </div>
  </div>
</template>

<style scoped>
.user-input {
  border: 0px;
  border-radius: 13px;
  background-color: #404040;
  height: 40px;
}

.disable-input {
  color: #b2babb;
}

.user-input:active,
.user-input:focus {
  outline: #5dade2 0.5px solid;
}
</style>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "UserPerformance",
  data() {
    return {
      user: {},
      new_password: null,
    };
  },
  mounted() {
    this.get_user();
  },
  methods: {
    logout() {
      Swal.fire({
        title: "آیا مطمئن هستید می‌خواهید از حساب خود خارج شوید؟",
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "لفو",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("با موفیت خارچ شدید!", "", "success");
          // Delete token cookie
          document.cookie =
            "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          this.$router.push("/login");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
    get_user() {
      if (this.$is_logedin) {
        axios
          .get(`${this.$host}/api/user/`, this.$config)
          .then((data) => {
            console.log(data.data);
            this.user = data.data;
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
