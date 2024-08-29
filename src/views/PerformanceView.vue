<template>
  <div>
    <div
      class="container row my-border col-10 col-xl-12 m-4 mt-5 p-1 w-color justify-content-center"
      style="min-height: 800px"
    >
      <div
        class="my-border m-4s w-color col-10 row justify-content-center tab row p-1"
      >
        <button
          class="col-4 col-lg-1 m-1 tab-btn m-1 text-center"
          id="warning"
          @click="show_user('warning')"
        >
          هشدار
        </button>
        <button
          class="col-4 col-lg-1 m-1 tab-btn m-1 tab-btn-active text-center"
          id="user"
          @click="show_user('user')"
        >
          کاربری
        </button>
      </div>
      <UserPerformance v-if="active_tab === 'user'" />
    </div>
  </div>
</template>

<style scoped>
.tab {
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-radius: 0px;
  height: 8%;
}

.tab-btn {
  background-color: #404040;
  color: #b3b6b7;
  border: 0px;
  border-radius: 13px;
}

.tab-btn-active {
  border: #1abc9c 0.5px solid;
  color: #af7ac5;
}

.tab-btn:hover {
  color: #af7ac5;
}
</style>

<script>
import UserPerformance from "@/components/UserPerformance.vue";

export default {
  components: { UserPerformance },
  data() {
    return {
      active_tab: "user",
    };
  },
  methods: {
    show_user(element_name) {
      if (this.active_tab === element_name) {
        return;
      }
      document.getElementById(element_name).classList.add("tab-btn-active");
      document
        .getElementById(this.active_tab)
        .classList.remove("tab-btn-active");
      this.active_tab = element_name;
    },
  },
  mounted() {},
};
</script>
