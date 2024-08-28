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
          <li class="nav-item">
            <router-link class="nav-link active br-lr" to="/dashboard">
              داشبرد
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link active br-lr" href="#">تنظیمات</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/about">درباره ما</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarCmp",
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
