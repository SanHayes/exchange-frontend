<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
  </div>
</template>

<script>
export default {
  name: "DaiLy",
  metaInfo: {
    title: "Đại lý",
  },
  data() {
    return {
      vueAppClasses: [],
    };
  },
  methods: {
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr);
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
