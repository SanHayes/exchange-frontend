<template>
  <div>
    <Login v-if="!isLogin" @success="isLogin = true" />
    <div v-else>
      <div class="cursor-pointer logout-btn" @click="logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          width="25"
          height="25"
          x="0"
          y="0"
          viewBox="0 0 24 24"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m12 24a11 11 0 0 0 4.4-21.077 1 1 0 1 0 -.8 1.833 9 9 0 1 1 -7.2 0 1 1 0 1 0 -.8-1.833 11 11 0 0 0 4.4 21.077z"
              fill="#000000"
              data-original="#000000"
            ></path>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m12 10a1 1 0 0 0 1-1v-8a1 1 0 0 0 -2 0v8a1 1 0 0 0 1 1z"
              fill="#000000"
              data-original="#000000"
            ></path>
          </g>
        </svg>
      </div>
      <F17TableVue />
    </div>
  </div>
</template>

<script>
import F17TableVue from "./components/BangThongKe/F17Table.vue";
import Login from "./components/Login.vue";
export default {
  components: {
    Login,
    F17TableVue,
  },
  data() {
    return {
      isLogin: localStorage.getItem("tokenAgency") ? true : false,
      info: {},
    };
  },

  methods: {
    logout() {
      localStorage.removeItem("tokenAgency");
      this.isLogin = false;
    },
  },
};
</script>

<style scoped>
.logout-btn {
  position: fixed;
  right: 50px;
  top: 20px;
}
</style>
