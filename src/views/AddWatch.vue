<template>
  <div class="container my-border col-10 col-xl-12 m-4 mt-5 p-1" dir="rtl">
    <div class="mb-5">
      <div class="row justify-content-center mt-5">
        <div class="">
          <input
            type="text"
            class="interface my-input col-6 col-lg-3"
            placeholder="عنوان واچ"
          />
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="">
          <input
            type="text"
            class="interface my-input col-6 col-lg-3"
            placeholder="نماد"
          />
        </div>
      </div>

      <div class="row justify-content-center mt-5" v-if="stocks">
        <div
          class="col-5 col-lg-2 row"
          style="
            overflow-y: scroll;
            max-height: 100px;
            overflow-x: hidden;
            justify-content: center;
          "
        >
          <button
            v-for="stock in stocks"
            :key="stock.id"
            class="m-1 col my-btn interface my-border"
          >
            {{ stock.symbol }}
          </button>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="">
          <select class="my-select col-6 col-lg-3">
            <option>آخرین قیمت</option>
            <option>قیمت بسته شدن</option>
            <option>قیمت باز شدن</option>
            <option>قیمت دیروز</option>
            <option>بیشترین قیمت</option>
            <option>کمترین قیمت</option>
            <option>تعداد</option>
            <option>حجم</option>
            <option>ارزش</option>
          </select>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="">
          <select class="my-select col-6 col-lg-3">
            <option>بزرگ‌تر مساوی</option>
            <option>کوچک‌تر مساوی</option>
          </select>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="">
          <input
            type="text"
            class="interface my-input col-6 col-lg-3"
            placeholder="مقدار"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 7px;
  display: flex;
}

::-webkit-scrollbar-track {
  border-radius: 13px;
  background-color: #606060;
}

::-webkit-scrollbar-thumb {
  border-radius: 13px;
  background-color: #1abc9c;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #af7ac5;
  border-radius: 13px;
}

.my-select {
  background-color: #404040;
  border-radius: 13px;
  color: #b3b6b7;
  outline: none;
  border: none;
  height: 130%;
}
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      stocks: null,
    };
  },
  mounted() {
    this.get_all_stocks();
  },
  methods: {
    get_all_stocks() {
      axios
        .get(`${this.$host}/api/stock/`)
        .then((stocks) => (this.stocks = stocks.data))
        .catch((err) => {
          Swal.fire("خطلا", `${err}`, "error");
        });
    },
  },
};
</script>
