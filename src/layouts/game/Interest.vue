<template>
  <div>
    Tỉ lệ lãi để qua đêm(% / năm)
    <vs-input
      class="mt-5"
      placeholder="Nhập tỉ lệ lãi qua đêm"
      v-model="rate"
    />
    <vs-button
      class="mt-5 vs-con-loading__container loading-btn"
      @click="saveRate"
      >Lưu
    </vs-button>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data() {
    return {
      rate: 0,
    };
  },

  methods: {
    async saveRate() {
      const check = await this.$store.dispatch("check2fa");
      if(!check){
        return;
      };
      AuthenticationService.setStakingRate({ stakingRate: this.rate }).then((res) => {
        if (res.data.success) {
          return this.$vs.notify({
            text: "Lưu thành công",
            color: "success",
            position: "top-right",
            iconPack: "feather",
            icon: "icon-message-square",
          });
        } else {
          return this.$vs.notify({
            text: res.data.error,
            color: "danger",
            position: "top-right",
            iconPack: "feather",
            icon: "icon-message-square",
          });
        }
      });
    },
  },

  created() {
    AuthenticationService.getStakingRate({ stakingRate: this.rate }).then(
      (res) => {
        this.rate = res.data.data.stakingRate;
      }
    );
  },
};
</script>

<style>
</style>
