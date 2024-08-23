<template>
  <div>
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
              type="number"
              class="interface my-input col-6 col-lg-3 txt-alg-cen number-to-text"
              placeholder="مقدار"
              dir="ltr"
              v-model="watch.value"
            />
          </div>
        </div>
        <button
          type="submit"
          class="my-btn interface my-border mt-5 col-6 col-lg-3 p-1"
          style="height: 35px"
          @click="add_watch"
        >
          <p>افزودن به واچ لیست</p>
          <LoadingTag class="mt-3" v-if="show_loading_new_watch" />
        </button>
      </div>
    </div>

    <LoadingTag v-if="show_tsetmc_loading" />

    <div
      class="container my-border col-10 col-xl-12 m-4 mt-5 pt-5 pb-5 w-color"
      dir="rtl"
      v-if="tsetmc_close_price_detail"
    >
      <div>
        <div class="row justify-content-center">
          <p class="col-3">آخرین معامله</p>
          <button
            class="col-2 my-btn tsetmc-btn interface"
            @click="watch.value = tsetmc_close_price_detail.pDrCotVal"
          >
            {{ tsetmc_close_price_detail.pDrCotVal }}
          </button>
        </div>
        <div class="row justify-content-center m-3">
          <hr class="col-6" />
        </div>
      </div>

      <div class="row justify-content-center">
        <p class="col-3">قیمت پایانی</p>
        <button
          class="col-2 my-btn tsetmc-btn interface"
          @click="watch.value = tsetmc_close_price_detail.pClosing"
        >
          {{ tsetmc_close_price_detail.pClosing }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">اولین قیمت</p>
        <button
          class="col-2 my-btn tsetmc-btn interface"
          @click="watch.value = tsetmc_close_price_detail.priceFirst"
        >
          {{ tsetmc_close_price_detail.priceFirst }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">قیمت دیروز</p>
        <button
          class="col-2 my-btn tsetmc-btn interface"
          @click="watch.value = tsetmc_close_price_detail.priceYesterday"
        >
          {{ tsetmc_close_price_detail.priceYesterday }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">حجم معاملات</p>
        <button
          class="col-2 my-btn tsetmc-btn interface"
          @click="watch.value = tsetmc_close_price_detail.qTotTran5J"
        >
          {{ tsetmc_close_price_detail.qTotTran5J }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">ارزش معاملات</p>
        <button
          class="col-2 my-btn tsetmc-btn interface"
          @click="watch.value = tsetmc_close_price_detail.qTotCap"
        >
          {{ tsetmc_close_price_detail.qTotCap }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
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

.txt-alg-cen {
  text-align: center;
}

.selected-btn {
  background-color: #404040;
  border-color: #5dade2;
}

.tsetmc-btn {
  border: 0.5px solid #af7ac5;
  border-radius: 13px;
  color: #ecf0f1;
}

.tsetmc-btn:hover {
  background: #af7ac5;
}
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import LoadingTag from "@/components/LoadingTag.vue";

export default {
  components: { LoadingTag },
  data() {
    return {
      stocks: null,
      searched_stocks: null,
      search_text: null,
      watch: {
        cond_variable: "last",
        cond: "gr",
      },
      tsetmc_close_price_detail: null,
      show_tsetmc_loading: false,
      show_loading_new_watch: false,
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
      this.get_tsetmc_data(stock);
    },

    add_watch() {
      if (this.check_inputs_not_empty()) {
        this.show_loading_new_watch = true;
        axios
          .post(`${this.$host}/api/onwatch/`, this.watch, this.$config)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "با موفقیت به واچ لیست اضافه شد",
              showConfirmButton: false,
              timer: 1000,
            });
            this.$router.push("/dashboard");
          })
          .catch((err) => {
            Swal.fire("خطلا", `${err}`, "error");
            this.show_loading_new_watch = false;
          });
      }
    },

    get_tsetmc_data(stock) {
      this.show_tsetmc_loading = true;
      axios
        .get(`${this.$tsetmc_close}/${stock.symbol_id}/`)
        .then((data) => {
          this.tsetmc_close_price_detail = data.data.closingPriceInfo;
          this.show_tsetmc_loading = false;
        })
        .catch((err) => {
          console.log(err.message);
          this.show_tsetmc_loading = false;
          Swal.fire("خطا", `${err.message}`, "error");
        });
    },

    check_inputs_not_empty() {
      if (!this.watch.title || !this.watch.title.trim()) {
        Swal.fire("هشدار", "عنوان را وارد کنید!", "warning");
        return false;
      }
      if (!this.watch.stock) {
        Swal.fire("هشدار", "یک سهم انتخاب کنید!", "warning");
        return false;
      }
      if (!this.watch.value) {
        Swal.fire("هشدار", "مقداری برای این شرط انتخاب کنید!", "warning");
        return false;
      }
      return true;
    },
  },
};
</script>
