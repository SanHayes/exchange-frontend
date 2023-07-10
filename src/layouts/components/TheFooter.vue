<template functional>
  <footer
    class="the-footer flex-wrap justify-between"
    :class="classes"
  ></footer>
</template>

<script>
import BuyNow from "../../components/BuyNow.vue";

export default {
  name: "the-footer",
  props: {
    classes: {
      type: String,
    },
  },
  inject: {
    components: {
      default: {
        BuyNow,
      },
    },
  },
};
</script>
