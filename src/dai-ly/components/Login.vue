<template>
  <div class="wrapper">
    <div class="login">
      <form class="form" @submit.prevent="login">
        <h2>Xin chào đại lý</h2>
        <input type="text" placeholder="Tên đăng nhập" v-model="email" />
        <input type="password" placeholder="Mật khẩu" v-model="password" />
        <input type="submit" value="Đăng nhập" class="submit" />
      </form>
    </div>
  </div>
</template>
<script>
import AuthenticationService from "@/services/AuthenticationService";
import { notification } from "ant-design-vue";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      const loginInfo = {
        email: this.email,
        password: this.password,
      };
      const loginRes = await AuthenticationService.loginUser(loginInfo);
      if (loginRes.data.success == 1) {
        let token = loginRes.data.token;
        localStorage.setItem("tokenAgency", token);
        const infoRes = await AuthenticationService.getInfoAgency(loginInfo);
        if (infoRes.data.data.level_vip) {
          this.$emit("success");
          localStorage.setItem("agencyMail", infoRes.data.data.email);
        } else {
          localStorage.removeItem("tokenAgency");

          notification.error({
            message: "Tài khoản của bạn không phải là đại lý.",
          });
        }
      } else {
        notification.error({
          message: "Sai tên tài khoản hoặc mật khẩu",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper * {
  box-sizing: border-box;
  font-family: sans-serif;
}

.login {
  width: 320px;
  height: 450px;
  border: 1px solid #ccc;
  background: url(https://media4.giphy.com/media/BHNfhgU63qrks/giphy.gif) center
    center no-repeat;
  background-size: cover;
  margin: 30px auto;
  border-radius: 20px;
}
.login .form {
  width: 100%;
  height: 100%;
  padding: 15px 25px;
}
.login .form h2 {
  color: #fff;
  text-align: center;
  font-weight: normal;
  font-size: 18px;
  margin-top: 60px;
  margin-bottom: 80px;
}
.login .form input {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 15px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
}
.login .form input:focus {
  border: 1px solid rgba(255, 255, 255, 0.8);
  outline: none;
}
::-webkit-input-placeholder {
  color: #ddd;
}
.login .form input.submit {
  background: rgba(255, 255, 255, 0.9);
  color: #444;
  font-size: 15px;
  margin-top: 40px;
  font-weight: bold;
  cursor: pointer;
}
</style>
