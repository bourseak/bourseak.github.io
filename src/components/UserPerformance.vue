<template>
  <div>
    <div class="container row align-content-center justify-content-center p-3">
      <button class="my-btn interface my-border w-25 p-2" @click="logout">
        خروج از حساب کاربری
      </button>
      <hr class="m-5" />
    </div>
  </div>
</template>

<style scoped></style>

<script>
import Swal from "sweetalert2";

export default {
  name: "UserPerformance",
  data() {},
  mounted() {},
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
  },
};
</script>
