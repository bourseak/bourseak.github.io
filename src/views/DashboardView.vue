<template>
  <div class="row">
    <div class="my-border col-10 col-xl-12 m-4 mt-5 row p-1">
      <router-link to="/watch/add" class="my-btn interface m-1 btn-bg">
        <span class="icono-plus"></span>
      </router-link>

      <button class="my-btn interface m-1 btn-bg" @click="refresh">
        <span class="icono-sync"></span>
      </button>

      <button class="my-btn interface m-1 btn-bg" @click="search_btn">
        <span class="icono-search"></span>
      </button>

      <button
        class="my-btn interface m-1 btn-bg"
        @click="
          show_filters = !show_filters;
          show_search_bar = true;
          search_btn();
        "
      >
        <span class="icono-sliders"></span>
      </button>

      <div
        class="col-2 input-bg row m-1"
        style="align-content: center"
        v-if="show_filters"
      >
        <select
          class="form-select-sm col m-1 my-select"
          aria-label="Small select example"
          v-model="filter_item"
          @change="filter"
        >
          <option value="all" selected class="my-option">همه</option>
          <option value="last" class="my-option">آخرین</option>
          <option value="close" class="my-option">بسته شدن</option>
          <option value="open" class="my-option">باز شدن</option>
          <option value="yesterday" class="my-option">دیروز</option>
          <option value="high" class="my-option">بیشترین</option>
          <option value="low" class="my-option">کمترین</option>
          <option value="count" class="my-option">تعداد</option>
          <option value="volume" class="my-option">حجم</option>
          <option value="value" class="my-option">ارزش</option>
          <option value="true" class="my-option">فعال</option>
          <option value="false" class="my-option">غیر فعال</option>
        </select>
      </div>

      <div class="col-1" style="align-content: center">
        <input
          @input="search"
          class="input-bg"
          placeholder="جست و چو در واچ لیست"
          v-model="search_text"
          id="searchbar"
          hidden
        />
      </div>
    </div>

    <div
      class="my-border col-10 col-xl-12 m-4 mt-1 p-5 darker_bg cardy-container mb-5"
    >
      <i v-if="onwatch.length === 0 && !show_loading" style="color: #95a5a6">
        <span class="icono-exclamationCircle" style="color: #af7ac5"></span>
        هنوز هیچ سهامی به واچ لیست اضافه نکرده‌اید
      </i>
      <LoadingTag v-if="show_loading" />

      <div
        v-if="onwatch_list"
        class="row row-cols-1 row-cols-md-4 row-cols-lg-6 justify-content-center"
      >
        <div
          v-for="watch in onwatch_list"
          class="my-card p-3 w-color m-1 mt-3"
          :key="watch.id"
        >
          <p>{{ watch.title }}</p>
          <hr />
          <p>{{ watch.stock }}</p>
          <hr />
          <p v-if="watch.cond_variable === 'last'">اخرین قیمت</p>
          <p v-if="watch.cond_variable === 'close'">قیمت بسته شدن</p>
          <p v-if="watch.cond_variable === 'open'">قیمت باز شدن</p>
          <p v-if="watch.cond_variable === 'yesterday'">قیمت دیروز</p>
          <p v-if="watch.cond_variable === 'high'">بیشترین قیمت</p>
          <p v-if="watch.cond_variable === 'low'">کمترین قیمت</p>
          <p v-if="watch.cond_variable === 'count'">تعداد</p>
          <p v-if="watch.cond_variable === 'volume'">حجم</p>
          <p v-if="watch.cond_variable === 'value'">ارزش</p>
          <hr />
          <p class="g-color" v-if="watch.enable">فعال</p>
          <p class="o-color" v-else>غیر فعال</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardy-container {
  overflow-y: scroll;
  height: 800px;
  max-height: 800px;
  min-height: 800px;
}

::-webkit-scrollbar {
  width: 7px;
  display: none;
}

::-webkit-scrollbar-track {
  background-color: #313131;
}

::-webkit-scrollbar-thumb {
  border-radius: 13px;
  background-color: #505050;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #606060;
  border-radius: 13px;
}

.btn-bg {
  background-color: #404040;
  width: 5%;
  border: none;
  color: #1abc9c;
  border-radius: 13px;
}

.btn-bg:hover {
  background-color: #353535;
  color: #af7ac5;
}

.my-card {
  border: 0.5px solid #af7ac5;
  background-color: #353535;
  border-radius: 13px;
}

hr {
  background-color: #58d68d;
  border-color: #58d68d;
}

.input-bg {
  background-color: #404040;
  border: none;
  color: #42b983;
  border-radius: 13px;
  text-align: center;
}

.input-bg:focus {
  outline: 0.5px #1abc9c solid;
}

.my-select {
  background-color: transparent;
  color: #b3b6b7;
  outline: none;
  border: none;
  border-radius: 13px;
}

.my-option {
  background-color: #404040;
}
</style>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import LoadingTag from "@/components/LoadingTag.vue";
export default {
  components: { LoadingTag },
  data() {
    return {
      onwatch: [],
      show_loading: true,
      show_search_bar: false,
      search_text: null,
      onwatch_list: [],
      show_filters: false,
      filter_item: "all",
    };
  },
  methods: {
    get_watchlist() {
      if (!this.$is_logedin()) {
        Swal.fire({
          title: "خطا",
          text: "شما باید اول وارد شوید!",
          icon: "warning",
        });
        this.$router.push("/login");
      }

      axios
        .get(`${this.$host}/api/onwatch/`, this.$config)
        .then((watchs) => {
          if (watchs.data.length !== 0) {
            for (const watch of watchs.data) {
              axios
                .get(`${this.$host}/api/stock/${watch.stock}/`)
                .then((stock) => {
                  watch.stock = stock.data.symbol;
                  this.onwatch.push(watch);
                  this.onwatch_list.push(watch);
                })
                .catch((err) => {
                  this.show_loading = false;
                  console.log(err);
                });
            }
          }
          this.show_loading = false;
        })
        .catch((err) => {
          this.show_loading = false;
          console.log(err);
        });
    },

    search() {
      if (this.onwatch.length !== 0) {
        this.onwatch_list = [];
        for (let watch of this.onwatch) {
          if (
            watch.stock.includes(this.search_text) ||
            watch.title.includes(this.search_text)
          ) {
            this.onwatch_list.push(watch);
          }
        }
      }
    },

    search_btn() {
      document.getElementById("searchbar").hidden = this.show_search_bar;
      this.show_search_bar = !this.show_search_bar;
      document.getElementById("searchbar").focus();
    },

    filter() {
      if (this.filter_item !== "all") {
        this.onwatch_list = [];
        for (var watch of this.onwatch) {
          if (
            watch.cond_variable === this.filter_item ||
            watch.enable.toString() === this.filter_item
          ) {
            this.onwatch_list.push(watch);
          }
        }
      } else {
        this.onwatch_list = this.onwatch;
      }
    },

    refresh() {
      this.show_loading = true;
      this.onwatch_list = [];
      this.onwatch = [];
      this.get_watchlist();
      this.filter_item = "all";
      this.search_text = null;
    },
  },
  mounted() {
    this.get_watchlist();
  },
};
</script>
