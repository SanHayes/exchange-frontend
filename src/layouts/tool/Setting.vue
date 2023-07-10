<template>
  <div id="list-tool-setting" class="data-list-container">
<template>
      <!-- <p>Sắp tới sẽ cập nhận liên quan tới hệ thống</p> -->
      <div class="vx-row">
        <div class="vx-col w-full mb-base">
          <p class="mb-4" style="text-decoration: overline">
            <span style="text-decoration: overline"
              >[THIẾT LẬP MIN RÚT / NẠP]:</span
            >
          </p>
          <div class="vx-row">
            <div
              class="vx-col centerx mb-4 sm:w-1/2 md:w-1/4 lg:w-3/12 xl:w-3/12"
            >
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                label-placeholder="Min nạp USDT"
                v-model="settingJson.min_d_usdt"
              />
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                label-placeholder="Min rút USDT"
                v-model="settingJson.min_w_usdt"
              />
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                label-placeholder="Phí rút USDT Nội bộ"
                v-model="settingJson.fee_w_usdt_nb"
              />
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                label-placeholder="Phí rút USDT BEP20 (BSC)"
                v-model="settingJson.fee_w_usdt_BEP20"
              />
            </div>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/2 lg:w-6/12 xl:w-6/12 mb-base">
          <p class="mb-4">
            <span style="text-decoration: overline">[THIẾT LẬP VÍ]:</span>
          </p>
          <div class="vx-row">
            <div class="vx-col w-full centerx md:w-1/2 lg:w-2/4 xl:w-2/4">
              <p class="mb-4">Mặc định Ví sử dụng:</p>
              <ul class="centerx">
                <li class="mb-4">
                  <vs-radio
                    v-model="settingJson.default_wallet_sys"
                    vs-value="usdt"
                    >Ví USDT</vs-radio
                  >
                </li>
                <li class="mb-4">
                  <vs-radio
                    disabled="disabled"
                    v-model="settingJson.default_wallet_sys"
                    vs-value="vnd"
                    >Ví VNĐ</vs-radio
                  >
                </li>
              </ul>
              <p>
                <i
                  >Ghi chú: Ví sử dụng mặc định dùng để giao dịch tiền tệ giữa
                  Tài Khoản thực và các Ví phụ khác</i
                >
              </p>
            </div>
            <div class="vx-col w-full centerx md:w-1/2 lg:w-2/4 xl:w-2/4">
              <p class="mb-4">Hiển thị Ví thanh toán:</p>
              <ul class="centerx">
                <li class="mb-4 relative">
                  <vs-checkbox
                    v-model="settingJson.show_wallet_usdt"
                    @change="changeWallet('usdt', $event)"
                    >Ví USDT</vs-checkbox
                  >
                  <div class="absolute" style="top: 0; right: 0">
                    <IconCrypto
                      style="width: 20px"
                      coinname="USDT"
                      color="color"
                      format="svg"
                    />
                  </div>
                </li>
                <li class="mb-4 relative">
                  <vs-checkbox
                    v-model="settingJson.show_wallet_vnd"
                    @change="changeWallet('vnd', $event)"
                    >Ví VNĐ</vs-checkbox
                  >
                  <div class="absolute" style="top: 0; right: 0">
                    <img
                      width="20"
                      :src="
                        require('@/assets/images/sky/icon_bank/vnd-mini.svg')
                      "
                    />
                  </div>
                </li>

                <div v-if="settingJson.show_wallet_vnd">
                  <vs-textarea
                    rows="15"
                    style="display: inline-block"
                    class="m-2 mb-4"
                    label-placeholder="Thông tin ngân hàng"
                    v-model="settingJson.bankInfo"
                  />
                </div>
              </ul>
              <p><i>Ghi chú: Các Ví chứa các khoản tiền NẠP và Rút</i></p>
            </div>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/2 lg:w-6/12 xl:w-6/12 mb-base">
          <p class="mb-4">
            <span style="text-decoration: overline"
              >[THIẾT LẬP QUOTE USD đồng COIN]: </span
            ><i>( Mặc định Auto Update )</i>
          </p>
          <div class="vx-row">
            <div class="vx-col centerx md:w-1/2 lg:w-2/4 xl:w-2/4">
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                label-placeholder="Auto Update Seconds"
                v-model="settingJson.timeLoopUpdateQuote"
              />
              <p class="m-2 mb-4">
                <i>Chú ý: Thời gian được tính bằng (giây)</i>
              </p>
              <div class="m-2 block">
                <vs-switch
                  v-model="checkOnOffAutoQuote"
                  @change="checkOnOffAutoQuote = !checkOnOffAutoQuote"
                >
                  <span slot="on">Bật</span>
                  <span slot="off">Tắt</span>
                </vs-switch>
              </div>
              <p class="m-2"><i>Chú ý: Bật / tắt Auto cập nhật USD Quote</i></p>
            </div>
            <div class="vx-col centerx md:w-1/2 lg:w-2/4 xl:w-2/4">
              <p class="mb-4">Quote USD:</p>
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                :label-placeholder="`1 USD = ${formatPrice(
                  1 / settingJson.quote_USD_BTC,
                  6
                )} BTC`"
                v-model="settingJson.quote_USD_BTC"
              />
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                :label-placeholder="`1 USD = ${formatPrice(
                  1 / settingJson.quote_USD_ETH,
                  4
                )} ETH`"
                v-model="settingJson.quote_USD_ETH"
              />
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                :label-placeholder="`1 USD = ${formatPrice(
                  1 / settingJson.quote_USD_USDT,
                  2
                )} USDT`"
                v-model="settingJson.quote_USD_USDT"
              />
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                :label-placeholder="`1 USD = ${formatPrice(
                  1 / settingJson.quote_USD_PAYPAL,
                  2
                )} PAYPAL`"
                v-model="settingJson.quote_USD_PAYPAL"
              />
              <vs-input
                type="number"
                style="display: inline-block"
                class="m-2 mb-4"
                :label-placeholder="`1 USD = ${formatPrice(
                  settingJson.quote_USD_VND,
                  2
                )} VNĐ`"
                v-model="settingJson.quote_USD_VND"
              />
              <p><i>Chú ý: Paypal mặc định là 1</i></p>
            </div>
          </div>
        </div>

        <div class="vx-col w-full mb-base">
          <div class="vx-row">
            <div class="vx-col centerx md:w-1/2 lg:w-3/12 xl:w-3/12">
              <p class="mb-4">
                <span style="text-decoration: overline"
                  >[THIẾT LẬP BẢO TRÌ]:
                </span>
              </p>
              <vs-checkbox
                v-model="settingJson.maintenance"
                @change="changeActiveBaoTri($event)"
                >Bảo trì</vs-checkbox
              >
              <p class="mb-4"><i>- Ghi chú: Bảo trì hệ thống</i></p>
              <p class="mb-4">
                <span style="text-decoration: overline"
                  >[THIẾT LẬP MẠNG NẠP TIỀN]:
                </span>
              </p>
              <vs-radio v-model="settingJson.default_netw_pay" vs-value="ct"
                >Chính thức</vs-radio
              >
              <p></p>
              <vs-radio v-model="settingJson.default_netw_pay" vs-value="tn"
                >Thử nghiệm</vs-radio
              >
              <p>
                <b
                  >- Mạng đang sử dụng là:
                  {{
                    settingJson.default_netw_pay == "tn"
                      ? "Thử nghiệm"
                      : "Chính thức"
                  }}</b
                >
              </p>
              <p>
                <i
                  >- Ghi chú: Mạng nạp tiền mặc định BSC <br /><a
                    href="https://bscscan.com"
                    >https://bscscan.com</a
                  ></i
                >
              </p>
            </div>
            <div class="vx-col centerx md:w-1/2 lg:w-3/12 xl:w-3/12">
              <p class="mb-4">
                <span style="text-decoration: overline"
                  >[THIẾT LẬP ĐỊA CHỈ VÍ]:
                </span>
              </p>
              <vs-input
                style="display: inline-block"
                class="m-2 mb-4"
                v-model="settingJson.ADDRESS_ETH_USDT"
                label-placeholder="Địa chỉ Ví nhận tiền"
              />
              <vs-input
                style="display: inline-block"
                class="m-2 mb-4"
                v-model="settingJson.PRIVATE_KEY_ADDRESS_ETH_USDT"
                label-placeholder="Private KEY Ví nhận tiền"
              />
              <vs-input
                style="display: inline-block"
                class="m-2 mb-4"
                v-model="settingJson.ADDRESS_ETH_TRANSACTION"
                label-placeholder="Địa chỉ Ví gửi tiền"
              />
              <vs-input
                style="display: inline-block"
                class="m-2 mb-4"
                v-model="settingJson.PRIVATE_KEY_ETH_TRANSACTION"
                label-placeholder="Private KEY Ví gửi tiền"
              />
              <p>
                <i
                  >- Ghi chú: Là địa chỉ Ví dùng để chi trả cho người chơi rút
                  tiền <b>(Vui lòng liên kết 2 mạng BEP20 và ERC20)</b></i
                >
              </p>
            </div>

            <!-- Thiêt lập giải đấu -->

            <div class="vx-col centerx md:w-1/2 lg:w-6/12 xl:w-6/12">
              <p class="mb-4">
                <span style="text-decoration: overline"
                  >[THIẾT LẬP GIẢI ĐẤU VÀ RÚT THĂM MAY MẮN]:
                </span>
              </p>
              <p class="m-2 mb-4">Giải đấu</p>
              <div class="m-2 block">
                <vs-switch
                  v-model="settingJson.is_active_champion"
                  @change="
                    settingJson.is_active_champion =
                      !settingJson.is_active_champion
                  "
                >
                  <span slot="on">Bật</span>
                  <span slot="off">Tắt</span>
                </vs-switch>
              </div>

              <p class="m-2 mb-4">Rút thăm may mắn</p>
              <div class="m-2 block">
                <vs-switch
                  v-model="settingJson.is_active_lucky_draw"
                  @change="
                    settingJson.is_active_lucky_draw =
                      !settingJson.is_active_lucky_draw
                  "
                >
                  <span slot="on">Bật</span>
                  <span slot="off">Tắt</span>
                </vs-switch>
              </div>

              <p class="mb-4 mt-4">
                <span style="text-decoration: overline"
                  >[THIẾT LẬP MÃ 2FA]:
                </span>
              </p>
              <div class="m-2 block">
                <vs-switch :value="active2fa" @change="show2faPopup = true">
                  <span slot="on">Bật</span>
                  <span slot="off">Tắt</span>
                </vs-switch>
              </div>
            </div>

            <!-- // -->

            <!-- hỗ TRỢ -->

            <div class="vx-col centerx w-full lg:w-1/2">
              <p class="my-4">
                <span style="text-decoration: overline"
                  >[THIẾT LẬP HỖ TRỢ]:
                </span>
              </p>
               <vs-input
                style="display: inline-block"
                class="m-2 mb-4 w-full"
                v-model="settingJson.support.telegram"
                label-placeholder="Telegram"
              />

              <vs-input
                style="display: inline-block"
                class="m-2 mb-4 w-full"
                v-model="settingJson.support.zalo"
                label-placeholder="Zalo"
              />

              <vs-input
                style="display: inline-block"
                class="m-2 mb-4 w-full"
                v-model="settingJson.support.mail"
                label-placeholder="Email"
              />
            </div>
            <!-- END HỖ TRỢ -->
          </div>
        </div>

        <vs-button
          class="w-full"
          color="success"
          type="filled"
          @click="clickSubmitSetting"
          >Cập nhật</vs-button
        >
        <vs-prompt
          title="Xác thực Google"
          :active.sync="show2faPopup"
          :buttons-hidden="true"
        >
          <VuePerfectScrollbar class="google-authen-2fa-scroll">
            <google-auth :active2fa="active2fa" :toggle2fa="toggle2fa" />
          </VuePerfectScrollbar>
        </vs-prompt>
      </div>
    </template>
  </div>
</template>

<script>
import config from "@/config";
import AuthenticationService from "@/services/AuthenticationService";
import GoogleAuth from "./Google2FA.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    GoogleAuth,
    VuePerfectScrollbar,
  },
  data() {
    return {
      cnSv: 0,

      checkOnOffAutoQuote: true,
      radioBC: "payeer",
      settingJson: {
        min_d_paypal: 5,
        min_d_btc: 0.001,
        min_d_eth: 0.02,
        min_d_usdt: 5,

        min_w_paypal: 5,
        min_w_btc: 0.001,
        min_w_eth: 0.02,
        min_w_usdt: 5,

        fee_w_paypal_nb: 0, // phí rút về tài khoản trong hệ thống
        fee_w_paypal_acc: 2, // phí rút về tài khoản trong paypal

        fee_w_btc_nb: 0, // phí rút về tài khoản BTC trong hệ thống
        fee_w_btc_acc: 0.0003, // phí rút về tài khoản BTC sàn

        fee_w_eth_nb: 0, // phí rút về tài khoản ETH sàn
        fee_w_eth_ERC20: 0.001, // phí rút về tài khoản ETH sàn

        fee_w_usdt_nb: 0, // phí rút về tài khoản USDT trong hệ thống
        fee_w_usdt_BEP20: 1, // phí rút về tài khoản USDT trong hệ thống
        fee_w_usdt_ERC20: 2, // phí rút về tài khoản USDT sàn

        default_wallet_sys: "usdt",
        default_netw_pay: "tn",

        show_wallet_paypal: true,
        show_wallet_btc: false,
        show_wallet_eth: false,
        show_wallet_usdt: false,
        show_wallet_vnd: false,

        timeLoopUpdateQuote: 30, // thời gian mỗi giây cập nhập giá USD sấp sĩ coin
        quote_USD_USDT: 1,
        quote_USD_BTC: 1,
        quote_USD_ETH: 1,
        quote_USD_PAYPAL: 1,
        quote_USD_VND: 1,

        ADDRESS_ETH_USDT: "",
        PRIVATE_KEY_ADDRESS_ETH_USDT: "",
        ADDRESS_ETH_TRANSACTION: "",
        PRIVATE_KEY_ETH_TRANSACTION: "",

        maintenance: false, // bảo trì
        is_active_champion: false, //Bật tắt giải đấu
        is_active_lucky_draw: false, // bặt tắt rút thăm

        support:{
          telegram: "",
          zalo: "",
          mail: "",
        }
      },
      active2fa: false,
      show2faPopup: false,
      code_2fa: "",
    };
  },
  computed: {
    activeNTB() {
      if (this.settingJson.teleChatIDBet == "") {
        return false;
      } else {
        return true;
      }
    },
    activeNTF() {
      if (
        this.settingJson.teleChatID == "" ||
        this.settingJson.teleToken == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    toggle2fa() {
      this.active2fa = !this.active2fa;
      this.show2faPopup = false;
    },

    formatPrice(value, minimum) {
      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum,
      });
      return formatter.format(value);
    },

    changeActiveBaoTri(event) {
      let o = event.target.checked;
      this.settingJson.maintenance = o;
    },

    changeWallet(val, event) {
      let o = event.target.checked;
      switch (val) {
        case "usdt":
          this.settingJson.show_wallet_usdt = o;
          break;
        case "btc":
          this.settingJson.show_wallet_btc = o;
          break;
        case "eth":
          this.settingJson.show_wallet_eth = o;
          break;
        case "paypal":
          this.settingJson.show_wallet_paypal = o;
          break;
        case "vnd":
          this.settingJson.show_wallet_vnd = o;
          break;
      }
    },

    async clickSubmitSetting() {
      const check = await this.$store.dispatch("check2fa");
      if(!check){
        return;
      };
      let obj = {
        qUSDT: this.settingJson.quote_USD_USDT,
        qETH: this.settingJson.quote_USD_ETH,
        qBTC: this.settingJson.quote_USD_BTC,
        qPaypal: this.settingJson.quote_USD_PAYPAL,
        qVND: this.settingJson.quote_USD_VND,

        tCUseSys: this.settingJson.default_wallet_sys.toLowerCase(),

        mDBTC: this.settingJson.min_d_btc,
        mDETH: this.settingJson.min_d_eth,
        mDUSDT: this.settingJson.min_d_usdt,
        mDPaypal: this.settingJson.min_d_paypal,

        mWBTC: this.settingJson.min_w_btc,
        mWETH: this.settingJson.min_w_eth,
        mWUSDT: this.settingJson.min_w_usdt,
        mWPaypal: this.settingJson.min_w_paypal,

        iAWPaypal: this.settingJson.show_wallet_paypal,
        iAWETH: this.settingJson.show_wallet_eth,
        iAWUSDT: this.settingJson.show_wallet_usdt,
        iAWBTC: this.settingJson.show_wallet_btc,
        iAWVND: this.settingJson.show_wallet_vnd,
        bankInfo: this.settingJson.bankInfo,

        fDPaypalNB: this.settingJson.fee_w_paypal_nb,
        fDPaypalAcc: this.settingJson.fee_w_paypal_acc,
        fDBTCNB: this.settingJson.fee_w_btc_nb,
        fDBTCAcc: this.settingJson.fee_w_btc_acc,
        fDETHNB: this.settingJson.fee_w_eth_nb,
        fDETHERC20: this.settingJson.fee_w_eth_ERC20,
        fDUSDTNB: this.settingJson.fee_w_usdt_nb,
        fDUSDTBEP20: this.settingJson.fee_w_usdt_BEP20,
        fDUSDTERC20: this.settingJson.fee_w_eth_ERC20,

        ADDRESS_ETH_USDT: this.settingJson.ADDRESS_ETH_USDT,
        PRIVATE_KEY_ADDRESS_ETH_USDT:
          this.settingJson.PRIVATE_KEY_ADDRESS_ETH_USDT,
        ADDRESS_ETH_TRANSACTION: this.settingJson.ADDRESS_ETH_TRANSACTION,
        PRIVATE_KEY_ETH_TRANSACTION:
          this.settingJson.PRIVATE_KEY_ETH_TRANSACTION,
        IS_TEST_SMART_CHAIN:
          this.settingJson.default_netw_pay == "tn" ? true : false,

        timeLoopQuote: this.settingJson.timeLoopUpdateQuote,
        autoQuote: this.settingJson.checkOnOffAutoQuote,

        maintenance: this.settingJson.maintenance,

        isActiveluckyDraw: this.settingJson.is_active_lucky_draw,
        isActiveChampion: this.settingJson.is_active_champion,

        support: this.settingJson.support,
      };

      this.sendMessage({ type: "setDataSys", data: obj });
    },

    sendMessage(message) {
      this.connection.send(JSON.stringify(message));
      return this.$vs.notify({
        text: "Đã cập nhật hệ thống",
        color: "success",
        position: "top-right",
        iconPack: "feather",
        icon: "icon-message-square",
      });
    },

    connectSever() {
      var _this = this;

      this.connection = new WebSocket(config.BASE_URL_SOCKET_SYS);

      this.connection.onopen = function () {
        console.log(
          "Successfully connected to the echo websocket server systems..."
        );
      };

      this.connection.onclose = function () {
        if (_this.cnSv == 0) {
          _this.$vs.notify({
            text: "Không kết nối được tới máy chủ. Sẽ kết nối lại sau 5 giây",
            color: "danger",
            position: "top-right",
            iconPack: "feather",
            icon: "icon-message-square",
          });
        } else {
          _this.$vs.notify({
            text: "Đang kết nối lại lần " + _this.cnSv,
            color: "danger",
            position: "top-right",
            iconPack: "feather",
            icon: "icon-message-square",
          });
        }

        if (_this.cnSv == 6) {
          _this.$vs.notify({
            text: "Kết nối thất bại. Vui lòng kiểm tra và bật lại máy chủ",
            color: "danger",
            position: "top-right",
            iconPack: "feather",
            icon: "icon-message-square",
          });
        }

        //console.log('Socket is closed. Reconnect will be attempted in 5 second.', e.reason);
        if (_this.cnSv <= 5) {
          setTimeout(() => {
            _this.connectSever();
            _this.cnSv++;
          }, 5000);
        }
      };

      // _this.connection.onerror = function(err) {
      //   //console.error('Socket encountered error: ', err.message, 'Closing socket');
      //    _this.$vs.notify({
      //         text:'Kết nối máy chủ thất bại.',
      //         color:'danger',
      //         position:'top-right',
      //         iconPack: 'feather',
      //         icon:'icon-message-square'
      //       });
      //   _this.connection.close();
      // };

      this.connection.onmessage = function (event) {
        let data = JSON.parse(event.data);
        let dl = data.data;

        if (data.type === "getDataSys") {
          _this.settingJson.min_d_paypal = dl.minDepositPaypal;
          _this.settingJson.min_d_btc = dl.minDepositBTC;
          _this.settingJson.min_d_eth = dl.minDepositETH;
          _this.settingJson.min_d_usdt = dl.minDepositUSDT;

          _this.settingJson.min_w_paypal = dl.minWithdrawalPaypal;
          _this.settingJson.min_w_btc = dl.minWithdrawalBTC;
          _this.settingJson.min_w_eth = dl.minWithdrawalETH;
          _this.settingJson.min_w_usdt = dl.minWithdrawalUSDT;

          _this.settingJson.fee_w_paypal_nb = dl.feeRutPaypalNoiBo; // phí rút về tài khoản trong hệ thống
          _this.settingJson.fee_w_paypal_acc = dl.feeRutPaypalAcc; // phí rút về tài khoản trong paypal

          _this.settingJson.fee_w_btc_nb = dl.feeRutBTCNoiBo; // phí rút về tài khoản BTC trong hệ thống
          _this.settingJson.fee_w_btc_acc = dl.feeRutBTCAcc; // phí rút về tài khoản BTC sàn

          _this.settingJson.fee_w_eth_nb = dl.feeRutETHNoiBo; // phí rút về tài khoản ETH sàn
          _this.settingJson.fee_w_eth_ERC20 = dl.feeRutETHERC20; // phí rút về tài khoản ETH sàn

          _this.settingJson.fee_w_usdt_nb = dl.feeRutUSDTNoiBo; // phí rút về tài khoản USDT trong hệ thống
          _this.settingJson.fee_w_usdt_BEP20 = dl.feeRutUSDTBEP20; // phí rút về tài khoản USDT trong hệ thống
          _this.settingJson.fee_w_eth_ERC20 = dl.feeRutUSDTERC20; // phí rút về tài khoản USDT sàn

          _this.settingJson.default_wallet_sys =
            dl.typeCurrUseSys.toLowerCase();

          _this.settingJson.show_wallet_paypal = dl.isActiveWalletPaypal;
          _this.settingJson.show_wallet_vnd = dl.isActiveWalletVND;
          _this.settingJson.bankInfo = dl.bankInfo;
          _this.settingJson.show_wallet_btc = dl.isActiveWalletBTC;
          _this.settingJson.show_wallet_eth = dl.isActiveWalletETH;
          _this.settingJson.show_wallet_usdt = dl.isActiveWalletUSDT;

          _this.settingJson.timeLoopUpdateQuote = dl.timeLoop;
          _this.checkOnOffAutoQuote = dl.autoQuoteSet;

          _this.settingJson.quote_USD_BTC = dl.quotePriceBTC;
          _this.settingJson.quote_USD_ETH = dl.quotePriceETH;
          _this.settingJson.quote_USD_USDT = dl.quotePriceUSDT;
          _this.settingJson.quote_USD_PAYPAL = dl.quotePricePAYPAL;
          _this.settingJson.quote_USD_VND = dl.quotePriceVND;

          _this.settingJson.ADDRESS_ETH_USDT = dl.ADDRESS_ETH_USDT;
          _this.settingJson.PRIVATE_KEY_ADDRESS_ETH_USDT =
            dl.PRIVATE_KEY_ADDRESS_ETH_USDT;
          _this.settingJson.ADDRESS_ETH_TRANSACTION =
            dl.ADDRESS_ETH_TRANSACTION;
          _this.settingJson.PRIVATE_KEY_ETH_TRANSACTION =
            dl.PRIVATE_KEY_ETH_TRANSACTION;
          _this.settingJson.default_netw_pay =
            dl.IS_TEST_SMART_CHAIN == true ? "tn" : "ct";

          _this.settingJson.maintenance = dl.maintenance;

          _this.settingJson.is_active_champion = dl.isActiveChampion;
          _this.settingJson.is_active_lucky_draw = dl.isActiveluckyDraw;

          _this.settingJson.support = void 0 !== dl.support ? dl.support : _this.settingJson.support;
        }
      };
    },
  },
  created() {
    // if(!moduleDataList.isRegistered) {
    //   this.$store.registerModule('dataList', moduleDataList)
    //   moduleDataList.isRegistered = true
    // }
    //this.$store.registerModule('dataList', this.productsFake);
    //this.$store.dispatch("dataList/fetchDataListItems")
    //console.log(this.productsFake);
    //console.log(this.$store.state.dataList);
    AuthenticationService.checkOn2fa()
      .then((res) => {
        if (res.data.success == 1) {
          this.active2fa = res.data.on_2fa;
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    this.isMounted = true;

    this.connectSever();
  },
};
</script>

<style lang="scss">
#list-tool-setting {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>

<style lang="scss" scoped>
.google-authen-2fa-scroll {
  max-height: calc(100vh - 100px);
  overflow: hidden;
}
</style>