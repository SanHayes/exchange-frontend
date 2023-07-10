<template>
  <div id="list-history-deposit" class="data-list-container">
    <!-- <vs-prompt title="Export To Excel" class="export-options" @cancle="clearFields" @accept="exportToExcel" accept-text="Export" @close="clearFields" :active.sync="activePrompt">
        <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
     -->

    <div class="flex-between-center">
      <vs-select
        label="Thời gian"
        v-model="timeSelected"
        @change="onTimeChange"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in options"
        />
      </vs-select>
      <p></p>
      <div>TỔNG NẠP TIỀN THÀNH CÔNG</div>
      <p style="color: #00ffad">
        Tổng nạp: ${{ this.formatPrice(tongNap, 2) }}
      </p>
    </div>

    <div class="flex items-end">
      <div class="mr-4">
        <small class="date-label">Từ ngày</small>
        <datepicker v-model="startDate" format="dd-MM-yyyy"></datepicker>
      </div>
      <div class="mr-4">
        <small class="date-label">Đến ngày</small>
        <datepicker
          name="end-date"
          v-model="endDate"
          format="dd-MM-yyyy"
        ></datepicker>
      </div>
      <vs-button @click="filterFromToDate" :disabled="!startDate || !endDate">
        Tìm kiếm
      </vs-button>
    </div>
    <div id="loading-corners-nap" class="vs-con-loading__container">
      <!-- <div class="mb-2">
          <p>
            <span class="mr-4" style="color: #ffb0b0;">Tổng tiền nạp: <b>{{ formatPrice(dtUSD, 2) }} USDT</b></span>
            <span class="mr-4" style="color: #00ffad;">Tổng tiền BNB nhận: <b>{{ formatPrice(dtBNB, 10) }} BNB</b></span>
            <span class="mr-4" style="color: #ffa500;">Phí: <b>{{ formatPrice(feeBNB, 10) }} BNB</b></span>

          </p>
          <p><span class="mr-4">Nạp nhanh không tính chung vào</span> </p>
      </div> -->
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
        >
          <div
            class="flex flex-wrap-reverse items-center data-list-btn-container"
          >
            <!-- ACTION - DROPDOWN -->
            <vs-dropdown
              vs-trigger-click
              class="dd-actions cursor-pointer mr-4 mb-4"
            >
              <!--
              <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
                <span class="mr-2">Tác vụ</span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div> -->

             
            </vs-dropdown>

          </div>

          <!-- ITEMS PER PAGE -->
          <!-- <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ queriedItems }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>
              <vs-dropdown-item @click="itemsPerPage=4">
                <span>4</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=10">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=15">
                <span>15</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=20">
                <span>20</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown> -->
        </div>

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
    <data-view-sidebar
      :isSidebarActive="isHandleMoney"
      @closeSidebar="toggleDataSidebarHandleMoney"
      :currentDataMoney="currentDataMoney"
    />
  </div>
</template>

<script>
import vSelect from "vue-select";
import AuthenticationService from "@/services/AuthenticationService";
import DataViewSidebar from "@/layouts/account/slidebar/HandleMoneyNap.vue";
import moment from "moment";
import Vue from "vue";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    vSelect,
    DataViewSidebar,
    Datepicker,
  },
  props: ["email"],
  data() {
    return {
      timeSelected: "all",
      startDate: "",
      endDate: "",
      options: [
        { value: "all", text: "Tất cả" },
        { value: "hom-nay", text: "Hôm nay" },
        { value: "hom-qua", text: "Hôm qua" },
        { value: "tuan-nay", text: "Tuần này" },
        { value: "tuan-truoc", text: "Tuần trước" },
        { value: "thang-nay", text: "Tháng này" },
        { value: "thang-truoc", text: "Tháng trước" },
      ],
      showDeleteMultiBt: true,
      activePrompt: false,
      selectedUser: [],
      fileName: "",
      formats: ["xlsx", "csv", "txt"],
      cellAutoWidth: true,
      selectedFormat: "xlsx",
      headerTitle: ["Tài khoản", "Loại", "Số Tiền", "Trạng Thái", "Ngày Nạp"],
      headerVal: ["account", "type", "amount", "status", "datecreate"],
      productsFake: [],
      itemsPerPage: 10,
      isMounted: false,
      isHandleMoney: false,
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
      return this.productsFake;
      // const now = moment(new Date());
      // if (this.timeSelected == "day") {
      //   return this.productsFake.filter((item) => {
      //     return moment(item.created_at).format("DD") == now.format("DD");
      //   });
      // } else if (this.timeSelected == "month") {
      //   return this.productsFake.filter((item) => {
      //     return moment(item.created_at).format("MM") == now.format("MM");
      //   });
      // } else if (this.timeSelected == "year") {
      //   return this.productsFake.filter((item) => {
      //     return moment(item.created_at).format("YYYY") == now.format("YYYY");
      //   });
      // } else {
      //   return this.productsFake;
      // }
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

    toggleDataSidebarHandleMoney(tr) {
      this.isHandleMoney = !this.isHandleMoney;

      if (tr.isEdit) {
        const indReNew = this.productsFake.findIndex((e) => e.id === tr.id);
        if (indReNew > -1) {
          const prodClone = JSON.parse(JSON.stringify(this.productsFake));
          prodClone[indReNew].note = tr.note;
          prodClone[indReNew].status = tr.status;
          this.productsFake = prodClone;
        }
      }

      if (typeof tr !== "undefined") {
        this.currentDataMoney = tr;
      }
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

    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    // export ra file
    //==================================================================
    exportToExcel() {
      // kiểm tra nếu chưa chọn đối tượng thình sẽ không hiện bản xuất file
      if (this.selectedUser.length == 0) {
        return this.$vs.notify({
          title: "Xuất dữ liệu",
          text: "Vui lòng chọn nội dung để hoàn thành",
          color: "danger",
          iconPack: "feather",
          icon: "icon-heart",
        });
      }
      import("@/vendor/Export2Excel").then((excel) => {
        const list = this.selectedUser;
        const data = this.formatJson(this.headerVal, list);
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat,
        });
        this.clearFields();
      });
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
    clearFields() {
      this.fileName = "";
      this.cellAutoWidth = true;
      this.selectedFormat = "xlsx";
    },

    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    openLoadingInDiv() {
      this.$vs.loading({
        container: "#loading-corners-nap",
        type: "corners",
        scale: 0.6,
      });
    },

    reloadList(time) {
      this.showDeleteMultiBt = true;
      let token = localStorage.getItem("token");
      this.$store.dispatch("setToken", token);
      let f = void 0 !== time ? time : "";
      this.openLoadingInDiv();
      AuthenticationService.getDepositListHistoryAgency(this.email, f).then(
        (resp) => {
          if (resp.data.success == 4) {
            localStorage.removeItem("token");
            this.$router.push("/pages/login").catch(() => {});
          } else {
            this.productsFake = resp.data.data;
          }
          this.$vs.loading.close("#loading-corners-nap > .con-vs-loading");
        }
      );
    },

    getDTNap() {
      AuthenticationService.getRevenueNap().then((resp) => {
        let g = resp.data;
        if (g.success == 1) {
          this.dtUSD = g.data.dtUSD;
          this.dtBNB = g.data.dtBNB;
          this.feeBNB = g.data.freeBNB;
        }
      });
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
    // this.reloadList();
    // this.getDTNap();
  },

  mounted() {
    this.isMounted = true;
    this.reloadList();
    this.getDTNap();
  },

  watch: {
    email() {
      this.reloadList();
    },
  },
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