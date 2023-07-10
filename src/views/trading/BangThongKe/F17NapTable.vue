<template>
  <div id="list-history-deposit" class="data-list-container">
    <div class="flex-between-center">
      <div>TỔNG {{tableType == "nap" ? "NẠP" : "RÚT"}} THÀNH CÔNG</div>
      <p style="color: #00ffad">
        Tổng {{tableType == "nap" ? "nạp" : "rút"}}: ${{ this.formatPrice(tongNap, 2) }}
      </p>
    </div>

    <div id="loading-corners-nap" class="vs-con-loading__container">
      <vs-table
        style="min-height: 300px"
        ref="table"
        v-model="selectedUser"
        pagination
        :max-items="itemsPerPage"
        :data="products"
      >
        <div
          slot="header"
          class="flex flex-wrap-reverse items-center flex-grow justify-between"
        ></div>

        <template slot="thead">
          <vs-th sort-key="account">Tài khoản</vs-th>
          <vs-th sort-key="type">Loại tiền</vs-th>
          <vs-th sort-key="amount">Số tiền</vs-th>
          <vs-th sort-key="note">Ghi chú</vs-th>
          <vs-th sort-key="status">Trạng thái</vs-th>
          <vs-th sort-key="datecreate">Thời gian</vs-th>
          <!-- <vs-th>Tác vụ</vs-th> -->
        </template>

        <template slot-scope="{ data }">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                <p class="de-name font-medium truncate">
                  {{ tr.from_u }}<br />Mô tả: {{ tr.type }}
                </p>
              </vs-td>

              <vs-td>
                <p class="de-name font-medium truncate">
                  <span>
                    <IconCrypto
                      style="width: 20px"
                      :coinname="getIconType(tr.currency)"
                      color="color"
                      format="svg"
                      v-if="tr.paypal == null"
                    />
                    <img width="20" :src="typeMoney(tr.currency).i" v-else />
                    {{ typeMoney(tr.currency).t }}
                  </span>
                </p>
              </vs-td>

              <vs-td>
                <p class="de-amount">
                  {{ getAmountDecimal(tr.currency, tr.amount) }}<br />
                </p>
              </vs-td>

              <vs-td>
                <p class="de-note">{{ tr.note }}</p>
              </vs-td>

              <vs-td>
                <vs-chip
                  :color="getOrderStatusColor(tr.status)"
                  class="de-status"
                  >{{ getOrderStatusColorText(tr.status) | title }}</vs-chip
                >
              </vs-td>

              <vs-td>
                <p class="de-create">{{ formatDate(tr.created_at) }}</p>
              </vs-td>

              <!-- <vs-td class="whitespace-no-wrap text-center">
                <vx-tooltip
                  v-if="tr.currency == 'vnd' && tr.status === 0"
                  style="float: left"
                  color="primary"
                  text="Xử lý"
                >
                  <vs-button
                    color="dark"
                    type="line"
                    icon-pack="feather"
                    icon="icon-feather"
                    @click.stop="toggleDataSidebarHandleMoney(tr)"
                  ></vs-button>
                </vx-tooltip>
                <vx-tooltip
                  v-if="tr.delete_status == 0"
                  style="float: left"
                  color="danger"
                  text="Xóa"
                >
                  <vs-button
                    color="dark"
                    type="line"
                    icon-pack="feather"
                    icon="icon-trash"
                    @click.stop="deleteDeposit(tr.id, indextr, 1)"
                  ></vs-button>
                </vx-tooltip>
                <vx-tooltip
                  v-else
                  style="float: left"
                  color="warning"
                  text="Thu hồi"
                >
                  <vs-button
                    color="dark"
                    type="line"
                    icon-pack="feather"
                    icon="icon-arrow-up-left"
                    @click.stop="deleteDeposit(tr.id, indextr, 0)"
                  ></vs-button>
                </vx-tooltip>
              </vs-td> -->
            </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";

export default {
  components: {},
  props: {
    email: { type: String },
    tableData: { type: Array, default: () => [] },
    tableType: { type: String },
  },
  data() {
    return {
      selectedUser: [],

      headerTitle: ["Tài khoản", "Loại", "Số Tiền", "Trạng Thái", "Ngày Nạp"],
      headerVal: ["account", "type", "amount", "status", "datecreate"],

      itemsPerPage: 10,
      currentDataMoney: {},

      dtUSD: 0,
      dtBNB: 0,
      feeBNB: 0,
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    products() {
      return this.tableData;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.productsFake.length;
    },

    tongNap() {
      return this.products.reduce((prev, curr) => {
        return curr.status === 1 ? parseFloat(curr.amount) + prev : 0 + prev;
      }, 0);
    },
  },
  methods: {
    onTimeChange(e) {
      let timQuery = e !== "all" ? `f=${e}` : "";
      this.reloadList(timQuery);
    },

    filterFromToDate() {
      let from = moment(this.startDate).format("YYYY-MM-DD");
      let to = moment(this.endDate).format("YYYY-MM-DD");
      let timeQuery = `from=${from}&to=${to}`;
      this.reloadList(timeQuery);
    },

    deleteDeposit(id, index, val) {
      let token = localStorage.getItem("token");
      this.$store.dispatch("setToken", token);
      let obj = {
        id: id,
        val: val,
      };
      AuthenticationService.deleteTrashByID(obj).then((resp) => {
        if (resp.data.success) {
          Vue.delete(this.productsFake, index);
          this.popupDeleteActive = false;
          return this.$vs.notify({
            text: "Đã xóa thành công",
            color: "success",
            iconPack: "feather",
            icon: "icon-check",
          });
        } else {
          localStorage.removeItem("token");
          this.$router.push("/pages/login").catch(() => {});
        }
      });
    },

    trashDataDeposit() {
      let token = localStorage.getItem("token");
      this.$store.dispatch("setToken", token);

      AuthenticationService.getDepositAllTrash().then((resp) => {
        if (!resp.data.success) {
          localStorage.removeItem("token");
          this.$router.push("/pages/login").catch(() => {});
        } else {
          this.productsFake = resp.data.data;
        }
      });
    },

    getOrderStatusColor(status) {
      if (status == 0) return "warning";
      if (status == 1) return "success";
      //if(status == 2) return "danger"
      return "warning";
    },
    getOrderStatusColorText(status) {
      if (status == 0) return "Đang xử lý";
      if (status == 1) return "Hoàn thành";
      if (status == -1) return "Từ chối";
      //if(status == 2) return "danger"
      return "Đang xử lý";
    },

    getIconType(type) {
      let cur = type.toUpperCase();
      return cur;
    },

    typeMoney(currency) {
      switch (currency.toUpperCase()) {
        case "BTC":
        case "ETH":
        case "USDT":
          return {
            t: "Hệ thống",
            i: require("@/assets/images/sky/icon_bank/paypal-mini.png"),
          };
        case "VND":
          return {
            t: "Ngân hàng VNĐ",
            i: require("@/assets/images/sky/icon_bank/vnd-mini.svg"),
          };

        default:
          return {
            t: currency.toUpperCase(),
            i: require("@/assets/images/sky/icon_bank/paypal-mini.png"),
          };
      }
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY HH:mm:ss");
      }
    },

    formatPrice(value, minimum) {
      if (void 0 === value) value = 0;
      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum,
      });

      return formatter.format(value);
    },

    getAmountDecimal(type, value) {
      let cur = "$";
      let coin = type.toUpperCase();
      let minimum = 2;
      if (coin == "BTC") minimum = 6;

      if (coin == "ETH") minimum = 4;

      if (coin == "USDT") minimum = 2;

      if (coin == "VN") minimum = 0;

      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum,
      });

      return cur + formatter.format(value);
    },

    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          // Add col name which needs to be translated
          // if (j === 'timestamp') {
          //   return parseTime(v[j])
          // } else {
          //   return v[j]
          // }

          return v[j];
        })
      );
    },
  },
  created() {},

  mounted() {},

  watch: {},
};
</script>

<style lang="scss">
#list-history-deposit {
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