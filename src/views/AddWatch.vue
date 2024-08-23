<template>
  <div class="container my-border col-10 col-xl-12 m-4 mt-5 p-1" dir="rtl">
    <div class="mb-5">
      <div class="row justify-content-center mt-5">
        <div class="">
          <input
            type="text"
            class="interface my-input col-6 col-lg-3 txt-alg-cen"
            placeholder="عنوان واچ"
            v-model="watch.title"
          />
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="">
          <input
            type="text"
            class="interface my-input col-6 col-lg-3 txt-alg-cen"
            placeholder="جست و جوی نماد"
            v-model="search_text"
            @input="search"
          />
        </div>
      </div>

      <div
        class="row justify-content-center mt-5"
        v-if="searched_stocks && search_text.trim()"
      >
        <div
          class="col-5 col-lg-3 row"
          style="
            overflow-y: scroll;
            max-height: 100px;
            overflow-x: hidden;
            justify-content: center;
          "
        >
          <button
            v-for="stock in searched_stocks"
            :key="stock.id"
            class="m-1 col my-btn interface my-border"
            @click="select_stock(stock)"
            :id="stock.id"
          >
            {{ stock.symbol }}
          </button>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="">
          <select
            class="my-select col-6 col-lg-3"
            v-model="watch.cond_variable"
          >
            <option class="txt-alg-cen" value="last">آخرین قیمت</option>
            <option class="txt-alg-cen" value="close">قیمت بسته شدن</option>
            <option class="txt-alg-cen" value="open">قیمت باز شدن</option>
            <option class="txt-alg-cen" value="yesterday">قیمت دیروز</option>
            <option class="txt-alg-cen" value="high">بیشترین قیمت</option>
            <option class="txt-alg-cen" value="low">کمترین قیمت</option>
            <option class="txt-alg-cen" value="count">تعداد</option>
            <option class="txt-alg-cen" value="volume">حجم</option>
            <option class="txt-alg-cen" value="value">ارزش</option>
          </select>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="">
          <select class="my-select col-6 col-lg-3" v-model="watch.cond">
            <option class="txt-alg-cen" value="gr">بزرگ‌تر مساوی</option>
            <option class="txt-alg-cen" value="lt">کوچک‌تر مساوی</option>
          </select>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="">
          <input
            type="text"
            class="interface my-input col-6 col-lg-3 txt-alg-cen"
            placeholder="مقدار"
            dir="ltr"
            v-model="watch.value"
          />
        </div>
      </div>
      <input
        type="submit"
        class="my-btn interface my-border mt-5 col-6 col-lg-3"
        style="height: 35px"
        value="افزودن به واچ لیست"
      />
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

.txt-alg-cen {
  text-align: center;
}

.selected-btn {
  background-color: #404040;
  border-color: #5dade2;
}
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      stocks: null,
      searched_stocks: null,
      search_text: null,
      watch: {
        cond_variable: "last",
        cond: "gr",
      },
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

    search() {
      this.searched_stocks = [];
      for (let stock of this.stocks) {
        if (stock.symbol.includes(this.search_text.trim())) {
          this.searched_stocks.push(stock);
        }
      }
    },

    select_stock(stock) {
      this.watch.stock = stock.id;
      this.searched_stocks = [stock];
      this.search_text = stock.symbol;
      document
        .getElementById(stock.id.toString())
        .classList.add("selected-btn");
    },
  },
};
</script>
