<template>
  <div>
    <div class="container my-border col-10 col-xl-12 m-4 mt-5 p-1" dir="rtl">
      <div class="row m-3">
        <BackTag class="col-1" back-to="/dashboard" />
        <LoadingTag v-if="!watch.id || show_loading_del_watch" />
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
          @click="edit_watch"
        >
          <p>ثبت ویرایش</p>
          <LoadingTag class="mt-3" v-if="show_loading_new_watch" />
        </button>

        <div class="justify-content-center mt-5 p-color" v-if="watch.title">
          <button
            class="btn btn-outline-secondary"
            v-if="!watch.enable"
            @click="enable_disable_watch()"
          >
            غیر فعال
          </button>

          <button
            class="btn btn-outline-light"
            v-if="watch.enable"
            @click="enable_disable_watch()"
          >
            فعال
          </button>

          <button
            class="btn m-1 btn-outline-danger"
            v-if="watch"
            @click="delete_watch()"
          >
            حذف
          </button>
        </div>
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
            @click="watch.condition = tsetmc_close_price_detail.pDrCotVal"
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
          @click="watch.condition = tsetmc_close_price_detail.pClosing"
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
          @click="watch.condition = tsetmc_close_price_detail.priceFirst"
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
          @click="watch.condition = tsetmc_close_price_detail.priceYesterday"
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
          @click="watch.condition = tsetmc_close_price_detail.qTotTran5J"
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
          @click="watch.condition = tsetmc_close_price_detail.qTotCap"
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
import BackTag from "@/components/BackTag.vue";
import { Watch, Stock } from "@/bourseakSDK";

export default {
  components: { LoadingTag, BackTag },
  props: {
    watchId: String,
  },
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
      show_loading_del_watch: false,
    };
  },
  mounted() {
    this.get_all_stocks();
    this.get_watch_details(this.watchId);
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

    edit_watch() {
      if (this.check_inputs_not_empty()) {
        this.show_loading_new_watch = true;
        let watch = new Watch(this.$get_cookie("token"));
        watch
          .editWatch(
            this.watchId,
            this.watch.title,
            this.watch.cond,
            this.watch.cond_variable,
            this.watch.condition,
            this.watch.stock,
            this.watch.enable
          )
          .then(() => {
            Swal.fire("", "سهام با موفقیت ویرایش شد.", "success");
            this.$router.push("/dashboard");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Swal.fire("خطلا", "لطفا همه فیلد ها پر کنید.", "error");
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
      if (!this.watch.condition) {
        Swal.fire("هشدار", "مقداری برای این شرط انتخاب کنید!", "warning");
        return false;
      }
      return true;
    },

    get_watch_details(id) {
      let watch = new Watch(this.$get_cookie("token"));
      watch
        .getWatch(id)
        .then((watchData) => {
          // this.watch.title = watchData.title;
          // this.watch.condition = watchData.condition;
          // this.watch.cond_variable = watchData.cond_variable;
          // this.watch.cond = watchData.cond;
          // this.watch.stock = watchData.stock;
          this.watch = watchData;
          let stock = new Stock();
          stock
            .getStock(watchData.stock)
            .then((stockData) => {
              this.search_text = stockData.symbol;
            })
            .catch((err) => {
              Swal.fire("خطا در دریافت اطلاعات", `${err.message}`, "error");
            });
        })
        .catch((err) => {
          Swal.fire("خطلا", `${err}`, "error");
        });
    },

    enable_disable_watch() {
      this.watch.enable = !this.watch.enable;
    },

    delete_watch() {
      Swal.fire({
        title: "آیا مطمئن هستید می‌خواهید از واچ لیست حذف کنید؟",
        confirmButtonText: "بله",
        showDenyButton: true,
        denyButtonText: "لغو",
      }).then((result) => {
        if (result.isConfirmed) {
          this.show_loading_del_watch = true;
          let watch = new Watch(this.$get_cookie("token"));
          watch
            .deleteWatch(this.watch.id)
            .then(() => {
              Swal.fire("حذف شد!", "", "warning");
              this.$router.push("/dashboard");
            })
            .catch((err) => {
              Swal.fire("خطا", err.message, "error");
              this.show_loading_del_watch = false;
            });
        }
      });
    },
  },
};
</script>
