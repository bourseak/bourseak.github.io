<template>
  <div class="row">
    <div class="my-border col-10 col-xl-12 m-4 mt-5 row p-1">
      <button class="my-btn interface m-1 btn-bg">
        <span class="icono-plus"></span>
      </button>

      <button class="my-btn interface m-1 btn-bg" @click="show_search_bar=!show_search_bar">
        <span class="icono-search"></span>
      </button>

      <div class="col-1" style="align-content: center" v-if="show_search_bar">
        <input class="input-bg" placeholder="جست و چو در واچ لیست" />
      </div>
    </div>

    <div
      class="my-border col-10 col-xl-12 m-4 mt-1 p-5 darker_bg cardy-container mb-5"
    >
      <i v-if="onwatch.length === 0" style="color: #95a5a6">
        <span class="icono-exclamationCircle" style="color: #af7ac5"></span>
        هنوز هیچ سهامی به واچ لیست اضافه نکرده‌اید
      </i>
      <LoadingTag v-if="show_loading" />

      <div v-if="onwatch" class="row row-cols-1 row-cols-md-4 row-cols-lg-6">
        <div
          v-for="watch in onwatch"
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
  },
  mounted() {
    this.get_watchlist();
  },
};
</script>
