<template>
  <div class="home">
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

      <div class="content">
        <div class="title mx-auto">Trải nghiệm giao dịch tuyệt vời</div>
        <div class="des mx-auto">
          {{ domain }} là nền tảng giao dịch được phát triển dựa trên công nghệ
          tiên tiến và cải tiến mới nhất để cung cấp trải nghiệm tuyệt vời cho
          các nhà giao dịch.
        </div>
        <div class="btn my-10" @click="LoginUrl">Bắt đầu miễn phí</div>

        <div class="main-banner-image"></div>
      </div>

      <footer>
        <div class="flex flex-col sm:flex-row wraper mx-auto">
          <div class="item space-y-2">
            <img :src="require('@/assets/images/landing/tick.png')" />
            <div class="title">Tài khoản Demo $1.000</div>
            <div class="desctiption">
              Kiểm tra và trau dồi kỹ năng giao dịch của bạn bằng tài khoản demo
              miễn phí và không giới hạn lần thử
            </div>
          </div>

          <div class="item space-y-2 mt-4 sm:mt-0">
            <img :src="require('@/assets/images/landing/tick.png')" />
            <div class="title">Nạp tiền chỉ từ $5</div>
            <div class="desctiption">
              Nạp tiền nhanh chóng trong vòng vài phút. Phí rút tiền thấp.
            </div>
          </div>

          <div class="item space-y-2 mt-4 sm:mt-0">
            <img :src="require('@/assets/images/landing/tick.png')" />
            <div class="title">Đặt lệnh nhỏ nhất $1</div>
            <div class="desctiption">
              Thật dễ dàng để bắt đầu giao dịch với số tiền nhỏ.
            </div>
          </div>
        </div>
      </footer>
    </section>

    <section class="sec--02">
      <div class="sec--02__container">
        <h3 class="title text-center md:text-left">
          Nền tảng mới. Triển vọng mới.
        </h3>
        <p class="description mt-10 w-full md:w-2/3 text-center md:text-left">
          {{ domain }} tiếp tục đổi mới và cập nhật nền tảng giao dịch bằng cách
          thêm các tính năng mới để bạn có thể giao dịch thành công hơn và tận
          hưởng trải nghiệm người dùng tốt hơn.
        </p>

        <div class="wrapper flex flex-col md:flex-row space-x-3">
          <div class="item text-center md:text-left">
            <img
              :src="require('@/assets/images/landing/currency-exchange.png')"
              width="120"
              height="120"
              alt=""
            />
            <h5 class="title">Nền tảng bảo mật cao</h5>
            <p class="description">
              Trong nhiều năm, chúng tôi đã phát triển các giao thức bảo mật
              hàng đầu để bảo vệ các nhà giao dịch và tài sản của họ.
            </p>
          </div>

          <div class="item text-center md:text-left">
            <img
              :src="require('@/assets/images/landing/lightning-fill.png')"
              width="120"
              height="120"
              alt=""
            />
            <h5 class="title">Nền tảng bảo mật cao</h5>
            <p class="description">
              Trong nhiều năm, chúng tôi đã phát triển các giao thức bảo mật
              hàng đầu để bảo vệ các nhà giao dịch và tài sản của họ.
            </p>
          </div>

          <div class="item text-center md:text-left">
            <img
              :src="require('@/assets/images/landing/shield.png')"
              width="120"
              height="120"
              alt=""
            />
            <h5 class="title">Nền tảng bảo mật cao</h5>
            <p class="description">
              Trong nhiều năm, chúng tôi đã phát triển các giao thức bảo mật
              hàng đầu để bảo vệ các nhà giao dịch và tài sản của họ.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="sec--03">
      <div class="container">
        <img
          :src="require('@/assets/images/landing_v2/binance.286d30c6.svg')"
          alt=""
        />
        <img
          :src="require('@/assets/images/landing_v2/btc.ed10246f.svg')"
          alt=""
        />
        <img
          :src="require('@/assets/images/landing_v2/tether.7926a2d1.svg')"
          alt=""
        />
      </div>
    </section> -->

    <section class="sec--04">
      <div class="title">
        Bắt đầu hành trình tự do tài chính của bạn ngay hôm nay!
      </div>
      <div class="description">
        Tất cả mọi người, bất kể kỹ năng như thế nào, đều có thể phát triển
        chiến lược giao dịch có lợi nhuận và kiếm thu nhập ổn định trên
        {{ domain }}.
      </div>
      <div class="wrapper flex flex-col md:flex-row justify-center">
        <div class="item">
          <div class="contentBox">
            <img
              :src="require('@/assets/images/landing_v2/Group1.png')"
              alt=""
            />
            <div class="box">
              <h3>Đăng ký</h3>
              <p>
                Sử dụng địa chỉ email của bạn và tạo một tài khoản miễn phí.
              </p>
            </div>
          </div>
        </div>

        <div class="item mt-10 md:mt-0">
          <div class="contentBox">
            <img
              :src="require('@/assets/images/landing_v2/Group2.png')"
              alt=""
            />
            <div class="box">
              <h3>Nạp tiền</h3>
              <p>Nạp tiền bằng tiền điện tử phổ biến.</p>
            </div>
          </div>
        </div>

        <div class="item mt-10 md:mt-0">
          <div class="contentBox">
            <img
              :src="require('@/assets/images/landing_v2/Group3.png')"
              alt=""
            />
            <div class="box">
              <h3>Bắt đầu giao dịch</h3>
              <p>Kiếm tiền từ dự đoán giá tài sản.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="btn mt-20" @click="LoginUrl">Bắt đầu miễn phí</div>
    </section>

    <section class="sec--05">
      <div
        class="
          section-wrapper
          flex flex-col
          lg:flex-row
          items-center
          ml-10
          pt-20
          lg:pt-10
        "
      >
        <div class="flex-grow">
          <div class="max-w-md mx-auto">
            <div class="title">
              Trở thành Nhà giao dịch chuyên nghiệp Với các công cụ của chúng
              tôi
            </div>

            <div class="des">
              Các chỉ báo kỹ thuật của chúng tôi cho phép bạn phát triển các
              chiến lược giao dịch có lợi nhất giúp việc giao dịch ít vất vả
              hơn.
            </div>

            <div class="btn">Bắt đầu đầu miễn phí</div>
          </div>
        </div>

        <img
          class="img text-right ml-auto"
          :src="require('@/assets/images/landing_v2/Mockup-3.png')"
        />
      </div>
    </section>

    <section class="sec--07">
      <h2>Nạp rút liên mạch</h2>
      <p>
        Sử dụng các loại tiền điện tử phổ biến để nạp rút tiền nhanh chóng và an
        toàn.
      </p>
      <div>
        <img
          class="mr-5"
          :src="require('@/assets/images/landing_v2/bitcoin.2b7d6815.svg')"
          alt=""
        />
        <img
          class="mr-5"
          :src="require('@/assets/images/landing_v2/tether.6d1c997e.svg')"
          alt=""
        />
        <img
          :src="require('@/assets/images/landing_v2/binance.cf56a2f9.svg')"
          alt=""
        />
      </div>
    </section>

    <section class="sec--08">
      <div class="footerFAQs">
        <div class="container position-relative">
          <div class="py-3 py-sm-5 blockRow border-bottom pb-0 flex flex-col md:flex-row">
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

<style scoped lang="scss">
.home {
  background: #fff;
}

.sec--01 {
  overflow-x: hidden;

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

  background: url("~@/assets/images/landing_v2/mainBanner.png");
  background-position: 50%;
  background-size: cover;
  width: 100%;
  position: relative;

  .content {
    text-align: center;
    .title {
      font-size: 46px;
      line-height: 54px;
      color: #fff;
      font-weight: 700;
      max-width: 762px;
      margin-bottom: 25px;
    }

    .des {
      font-size: 16px;
      color: hsla(0, 0%, 100%, 0.5);
      line-height: 19px;
      margin-bottom: 20px;
      max-width: 411px;
    }

    .btn {
      background-color: #F1DD48;
      color: #fff;
      text-transform: uppercase;
      text-align: center;
      padding: 20px 30px;
      border-radius: 8px !important;
      display: inline-block;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      font-weight: 700;

      cursor: pointer;
    }

    .main-banner-image {
      margin: auto;
      width: 561px;
      height: 381px;
      content: "";
      background: url("~@/assets/images/landing_v2/Mockup-1.png");
      background-position: 50%;
      background-size: cover;
      margin-top: 50px;
      // transform: translateY(-50%);
    }
  }

  footer {
    background: #090f3e;
    padding: 30px;
    .wraper {
      max-width: 1100px;
    }
    .item {
      flex-basis: 30%;
      margin-right: 20px;
      .title {
        font-size: 18px;
        font-weight: 700;
        color: white;
      }
      .desctiption {
        font-size: 16px;
      }
    }
  }
}

.sec--02 {
  width: 100%;
  overflow-y: hidden;

  background: white;
  width: 100%;
  color: #000;
  &__container {
    padding: 150px 30px 120px;
    max-width: 1140px;
    margin: auto;

    .title {
      color: #141415;
      font-size: 40px;
      line-height: 47px;
      margin-bottom: 0;
      font-weight: 700;
    }

    .description {
      font-size: 16px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.5);
      font-weight: 400;
      margin-bottom: 0;
      max-width: 700;
    }
    .wrapper {
      .title {
        font-size: 18px;
        line-height: 21px;
        font-weight: 700;
        color: #000;
        margin-bottom: 20px;
      }

      .description {
        font-size: 16px;
        line-height: 19px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}

.sec--03 {
  background-color: #fff;
  padding: 22px 0;

  .container {
    max-width: 1140px;
    width: 100%;

    display: flex;
    justify-content: space-between;
  }
}

.sec--04 {
  padding: 100px 30px;
  background: url("~@/assets/images/landing/introduce-BG.png");
  background-size: cover;
  background-position: 50%;
  text-align: center;

  .btn {
    display: inline-block;
    padding: 20px 45px;
    color: #fff;
    font-weight: 700 !important;
    font-size: 14px;
    text-transform: uppercase;
    transition: all 0.35s ease-in-out;
    background: #F1DD48;
    margin-left: 0 !important;
    border-radius: 30px;
    cursor: pointer;
  }
  .title {
    font-size: 40px;
    line-height: 47px;
    font-weight: 400;
    color: #fff;
    margin-bottom: 30px;
  }
  .description {
    font-size: 16px;
    line-height: 18px;
    color: hsla(0, 0%, 100%, 0.5);
    max-width: 680px;
    margin: 0 auto;
    margin-bottom: 80px;
  }

  .wrapper {
    .item {
      // width: calc(100% / 3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .contentBox {
        margin-left: 25px;
        margin-right: 25px;
        position: relative;
        max-width: 280px;
        text-align: center;

        img {
          height: 143px;
        }

        .box {
          background: #1c2942;
          border-radius: 29px;
          margin-top: -84px;
          padding-top: 97px;
          padding-bottom: 25px;
          min-width: 280px;
          min-height: 180px;

          h3 {
            color: #fff;
            font-size: 16px;
            line-height: 19px;
            font-weight: 700;
            margin-bottom: 7px;
          }

          p {
            max-width: 203px;
            color: hsla(0, 0%, 100%, 0.5);
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 0;
            margin-left: auto;
            margin-right: auto;
          }
        }
      }
    }
  }
}

.sec--05 {
  background: #fff;

  .title {
    font-size: 48px;
    line-height: 57px;
    font-weight: 700;
    color: #F1DD48;
    margin-bottom: 40px;
  }

  .des {
    color: #080808;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 40px;
  }

  .btn {
    display: inline-block;
    background-color: #F1DD48;
    color: #fff;
    padding: 20px 45px;
    margin-left: 0;
    border-radius: 30px;
    font-weight: 700;
    font-size: 14px;

    text-transform: uppercase;
  }

  .img {
    max-width: 560px;
    max-height: 550px;
  }
}

.sec--06 {
  background: #fff;
  padding-bottom: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    font-size: 40px;
    font-weight: 800;
    line-height: 47px;
    color: #000;
    margin-bottom: 72px;
  }

  .swiper-container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  .swiper-pagination {
    position: unset;
    width: 100%;
    margin-top: 60px;
  }

  .clients-say-box {
    height: 300px;
    font-size: 14px;
    line-height: 27px;
    min-height: 243px;
    padding: 25px 21px;
    color: #000;
    margin: auto;
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    border: 2px solid #0040b4;
    border-radius: 19px;
    display: flex;
    align-items: center;
    opacity: 0.7;
    margin-bottom: 40px;
  }

  .swiper-slide-active .clients-say-box {
    opacity: 1;
  }
}

.sec--07 {
  background: url("~@/assets/images/landing_v2/cryptocurrencies-BG.png");
  background-size: cover;
  position: relative;
  padding: 100px 20px;
  text-align: center;
  // &:after {
  //   background: url("~@/assets/images/landing_v2/MockupStart.png");
  //   height: 488px;
  //   position: absolute;
  //   bottom: 0;
  //   content: "";
  //   right: 56px;
  //   width: 481px;
  //   background-size: contain;
  //   background-repeat: no-repeat;
  // }

  h2 {
    font-size: 42px;
    line-height: 49px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #fff;
  }

  p {
    font-size: 18px;
    line-height: 21px;
    color: #8b8d96;
    margin-bottom: 34px;
  }

  a {
    background-color: #F1DD48;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    padding: 20px 30px !important;
    border-radius: 8px !important;
    display: inline-block;
    transition: all 0.3s ease;
    font-weight: 700;
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

  .sec--02 {
    width: 100%;
    padding: 0 31px;
    width: 100%;
    .title {
      font-size: 24px !important;
      line-height: 28px !important;
      margin-bottom: 22px !important;
      margin-top: 0px !important;
      text-align: center;
    }

    .description {
      text-align: center;
      width: unset !important;
      font-size: 14px;
      color: rgba(128, 157, 209, 0.5);
      line-height: 16px;
      max-width: 274px;
      max-width: 100%;
    }

    .wrapper-img {
      margin-left: auto;
      height: 535px;
      max-width: 450px;
      overflow-y: hidden;

      img {
        width: 100%;
      }
    }
  }

  .sec--03 {
    .container {
      justify-content: center;
    }

    img:not(:first-child) {
      display: none;
    }
  }

  .sec--04 {
    .title {
      font-size: 24px;
      line-height: 28px;
    }
    .wrapper {
      justify-content: center;
    }

    .btn {
      padding: 15px 20px;
    }
  }

  .sec--05 {
    .title {
      color: #161a25;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 22px;
    }

    .des {
      color: #8b8d96;
      font-size: 14px;
      line-height: 16px;
      width: auto;
      padding-right: 38px;
      margin-bottom: 0;
      margin-bottom: 40px;
    }
    .btn {
      padding: 15px 20px;
    }

    .img {
      width: unset;
      height: unset;
      max-width: 100%;
    }
    .wrapper {
      flex-direction: column;

      .item {
        max-width: 100%;
        flex: 1;

        .contentBox {
          position: relative;
          margin-top: 0;
          margin-bottom: 97px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 0;
          max-width: 495px;
          height: unset;
          -webkit-box-shadow: unset;
          box-shadow: unset;
          padding-top: 190px;

          img {
            height: 157px;
            width: 104px;
            position: absolute;
            top: 0;
            bottom: unset;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
          }

          .content {
            margin-left: 0;
            padding-top: 0;
            text-align: center;
            padding-left: 17px;
            padding-right: 17px;
            padding-bottom: 23px;
            box-shadow: 0 6px 31px -7px #0610580f;
            border-radius: 29px;
            h3 {
              color: #161a25;
              font-size: 16px;
              line-height: 19px;
              margin-bottom: 12px;
            }
            p {
              color: #8b8d96;
              font-size: 14px;
              line-height: 17px;
              margin-bottom: 0;
              max-width: unset;
              width: 100%;
              padding-right: 0;
            }
          }
        }
      }
    }
  }

  .sec--06 {
    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 28px;
      color: #000;
      margin-bottom: 37px;
      text-align: center;
    }
  }

  .sec--07 {
    // background: url("~@/assets/images/landing_v2/Group23104@2x.png");
    // background-size: unset;
    background-position: 50%;
    position: relative;
    text-align: center;
    -webkit-clip-path: ellipse(360% 100% at 50% 100%);
    clip-path: ellipse(360% 100% at 50% 100%);

    h2 {
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 15px;
      text-align: center;
    }

    p {
      font-size: 14px;
      line-height: 16px;
      padding: 0 36px;
      text-align: center;
      color: #8b8d96;
      margin-bottom: 37px;
    }

    // &:after {
    //   background: url("~@/assets/images/landing_v2/MockupStart.png");
    //   height: 362px;
    //   position: absolute;
    //   bottom: 0;
    //   content: "";
    //   right: unset;
    //   left: 50%;
    //   -webkit-transform: translateX(-50%);
    //   transform: translateX(-50%);
    //   width: 340px;
    //   background-size: contain;
    //   background-repeat: no-repeat;
    // }
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

<style lang="scss">
.swiper-pagination-bullet {
  background: unset !important;
  width: unset !important;
  height: unset !important;

  .clients-say-name {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.5);
    margin: 48px 0;
    transform: translate(50%, -50%);
    white-space: nowrap;
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -67px;
  }

  .blockRow {
    display: flex;
  }
}

.swiper-pagination-bullet-active .clients-say-name {
  display: block;
  margin: auto;
}

.c-active {
  background-color: #02102c !important;
  border-bottom: none !important;
  padding: 7px 90px !important;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}
</style>

<script>
import "swiper/dist/css/swiper.min.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import config from "@/config";
import LogRegForGet from "@/pages/user/LogRegForGet";

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            if (index === 0) {
              return `<div class="wrapper ${className}" >
                                    <div  class="clients-say-name text-center">
                                    —Robert Carter—
                                    </div>
                                    <img src="/landing/img/client-1.png" alt="">
                                </div>`;
            }
            if (index === 1) {
              return `<div class="wrapper ${className}" >
                                    <div  class="clients-say-name text-center">
                                        —Britney Bradley—
                                    </div>
                                    <img src="/landing/img/client-2.png" alt="">
                                </div>`;
            }
            if (index === 2) {
              return `<div class="wrapper ${className}" >
                                    <div  class="clients-say-name text-center">
                                        —Clifford Mccarthy—
                                    </div>
                                    <img src="/landing/img/client-3.png" alt="">
                                </div>`;
            }
          },
        },
      },
      domain: config.domainRealName,
      mail: config.support.mail,
    };
  },
  methods: {
    LoginUrl() {
      this.$router.push({ path: "/login" });
    },
    RegisterUrl() {
      this.$router.push({ path: "/register" });
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
  components: {
    swiper,
    swiperSlide,
    LogRegForGet,
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      background: "#111",
      color: "#ffffff",
    });
  },
  created() {
    window.addEventListener("load", this.onWindowLoad);
    window.addEventListener("scroll", function () {
      if ($(this).scrollTop() !== 0) {
        $(".h-header-custom").addClass("c-active");
      } else {
        $(".h-header-custom").removeClass("c-active");
      }
    });
  },
};
</script>
