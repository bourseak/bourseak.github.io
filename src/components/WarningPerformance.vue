<template>
  <div class="container row justify-content-center p-3">
    <div>
      <button
        class="my-btn interface my-border col-xl-2 col-10 p-2 text-center"
        @click="connect_tel"
      >
        اتضال به تلگرام
      </button>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "WarningPerformance",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    async connect_tel() {
      var token = await axios.get(`${this.$host}/api/telath/`, this.$config);
      Swal.fire({
        icon: "warning",
        title: "برای اتصال به تلگرام باید فیلترشکن شما روشن باشد",
        confirmButtonText: "متوجه شدم",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(token.data.auth_link);
        }
      });
    },
  },
};
</script>
