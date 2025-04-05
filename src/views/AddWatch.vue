<template>
  <div>
    <div class="container my-border col-10 col-xl-12 m-4 mt-5 p-1" dir="rtl">
      <div class="row m-3">
        <BackTag class="col-1" back-to="/dashboard" />
        <LoadingTag v-if="!this.stocks" />
      </div>
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
              :disabled="!this.stocks"
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
              <option class="txt-alg-cen" value="m_volume">
                میانگین حجم ماهانه
              </option>
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

        <div
          class="row justify-content-center mt-5"
          v-if="watch.cond_variable == 'm_volume'"
        >
          <div class="">
            <button
              type="button"
              class="col-2 col-lg-1 my-btn my-border p-color darker_bg"
              dir="ltr"
              @click="mul_adder"
            >
              + 1
            </button>

            <button
              type="button"
              class="col-2 col-lg-1 my-btn my-border o-color darker_bg o-color-hover m-1"
              dir="ltr"
              @click="mul_miner"
            >
              - 1
            </button>
          </div>
          <button
            type="button"
            class="my-btn col-4 col-lg-2 my-border b-color darker_bg m-1"
            dir="ltr"
            @click="multiplexr()"
          >
            x {{ multipled_by }}
          </button>
        </div>

        <div class="row justify-content-center mt-5">
          <div class="">
            <input
              type="number"
              class="interface my-input col-6 col-lg-3 txt-alg-cen number-to-text"
              placeholder="مقدار"
              dir="ltr"
              v-model="watch.condition"
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
            class="col-6 my-btn tsetmc-btn interface col-md-2"
            @click="watch.condition = tsetmc_close_price_detail.last"
          >
            {{ tsetmc_close_price_detail.last }}
          </button>
        </div>
        <div class="row justify-content-center m-3">
          <hr class="col-6" />
        </div>
      </div>

      <div class="row justify-content-center">
        <p class="col-3">قیمت پایانی</p>
        <button
          class="col-6 my-btn tsetmc-btn interface col-md-2"
          @click="watch.condition = tsetmc_close_price_detail.close"
        >
          {{ tsetmc_close_price_detail.close }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">اولین قیمت</p>
        <button
          class="col-6 my-btn tsetmc-btn interface col-md-2"
          @click="watch.condition = tsetmc_close_price_detail.open"
        >
          {{ tsetmc_close_price_detail.open }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">قیمت دیروز</p>
        <button
          class="col-6 my-btn tsetmc-btn interface col-md-2"
          @click="watch.condition = tsetmc_close_price_detail.yesterday"
        >
          {{ tsetmc_close_price_detail.yesterday }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">حجم معاملات</p>
        <button
          class="col-6 my-btn tsetmc-btn interface col-md-2"
          @click="watch.condition = tsetmc_close_price_detail.volume"
        >
          {{ tsetmc_close_price_detail.volume }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">ارزش معاملات</p>
        <button
          class="col-6 my-btn tsetmc-btn interface col-md-2"
          @click="watch.condition = tsetmc_close_price_detail.value"
        >
          {{ tsetmc_close_price_detail.value }}
        </button>
      </div>
      <div class="row justify-content-center m-3">
        <hr class="col-6" />
      </div>

      <div class="row justify-content-center">
        <p class="col-3">میانگین حجم ماهانه</p>
        <button
          class="col-6 my-btn tsetmc-btn interface col-md-2"
          @click="watch.condition = tsetmc_close_price_detail.m_volume"
        >
          {{ tsetmc_close_price_detail.m_volume }}
        </button>
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
import BackTag from "@/components/BackTag.vue";
import { TSETMC, Stock } from "@/bourseakSDK";

export default {
  components: { LoadingTag, BackTag },
  data() {
    return {
      stocks: null,
      searched_stocks: null,
      search_text: null,
      multipled_by: 2,
      watch: {
        cond_variable: "last",
        cond: "gr",
        enable: true,
      },
      tsetmc_close_price_detail: null,
      show_tsetmc_loading: false,
      show_loading_new_watch: false,
      avg_monthly: null,
      stock_price: null,
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
      // this.get_tsetmc_data(stock);
      this.show_tsetmc_loading = true;
      let st = new Stock();
      st.getStockPrice(stock.price)
        .then((price) => {
          this.tsetmc_close_price_detail = price;
          this.avg_monthly = this.tsetmc_close_price_detail.m_volume;
          this.show_tsetmc_loading = false;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "اطلاعات قیمت ها دریافت نشد، صفحه را رفرش کنید",
            text: err.message,
          });
          this.show_tsetmc_loading = false;
        });
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
            Swal.fire("خطلا", `${err.response.data.msg}`, "error");
            this.show_loading_new_watch = false;
          });
      }
    },

    get_tsetmc_data(stock) {
      this.show_tsetmc_loading = true;
      let stk = new TSETMC(stock.symbol_id);
      stk
        .getMonthlyVolume()
        .then((avg) => {
          this.avg_monthly = avg;
        })
        .catch((err) => {
          Swal.fire("خطا", `${err}`, "error");
        });

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
      if (!this.watch.condition) {
        Swal.fire("هشدار", "مقداری برای این شرط انتخاب کنید!", "warning");
        return false;
      }
      return true;
    },

    multiplexr() {
      this.watch.condition = this.avg_monthly * this.multipled_by;
    },

    mul_miner() {
      if (this.multipled_by > 2) {
        this.multipled_by -= 1;
      }
    },

    mul_adder() {
      this.multipled_by += 1;
    },
  },
};
</script>
