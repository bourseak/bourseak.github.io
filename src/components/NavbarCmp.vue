<template>
  <nav
    class="navbar navbar-expand-lg bg-dark navbar-dark justify-content-center"
  >
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item" v-if="this.$is_logedin()">
            <router-link class="nav-link active br-lr" to="/dashboard">
              داشبورد
            </router-link>
          </li>

          <li class="nav-item" v-if="this.$is_logedin()">
            <router-link class="nav-link active br-lr" to="/performance"
              >تنظیمات</router-link
            >
          </li>

          <li class="nav-item" v-if="!this.$is_logedin()">
            <a class="nav-link active br-lr" href="/login">ورود / ثبت‌نام</a>
          </li>

          <li class="nav-item">
            <router-link class="nav-link active br-lr" to="/about"
              >درباره ما</router-link
            >
          </li>

          <li class="nav-item" v-if="this.user">
            <p class="nav-link active" href="/about">
              پکیج: {{ this.user.package }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { User } from "@/bourseakSDK";
export default {
  name: "NavbarCmp",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    get_user() {
      let user = new User(this.$get_cookie("token"));
      user
        .getUser()
        .then((nuser) => {
          this.user = nuser;
        })
        .catch((err) => {
          //TODO: fucking do some fucking thing for this shit
          console.log(err);
        });
    },
  },
  mounted() {
    if (this.$is_logedin()) {
      this.get_user();
    }
  },
};
</script>

<style scoped>
.navbar {
  background-color: #404040 !important;
}

.br-lr {
  border-right: 0.5px #1abc9c solid;
}

.br-lr:hover {
  border-color: #af7ac5;
}
</style>
