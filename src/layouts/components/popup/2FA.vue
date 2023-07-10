<template>
  <div class="centerx">
    <vs-popup title="Bảo vệ 2FA" :active.sync="popupActive">
      Nhập mã xác thực 2FA để thực hiện thao tác
      <vs-input class="mt-5" placeholder="Nhập mã 2FA" v-model="code_2fa" />
      <vs-button
        class="mt-5 vs-con-loading__container loading-btn"
        @click="confirm"
        >Xác nhận
      </vs-button>
    </vs-popup>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data() {
    return {
      popupActive: false,
      code_2fa: "",
      active2fa: false,
    };
  },

  methods: {
    confirm() {
      this.$vs.loading({
        container: ".loading-btn",
        scale: 0.45,
      });
      AuthenticationService.check2fa({ t: this.code_2fa })
        .then((res) => {
          if (res.data.success == 1) {
            this.$store.dispatch("set2FA", true);
            this.popupActive = false;
            return;
          } else if (res.data.success == 2) {
            return this.$vs.notify({
              text: "Mã xác 2FA không chính xác",
              color: "danger",
              position: "top-right",
              iconPack: "feather",
              icon: "icon-message-square",
            });
          } else if (res.data.success == 4) {
            this.$router.push({ name: "page-login" });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            this.$vs.loading.close(".loading-btn > .con-vs-loading");
          }, 100);
        });
    },
  },

  created() {
    AuthenticationService.checkOn2fa()
      .then((res) => {
        if (res.data.success == 1) {
          const active2fa = res.data.on_2fa;
          if (!active2fa) {
            this.$store.dispatch("set2FA", true);
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //   this.popupActive = this.$store.state.popup2FA
  },

  watch: {
    popupActive(status) {
      if (!status) {
        this.$store.dispatch("togglePopup2FA", false);
      }
    },

    "$store.state.popup2FA"(val) {
      if (val) {
        if (!this.$store.state.auth2FA) {
          this.popupActive = val;
        }
      }
    },
  },
};
</script>

<style>
</style>