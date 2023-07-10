<template>
  <transition :name="routerTransition" mode="out-in">
    <router-view
      @changeRouteTitle="changeRouteTitle"
      @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)"
    />
  </transition>
</template>

<script>
import themeConfig from "@/../themeConfigClient.js";

export default {
  data() {
    return {
      routerTransition: themeConfig.routerTransition || "none",
    };
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
  },
};
</script>
