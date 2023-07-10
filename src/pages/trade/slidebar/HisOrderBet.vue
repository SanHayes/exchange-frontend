<template>
  <vs-sidebar
    :hidden-background="!isSideBar"
    click-not-close
    position-right
    :parent="isSideBar ? 'body' : '.c-body'"
    default-index="1"
    color="primary"
    class="rightBar add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
    :style="isSideBar ? `position: absolute;` : ''"
  >
    <div class="sidebar-header hidden">
      <div class="mt-6 flex items-center justify-between px-6">
        <h3 class="ml-8">Lịch sử giao dịch</h3>
        <feather-icon
          icon="XIcon"
          @click.stop="isSidebarActiveLocal = false"
          class="cursor-pointer"
        ></feather-icon>
      </div>
    </div>

    <VuePerfectScrollbar
      style="overflow: hidden"
      class="scroll-area--data-list-add-new"
    >
      <div class="p-4 tablist">
        <vs-tabs alignment="fixed" class="sidebar_tab">
          <vs-tab
            label="MỞ"
            @click="getListBET(), (isCloseTab = true), (isOpenTab = false)"
            class="tabClose"
          >
            <div class="con-tab-ejemplo">
              <div
                v-if="listItemOpen.length == 0"
                class="flex flex-col justify-center items-center h-a"
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4Mi4wODMiIGhlaWdodD0iODIuMTA0IiB2aWV3Qm94PSIwIDAgODIuMDgzIDgyLjEwNCI+CiAgPGcgaWQ9ImNvbnZlcnNpb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgyLjA5MSA0MS4wNDUpIHJvdGF0ZSgxMzUpIiBvcGFjaXR5PSIwLjIiPgogICAgPHBhdGggaWQ9IlBhdGhfMjYyNDMiIGRhdGEtbmFtZT0iUGF0aCAyNjI0MyIgZD0iTTU0LjQxNCwyNS4zOTNIMy42MjhBMy40MjcsMy40MjcsMCwwLDEsMCwyMS43NjZhMy40MjcsMy40MjcsMCwwLDEsMy42MjgtMy42MjhoNDIuMDhMMzMuNzM3LDYuMTY3YTMuNTA3LDMuNTA3LDAsMCwxLDAtNS4wNzksMy41MDcsMy41MDcsMCwwLDEsNS4wNzksMEw1Ni45NTMsMTkuMjI2YTMuMzExLDMuMzExLDAsMCwxLC43MjYsMy45OUEzLjQ4NiwzLjQ4NiwwLDAsMSw1NC40MTQsMjUuMzkzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMTEgMCkiIGZpbGw9IiNmZmYiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzI2MjQ0IiBkYXRhLW5hbWU9IlBhdGggMjYyNDQiIGQ9Ik0yMS43NzYsMzQuMzkzQTMuMjkzLDMuMjkzLDAsMCwxLDE5LjIzNywzMy4zTDEuMSwxNS4xNjdhMy4zMTEsMy4zMTEsMCwwLDEtLjcyNi0zLjk5QTMuNDg2LDMuNDg2LDAsMCwxLDMuNjM4LDlINTQuNDI1YTMuNDI3LDMuNDI3LDAsMCwxLDMuNjI4LDMuNjI4LDMuNDI3LDMuNDI3LDAsMCwxLTMuNjI4LDMuNjI4SDEyLjM0NUwyNC4zMTYsMjguMjI2YTMuNTA3LDMuNTA3LDAsMCwxLDAsNS4wNzlBMy4yOTMsMy4yOTMsMCwwLDEsMjEuNzc2LDM0LjM5M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMjMuNjQ5KSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg=="
                  alt=""
                  class="imageLandScape"
                />
                <p class="mt-3 color-grey text-center">
                  Bạn chưa có lệnh nào đang mở
                </p>
              </div>
              <div v-else class="flex flex-col justify-center mb-20 mt-5">
                <div :key="indextr" v-for="(oknha, indextr) in listItemOpen">
                  <p
                    v-if="$store.state.accountType === oknha.acc_type"
                    class="font-16 color-gray mt-3 mb-3"
                  >
                    {{ fromatTimzoneD(oknha.time) }}
                  </p>
                  <div
                    v-if="$store.state.accountType === oknha.acc_type"
                    class="transactionBox mb-2"
                  >
                    <div class="flex justify-between mb-2">
                      <span class="font-bold text-white">
                        <span v-if="!oknha.acc_type" class="accType text-xs"
                          >DEMO</span
                        >
                      </span>
                      <span class="icon iconBitcoin"></span>
                    </div>
                    <div class="flex justify-between mb-2 text-white">
                      <span class="trendGroup flex align-items-center">
                        <span
                          class="trendIcon mr-2"
                          :class="{
                            trendUp: oknha.type == 'buy',
                            trendDown: oknha.type == 'sell',
                          }"
                        ></span>
                        <span class="uppercase">{{ oknha.type }}</span>
                      </span>
                      <span>${{ formatPrice(oknha.amt) }}</span>
                    </div>
                    <div class="flex justify-between bet-time">
                      <span class="colorGray">Thời gian</span>
                      <span class="font-bold">{{
                        fromatTimzoneH(oknha.time)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vs-tab>
          <vs-tab
            label="ĐÓNG"
            @click="getListOrder(), (isCloseTab = false), (isOpenTab = true)"
            class="tabOpen"
          >
            <div class="con-tab-ejemplo">
              <div
                v-if="listItem.length == 0"
                class="flex flex-col justify-center items-center h-a"
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4Mi4wODMiIGhlaWdodD0iODIuMTA0IiB2aWV3Qm94PSIwIDAgODIuMDgzIDgyLjEwNCI+CiAgPGcgaWQ9ImNvbnZlcnNpb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgyLjA5MSA0MS4wNDUpIHJvdGF0ZSgxMzUpIiBvcGFjaXR5PSIwLjIiPgogICAgPHBhdGggaWQ9IlBhdGhfMjYyNDMiIGRhdGEtbmFtZT0iUGF0aCAyNjI0MyIgZD0iTTU0LjQxNCwyNS4zOTNIMy42MjhBMy40MjcsMy40MjcsMCwwLDEsMCwyMS43NjZhMy40MjcsMy40MjcsMCwwLDEsMy42MjgtMy42MjhoNDIuMDhMMzMuNzM3LDYuMTY3YTMuNTA3LDMuNTA3LDAsMCwxLDAtNS4wNzksMy41MDcsMy41MDcsMCwwLDEsNS4wNzksMEw1Ni45NTMsMTkuMjI2YTMuMzExLDMuMzExLDAsMCwxLC43MjYsMy45OUEzLjQ4NiwzLjQ4NiwwLDAsMSw1NC40MTQsMjUuMzkzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMTEgMCkiIGZpbGw9IiNmZmYiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzI2MjQ0IiBkYXRhLW5hbWU9IlBhdGggMjYyNDQiIGQ9Ik0yMS43NzYsMzQuMzkzQTMuMjkzLDMuMjkzLDAsMCwxLDE5LjIzNywzMy4zTDEuMSwxNS4xNjdhMy4zMTEsMy4zMTEsMCwwLDEtLjcyNi0zLjk5QTMuNDg2LDMuNDg2LDAsMCwxLDMuNjM4LDlINTQuNDI1YTMuNDI3LDMuNDI3LDAsMCwxLDMuNjI4LDMuNjI4LDMuNDI3LDMuNDI3LDAsMCwxLTMuNjI4LDMuNjI4SDEyLjM0NUwyNC4zMTYsMjguMjI2YTMuNTA3LDMuNTA3LDAsMCwxLDAsNS4wNzlBMy4yOTMsMy4yOTMsMCwwLDEsMjEuNzc2LDM0LjM5M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMjMuNjQ5KSIgZmlsbD0iI2ZmZiIvPgogIDwvZz4KPC9zdmc+Cg=="
                  alt=""
                  class="imageLandScape"
                />
                <p class="mt-3 color-grey text-center">
                  Bạn chưa có lệnh đóng nào
                </p>
              </div>
              <div v-else class="flex flex-col justify-center mb-20 mt-5">
                <div :key="indextr" v-for="(oknha, indextr) in listItem">
                  <div
                    v-if="$store.state.accountType === oknha.t"
                    class="transactionBox mb-2"
                  >
                    <div class="flex justify-between mb-2">
                      <span class="font-bold text-white"
                        >{{ oknha.c }}
                        <span v-if="!oknha.t" class="accType text-xs"
                          >DEMO</span
                        >
                      </span>
                      <span class="icon iconBitcoin"></span>
                    </div>
                    <div class="flex justify-between mb-2 text-white">
                      <span class="trendGroup flex align-items-center">
                        <span
                          class="trendIcon mr-2"
                          :class="{
                            trendUp: oknha.bs == 'buy',
                            trendDown: oknha.bs == 'sell',
                          }"
                        ></span>
                        <span class="uppercase">{{ oknha.bs }}</span>
                      </span>
                      <span>${{ formatPrice(oknha.ab) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-xs time">{{
                        formatDay(oknha.d) + " " + formatHours(oknha.d)
                      }}</span>
                      <span
                        class="totalWin font-bold"
                        :class="{ winUp: oknha.aw > 0, winDown: oknha.aw == 0 }"
                      >
                        <span class="uppercase"></span>
                        <span>{{ oknha.aw > 0 ? "+" : "" }}</span
                        >${{
                          oknha.aw > 0
                            ? formatPrice(
                                Number.parseFloat(oknha.ab) +
                                  Number.parseFloat(oknha.aw)
                              )
                            : 0
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </VuePerfectScrollbar>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AuthenticationService from "@/services/AuthenticationService";
import { isTablet, isMobile } from "mobile-device-detect";
import moment from "moment";

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isCloseTab: true,
      isOpenTab: false,

      isDate: "",

      lastDate: "",
      listItem: [],
      listItemOpen: [],
      colorxChangePass: "#def1d1",
      popupActiveChangePass: false,
      // Data Sidebar
      SidebarHSSetting: false,
      sidebarDataSetting: {},
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      isSideBar: isMobile || isTablet,
    };
  },
  //   filters: {
  //     currencydecimal (val) {
  //       if(val == 'BTC') return val.toFixed(6)
  //       if(val == 'ETH') return val.toFixed(4)
  //       return val.toFixed(2)
  //     }
  //   },
  watch: {
    isSidebarActiveLocal: {
      immediate: true,
      handler(val) {
        this.$store.commit("SET_IS_SCROLL_TRADING", !val);
      },
    },
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        if (!!this.isCloseTab) {
          this.getListBET();
        }
        if (!!this.isOpenTab) {
          this.getListOrder();
        }
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          // this.$validator.reset()
          // this.initValues()
        }
      },
    },
  },
  methods: {
    fromatTimzoneD(value) {
      if (value) {
        return moment(new Date(value)).format("DD/MM/YYYY");
      }
    },

    fromatTimzoneH(value) {
      if (value) {
        return moment(new Date(value)).format("HH:mm:ss");
      }
    },

    formatPrice(value, minimum) {
      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: 0,
        // maximumFractionDigits: 2,
      });
      return formatter.format(value);
    },

    formatDay(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },

    formatHours(value) {
      if (value) {
        return moment(String(value)).format("HH:mm:ss");
      }
    },

    getListBET() {
      let list = JSON.parse(localStorage.getItem("stateOpen"));
      if (list) {
        this.listItemOpen = list.l.bet[0].items.reverse();
      } else {
        this.listItemOpen = [];
      }
    },

    getListOrder() {
      AuthenticationService.getListHitoryOrder().then((res) => {
        if (res.data.success) {
          this.listItem = res.data.data;
        }
      });
    },

    showHoSoSetting(data) {
      //let id = data
      this.toggleDataSidebar(true);
    },

    toggleDataSidebar(val = false) {
      this.SidebarHSSetting = val;
    },
  },
  components: {
    VuePerfectScrollbar,
  },

  mounted() {
    let stateOpen = localStorage.getItem("stateOpen");
    if (stateOpen) {
      const list = JSON.parse(stateOpen);
      if (list) {
        this.listItemOpen = list.l.bet[0].items.reverse();
      } else {
        this.listItemOpen = [];
        this.getListOrder();
      }
    }

    window.addEventListener("stateOpen-localstorage-changed", (event) => {
      if (!event.detail.storage) {
        this.listItemOpen = [];
        this.getListOrder();
        return;
      }
      const list = JSON.parse(event.detail.storage);
      if (list) {
        this.listItemOpen = list.l.bet[0].items.reverse();
      } else {
        this.listItemOpen = [];
        this.getListOrder();
      }
    });
  },
};
</script>

<style>
.tablist .con-vs-tabs {
  height: calc(var(--vh, 1vh) * 100 - 16px - 75px - 10px);
}

.tablist .con-vs-tabs .con-slot-tabs {
  height: calc(var(--vh, 1vh) * 100 - 16px - 100px - 10px);
  overflow-y: auto;
}
</style>

<style scoped>
.transactionBox {
  padding: 0.5rem;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.14);
}

.transactionBox .accType {
  background-color: #2177ff;
  border-radius: 5px;
  font-size: 14px;
  padding: 3px 5px;
  line-height: 20px;
  vertical-align: middle;
}

.transactionBox .accType.live {
  background-color: #ea5455;
}

.transactionBox .icon {
  display: inline-block;
  width: 19px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: contain;
}

.transactionBox .icon.iconBitcoin {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTkuMjQyIiBoZWlnaHQ9IjE4LjM2NyIgdmlld0JveD0iMCAwIDE5LjI0MiAxOC4zNjciPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSIwLjU1IiB4Mj0iMC41NDkiIHkyPSIxIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZhOTQxYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNkODdkMDAiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIGlkPSJHcm91cF8xMTk0NiIgZGF0YS1uYW1lPSJHcm91cCAxMTk0NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQyMi45NzUgLTgzNS4wMDEpIj4KICAgIDxnIGlkPSJHcm91cF80NjEzIiBkYXRhLW5hbWU9Ikdyb3VwIDQ2MTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQyMi45NzUgODM1LjAwMSkiPgogICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzI5MTkiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDI5MTkiIHdpZHRoPSIxOS4yNDIiIGhlaWdodD0iMTguMzY3IiByeD0iOS4xODQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiIGZpbGw9InVybCgjbGluZWFyLWdyYWRpZW50KSIvPgogICAgPC9nPgogICAgPHBhdGggaWQ9IlBhdGhfMTM5MjEiIGRhdGEtbmFtZT0iUGF0aCAxMzkyMSIgZD0iTTQ5NC44MDcsMzUyLjc3NmMuMTctMS4xMzYtLjctMS43NDctMS44NzgtMi4xNTRsLjM4NC0xLjUzOS0uOTM3LS4yMzMtLjM3NCwxLjVjLS4yNDYtLjA2MS0uNS0uMTItLjc1LS4xNzdsLjM3Ni0xLjUwOC0uOTM2LS4yMzMtLjM4MywxLjUzOC0xLjg4OS0uNDY4LS4yNDksMXMuNy4xNTkuNjguMTY5YS41LjUsMCwwLDEsLjQzNy41NDVsLTEuMDUxLDQuMjE2YS4zNC4zNCwwLDAsMS0uNDI5LjIyMmMuMDA5LjAxNC0uNjgxLS4xNzEtLjY4MS0uMTcxbC0uNDY1LDEuMDc0LDEuODg3LjQ3Ni0uMzg4LDEuNTU3LjkzNi4yMzMuMzg0LTEuNTRjLjI1Ni4wNjkuNS4xMzMuNzQ2LjE5NGwtLjM4MywxLjUzMy45MzcuMjMzLjM4OC0xLjU1NGMxLjYuMywyLjguMTgsMy4zLTEuMjYzYTEuNjQ0LDEuNjQ0LDAsMCwwLS44NjEtMi4yNzIsMS41LDEuNSwwLDAsMCwxLjItMS4zNzZtLTIuMTQsM2MtLjI5LDEuMTYzLTIuMjQ4LjUzNS0yLjg4NC4zNzdsLjUxNC0yLjA2MmMuNjM1LjE1OCwyLjY3MS40NzIsMi4zNjksMS42ODVtLjI5LTMuMDE4Yy0uMjY0LDEuMDU5LTEuODk1LjUyMS0yLjQyNC4zODlsLjQ2Ni0xLjg3MWMuNTI5LjEzMiwyLjIzMy4zNzgsMS45NTcsMS40ODIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01OC4wNzUgNDkwLjQ5MSkiIGZpbGw9IiNmZmYiLz4KICA8L2c+Cjwvc3ZnPgo=);
}

.transactionBox .trendGroup .trendIcon {
  display: inline-block;
  width: 19px;
  height: 19px;
  background-repeat: no-repeat;
  background-size: contain;
}

.transactionBox .trendGroup .trendIcon.trendUp,
.transactionBox .trendGroup .trendIcon.UP {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDE5IDE5Ij4KICA8ZyBpZD0iR3JvdXBfMTE5MzkiIGRhdGEtbmFtZT0iR3JvdXAgMTE5MzkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTY1IC0xODcpIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMzc3NCIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMzc3NCIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiByeD0iMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE2NSAxODcpIiBmaWxsPSIjMzFCQUEwIi8+CiAgICA8ZyBpZD0idHJpYW5nbGUtaGVhZC1hcnJvdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE2Ny41MjMgMTk2LjIxKSByb3RhdGUoLTQ1KSI+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzI2MjQ1IiBkYXRhLW5hbWU9IlBhdGggMjYyNDUiIGQ9Ik0xMC4wNyw1LjI2OCw2Ljg5NCwyLjA5MmEuMzE4LjMxOCwwLDAsMC0uNTQyLjIyNVY0LjU0SC4zMThBLjMxOC4zMTgsMCwwLDAsMCw0Ljg1OHYxLjI3YS4zMTguMzE4LDAsMCwwLC4zMTguMzE4SDYuMzUyVjguNjY5YS4zMTguMzE4LDAsMCwwLC41NDIuMjI1TDEwLjA3LDUuNzE4YS4zMTguMzE4LDAsMCwwLDAtLjQ1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIgZmlsbD0iI2ZmZiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==);
}

.transactionBox .trendGroup .trendIcon.trendDown,
.transactionBox .trendGroup .trendIcon.DOWN {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDE5IDE5Ij4KICA8ZyBpZD0iR3JvdXBfMTE5NDIiIGRhdGEtbmFtZT0iR3JvdXAgMTE5NDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTY1IC0xODcpIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMzc3NCIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMzc3NCIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiByeD0iMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE2NSAxODcpIiBmaWxsPSIjZmM1ZjVmIi8+CiAgICA8ZyBpZD0idHJpYW5nbGUtaGVhZC1hcnJvdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE3NS4yOTEgMTg5LjAyMykgcm90YXRlKDQ1KSI+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzI2MjQ1IiBkYXRhLW5hbWU9IlBhdGggMjYyNDUiIGQ9Ik0xMC4wNyw1LjI2OCw2Ljg5NCwyLjA5MmEuMzE4LjMxOCwwLDAsMC0uNTQyLjIyNVY0LjU0SC4zMThBLjMxOC4zMTgsMCwwLDAsMCw0Ljg1OHYxLjI3YS4zMTguMzE4LDAsMCwwLC4zMTguMzE4SDYuMzUyVjguNjY5YS4zMTguMzE4LDAsMCwwLC41NDIuMjI1TDEwLjA3LDUuNzE4YS4zMTguMzE4LDAsMCwwLDAtLjQ1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIgZmlsbD0iI2ZmZiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==);
}

.transactionBox .time {
  color: rgba(255, 255, 255, 0.5);
}

.transactionBox .totalWin.winUp {
  color: #23c15f;
}

.transactionBox .totalWin.winDown {
  color: #ea5455;
}

.h-a {
  height: calc(100vh - 160px);
}
</style>

<style>
.sidebar_tab > .con-ul-tabs:after {
  content: "";
  position: absolute;
  width: 80%;
  height: 0;
  left: 50%;
  transform: translateX(-50%);
  bottom: -3px;
  border-bottom: 1px solid #8b8d96;
}
</style>

<style lang="scss" scoped>
.pro-c-avatar__content {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.pro-c-avatar_size_extra-large .pro-c-avatar__placeholder {
  padding: 1rem;
}
.pro-c-avatar__placeholder {
  fill: currentColor;
  box-sizing: border-box;
  height: 100%;
  padding: 0.5rem;
  width: 100%;
}
.vs-sidebar--background {
  background: rgba(0, 0, 0, 0.5);
}

.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  @media screen and (max-width: 768px) {
    .sidebar-header{
      display: block !important;;
    }
    ::v-deep .vs-sidebar {
      width: 100% !important;
      max-width: 100% !important;
    }
  }

  @media screen and (min-width: 769px) {
    ::v-deep .vs-sidebar {
      width: 230px !important;
      max-width: 90vw !important;
      //top: 65px;
    }
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  /* height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px); */
}
</style>
