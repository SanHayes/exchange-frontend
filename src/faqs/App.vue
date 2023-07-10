<template>
  <div :class="vueAppClasses">
    <section class="sec--01">
      <header class="h-header-custom">
        <img
          width="200"
          :src="require('@/assets/images/logo/logo.png')"
          alt="BO"
        />
        <div class="header--btn">
          <div class="header--btn_login" @click="RegisterUrl">Đăng ký</div>
          <div class="header--btn_register" @click="LoginUrl">Đăng nhập</div>
        </div>
      </header>
    </section>

    <section class="sec--00 faqsContent ">
      <div class="container">
        <div class="text-center title mb-3">Chúng tôi có thể giúp bạn thế nào ?</div>
        <div class="text-center mb-3">Chúng tôi sẽ nhanh chóng giải đáp thắc mắc của bạn. Bạn muốn tìm hiểu thêm về vấn đề gì?</div>
      </div>
    </section>

    <router-view class="wrapper-content" @setAppClasses="setAppClasses" />

    <section class="sec--08">
      <div class="footerFAQs">
        <div class="container position-relative">
          <div
            class="
              py-3 py-sm-5
              blockRow
              border-bottom
              pb-0
              flex flex-col
              md:flex-row
            "
          >
            <div class="block logo">
              <p class="mb-lg-2 mb-1">
                <img
                  width="236"
                  height="73"
                  :src="require('@/assets/images/logo/logo.png')"
                  alt=""
                />
              </p>
              <div class="font-12 txtContent">
                © 2021
                <div class="text-domain d-inline-block">{{ domain }}</div>
                All rights reserved.
              </div>
              <p>
                Email:
                <a :href="`mailto:${mail}`" class="emailLink">{{ mail }}</a>
              </p>
            </div>
            <div class="block md:pl-6">
              <h4>Về chúng tôi</h4>
              <ul>
                <li><p></p></li>
              </ul>
            </div>
            <div class="block md:pl-6 support" style="flex: 0.5 1 0%">
              <h4>Hỗ trợ</h4>
              <ul>
                <li>
                  <p>
                    <a
                      href="/KingBoEx_Agency Obligations_vi.pdf"
                      target="_blank"
                      >Nghĩa vụ thành viên VIP</a
                    >
                  </p>
                </li>
              </ul>
            </div>
            <div class="block md:pl-6"></div>
            <div class="block md:pl-6">
              <div class="dropdown language">
                <button
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="
                    btn
                    dropdown-toggle
                    colorSecondary
                    dropdownMenuButton
                    bgPrimary1
                    position-relative
                  "
                >
                  <img
                    width="18"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAYAAABe3VzdAAAAAXNSR0IArs4c6QAAAdhJREFUWAntmMsuxFAYx/+nV1MxmUywIWLjEgm7YWUvNnY2EqMLsfUInsHWwoZnsLLzAjYIIqYxIRHXjtBpe+qcGUQTjeqpaKTfprfv8vv+PZem5HB0aIlA2kQGLQA1ydHoSJBBtjZSENxLmYXjYISUsg3IGHNA0SGUK5gpBY0pGfpwui8l1Wxls4DycoeoaKH41ADVQQmd0yqKMxqUXhIqInKRGmD3yptyEkHZTE9FJUl3xTkNWn+4t+Ks9pGqNK+DNsI7qHPmw95xP3ziniTai9U+goHtLig9cqw6bp2itvAI/zoMHSc4LEOcCObj1gNY1QboPf02wrv0YS0mg+PJEwHyQLdGYZk2qB0N6d8yn6oN7+rnyvEa3BID8mDnmOJuy+GnX9rNxnNL7S8fxrwpBMhrdExEj8PCeKI5GEIXA2RsRkUNJfx8YVT+GLAwoYBo7UX5Zd+FtWTjYsWGc+K1OGU2yzW2gIuYUIvGpILmqYfr9Wc0dttQHOZp7xFdbF3sWTWYwsznvJmYMdE6+F5NH5PhHDKwIGJrY+3rQxLziZ7p77mijkIKOgc+yxsBxysydhE4nkJsgPAMv2w5oKjAuYL/WkH2iVGT+A8aBMGDaKepx7eY6Nor+sqCnmPgaisAAAAASUVORK5CYII="
                    alt=""
                    class="mr-2 mb-1"
                  /><span class="colorSecondary">Tiếng Việt</span>
                </button>
              </div>
            </div>
          </div>
          <div class="py-3 py-sm-5 blockRow mb-0">
            <div class="block">
              <p class="txtContent fullText">
                Cảnh báo rủi ro: Giao dịch và đầu tư vào các tùy chọn kỹ thuật
                số có mức độ rủi ro đáng kể và không phù hợp và / hoặc thích hợp
                cho tất cả khách hàng. Vui lòng đảm bảo rằng bạn cân nhắc cẩn
                thận các mục tiêu đầu tư, mức độ kinh nghiệm và khẩu vị rủi ro
                trước khi mua hoặc bán bất kỳ tài sản kỹ thuật số nào. Bạn nên
                nhận thức và hiểu đầy đủ tất cả các rủi ro liên quan đến giao
                dịch và đầu tư vào tài sản kỹ thuật số, bạn không nên đầu tư các
                khoản tiền mà bạn không thể để mất. Bạn được cấp các quyền hạn
                chế không độc quyền để sử dụng tài sản trí tuệ có trong trang
                web này cho mục đích sử dụng cá nhân, phi thương mại, không thể
                chuyển nhượng liên quan đến các dịch vụ được cung cấp trên trang
                web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <log-reg-for-get />
  </div>
</template>

<script>
import config from "@/config";
import LogRegForGet from "@/pages/user/LogRegForGet";
export default {
  data() {
    return {
      vueAppClasses: [],
      domain: config.domainRealName,
      mail: config.support.mail,
    };
  },
  components: { LogRegForGet },
  methods: {
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr);
    },
    LoginUrl() {
      this.$router.push({ redirect: window.location.href = config.domain + "login" });
    },
    RegisterUrl() {
      this.$router.push({ redirect: window.location.href = config.domain + "register" });
    },
    onWindowLoad() {
      let path = this.$router.currentRoute.path;
      let checkTK = localStorage.hasOwnProperty("tokenUser");
      this.$vs.loading.close();
      if (path == "/" && checkTK) {
        this.$router.push({ path: "/trading" });
      }
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

.wrapper-content {
  padding: 10px 30px;
}

.faqsContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url("~@/assets/images/BackgroundFAQs.jpeg");
  .title {
      color: #fff!important;
      font-size: 1.75rem;
  }

  .mb-3 {
    margin-bottom: 1rem!important;
  }
}

.mb-4 {
  margin-bottom: 1.5rem!important;
}

h4 {
    font-size: 1.5rem;
}


@media screen and (max-width: 992px) {
  .faqsContent {
      min-height: 170px;
  }
}

@media screen and (max-width: 1200px) {
  .faqsContent {
      min-height: 230px;
  }
}
@media screen and (max-width: 1700px) {
  .faqsContent {
      min-height: 340px;
  }
  .faqsContent {
      min-height: 486px;
      position: relative;
  }
}

.sec--01 {
  header {
    padding: 32px 86px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.4s;
    .header--btn {
      display: flex;

      &_login,
      &_register {
        border-radius: 10px;
        padding: 11px 20px;
        font-weight: 700;
        font-size: 13px;
        color: #fff;
        cursor: pointer;
      }

      &_login {
        background: #F1DD48;
        margin-right: 1rem;
        margin-left: 0.25rem;
      }

      &_register {
        background: #1d233b;
      }
    }
  }
}

.sec--08 {
  padding: 40px;
  background: #02102c;

  .pl-sm-4 {
    padding-left: 1.5rem !important;
  }

  .blockRow {
    padding: 3rem 0 !important;

    .block {
      flex: 1;
    }

    .logo {
      img {
        width: 153px;
        object-fit: contain;
      }
      .txtContent {
        color: #fff;
        opacity: 0.6;

        display: flex;
      }

      .emailLink {
        color: #F1DD48;
      }
    }

    .support {
      p {
        margin-bottom: 10px;

        a {
          color: #fff !important;
          opacity: 0.6;
          line-height: 30px;
        }
      }
    }

    .language {
      button {
        min-width: 160px;
        min-height: 45px;
        font-size: 14px;
        text-align: left;
        background: #090f3e;
        cursor: pointer;

        display: flex;
        align-items: center;
        padding-left: 20px;

        border: none;
        outline: none !important;

        position: relative;

        // &:after {
        //   display: inline-block;
        //   margin-left: 0.255em;
        //   vertical-align: 0.255em;
        //   content: "";
        //   border-top: 0.3em solid #fff;
        //   border-right: 0.3em solid transparent;
        //   border-bottom: 0;
        //   border-left: 0.3em solid transparent;
        //   right: 10px;
        //   top: 45%;
        //   position: absolute;
        // }

        span {
          color: #fff;
        }
      }
    }

    h4 {
      font-size: 16px;
      margin-bottom: 20px;
      margin-top: 8px;
    }

    .fullText {
      padding-top: 20px !important;
    }
  }
}

@media only screen and (max-width: 490px) {
  .sec--01 {
    width: 100%;
    header {
      padding: 10px 15px 10px 15px !important;

      img {
        max-width: 150px;
        font-style: italic;
        vertical-align: middle;
        object-fit: cover;
      }

      .header--btn {
        &_login,
        &_register {
          font-size: 12px !important;
          padding: 7px 10px !important;
          border-radius: 3px !important;
        }
      }
    }

    .content {
      padding: 0 21px;
      margin-top: 100px;
      z-index: 2;
      text-align: left;

      .title {
        font-size: 32px;
        line-height: 44px;
        color: #fff;
        max-width: unset;
        margin-bottom: 23px;
      }

      .des {
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.5);
        line-height: 16px;
        margin-bottom: 22px;
        max-width: unset;
        padding-right: 79px;
      }
      .btn {
        padding: 15px 20px;
      }
    }
  }

  .sec--08 {
    .blockRow {
      flex-direction: column;
    }

    .pl-sm-4 {
      padding-left: 0 !important;
      h4 {
        margin-top: 30px;
      }

      .language {
        margin-top: 30px;
      }
    }

    .border-bottom {
      border-bottom: none !important;
    }
  }
}
</style>
