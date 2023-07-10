<template>
  <div id="list-bet-trade" class="data-list-container">
    <!-- <vs-prompt title="Export To Excel" class="export-options" @cancle="clearFields" @accept="exportToExcel" accept-text="Export" @close="clearFields" :active.sync="activePrompt">
        <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt> -->

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
      <div>TÍNH TỔNG THEO ACCOUNT LIVE</div>
      <p>Tổng cược: ${{ this.formatPrice(betTotal, 2) }}</p>
      <p style="color: rgb(25 146 246)">Tổng WIN: ${{ this.formatPrice(betWin, 2) }}</p>
      <p style="color: #f00">Tổng THUA: ${{ this.formatPrice(betLose, 2) }}</p>
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
    <br />
    <div id="loading-corners-bet" class="vs-con-loading__container">
      <vs-table
        ref="table"
        style="min-height: 300px"
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
          <vs-th sort-key="description">Mô tả</vs-th>
          <vs-th sort-key="type">Loại</vs-th>
          <vs-th sort-key="buy_sell">Mua / Bán</vs-th>
          <vs-th sort-key="amount">Số tiền cược</vs-th>
          <vs-th sort-key="win_lose">Thắng / Thua</vs-th>
          <vs-th sort-key="result_bet">Kết quả</vs-th>
          <vs-th sort-key="open_close">Open / Close</vs-th>
          <vs-th sort-key="datecreate">Thời gian</vs-th>
          <!--<vs-th>Tác vụ</vs-th>-->
        </template>

        <template slot-scope="{ data }">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                <p class="bet-description font-medium truncate">
                  Email: {{ tr.email }}
                </p>
                <p class="bet-description font-medium truncate">
                  ID: {{ tr.id_account }}
                </p>
                <p
                  class="bet-description font-medium truncate"
                  v-if="tr.type_account"
                >
                  Live Account
                </p>
                <p class="bet-description font-medium truncate" v-else>
                  Demo Account
                </p>
              </vs-td>

              <vs-td>
                <p class="bet-currency">
                  {{ tr.currency }}<br />
                  <span
                    style="text-decoration: underline; color: #84f98d"
                    v-if="tr.marketing"
                    >Marketing</span
                  >
                  <span v-else>Thường</span>
                </p>
              </vs-td>

              <vs-td>
                <p class="bet-buy_sell" v-if="tr.buy_sell == 'buy'">
                  <span class="text-success">MUA</span>
                </p>
                <p class="bet-buy_sell" v-else>
                  <span class="text-danger">BÁN</span>
                </p>
              </vs-td>

              <vs-td>
                <p class="bet-amount">
                  <IconCrypto
                    style="width: 20px"
                    coinname="USD"
                    color="color"
                    format="svg"
                  />
                  <font color="rgb(25 146 246)">{{
                    getAmountDecimal("vn", tr.amount_bet)
                  }}</font>
                </p>
              </vs-td>

              <vs-td>
                <p class="bet-win_lose">
                  <span
                    style="
                      color: #fb9494;
                      font-weight: bold;
                      text-shadow: 0px 0px 5px #f00;
                    "
                    >{{
                      `${
                        tr.amount_win != 0
                          ? "+" + tr.amount_win
                          : "-" + tr.amount_lose
                      }`
                    }}</span
                  >
                </p>
              </vs-td>

              <vs-td>
                <p class="bet-result_bet" v-if="tr.amount_win != 0">
                  <span class="text-success">Thắng</span>
                </p>
                <p class="bet-result_bet" v-else>
                  <span class="text-danger">Thua</span>
                </p>
              </vs-td>

              <vs-td>
                <p class="bet-open_close">{{ `${tr.open} -> ${tr.close}` }}</p>
                <p>Phiên: {{ tr.session }}</p>
              </vs-td>

              <vs-td>
                <p class="de-create">{{ tr.created_at }}</p>
              </vs-td>
            </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import AuthenticationService from "@/services/AuthenticationService";
import moment from "moment";
import Vue from "vue";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    vSelect,
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
      headerTitle: [
        "ID",
        "Mô tả",
        "Loại",
        "Số Tiền",
        "Ghi Chú",
        "Ngày Giao Dịch",
      ],
      headerVal: ["id", "description", "type", "amount", "note", "datecreate"],
      productsFake: [],
      itemsPerPage: 10,
      isMounted: false,
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

    betTotal() {
      return this.products.reduce((prev, curr) => {
        return curr.type_account === 1
          ? parseFloat(curr.amount_bet) + prev
          : 0 + prev;
      }, 0);
    },

    betWin() {
      return this.products.reduce((prev, curr) => {
        return curr.type_account === 1
          ? parseFloat(curr.amount_win) + prev
          : 0 + prev;
      }, 0);
    },

    betLose() {
      return this.products.reduce((prev, curr) => {
        return curr.type_account === 1
          ? parseFloat(curr.amount_lose) + prev
          : 0 + prev;
      }, 0);
    },

    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.productsFake.length;
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

    formatPrice(value, minimum) {
      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum,
      });
      return formatter.format(value);
    },
    // deleteMultiple() {
    //   let token = localStorage.getItem("token");
    //   this.$store.dispatch("setToken", token);

    //   if (this.selectedUser.length == 0) {
    //     return this.$vs.notify({
    //       text: "Hãy chọn đối tượng cần xóa",
    //       color: "warning",
    //       iconPack: "feather",
    //       icon: "icon-check",
    //     });
    //   }
    //   for (var i = this.selectedUser.length - 1; i >= 0; i--) {
    //     let id = this.selectedUser[i]["id"];
    //     let obj = {
    //       id: id,
    //       val: 1,
    //     };
    //     AuthenticationService.deleteBetsTrash(obj).then((resp) => {
    //       if (!resp.data.success) {
    //         localStorage.removeItem("token");
    //         this.$router.push("/pages/login").catch(() => {});
    //       }
    //     });
    //     Vue.delete(this.productsFake, i);
    //   }
    //   this.selectedUser = [];
    //   return this.$vs.notify({
    //     text: "Đã xóa thành công",
    //     color: "success",
    //     iconPack: "feather",
    //     icon: "icon-check",
    //   });
    // },

    // deleteBet(id, index, val) {
    //   let token = localStorage.getItem("token");
    //   this.$store.dispatch("setToken", token);
    //   let obj = {
    //     id: id,
    //     val: val,
    //   };
    //   AuthenticationService.deleteBetsTrash(obj).then((resp) => {
    //     if (resp.data.success) {
    //       Vue.delete(this.productsFake, index);
    //       this.popupDeleteActive = false;
    //       return this.$vs.notify({
    //         text: "Đã xóa thành công",
    //         color: "success",
    //         iconPack: "feather",
    //         icon: "icon-check",
    //       });
    //     } else {
    //       localStorage.removeItem("token");
    //       this.$router.push("/pages/login").catch(() => {});
    //     }
    //   });
    // },

    // trashDataBet() {
    //   this.showDeleteMultiBt = false;
    //   let token = localStorage.getItem("token");
    //   this.$store.dispatch("setToken", token);

    //   AuthenticationService.getBetsListHisTrash().then((resp) => {
    //     if (!resp.data.success) {
    //       localStorage.removeItem("token");
    //       this.$router.push("/pages/login").catch(() => {});
    //     } else {
    //       this.productsFake = resp.data.data;
    //     }
    //   });
    // },

    getOrderStatusColor(status) {
      if (status == 0) return "warning";
      if (status == 1) return "success";
      //if(status == 2) return "danger"
      return "warning";
    },
    getOrderStatusColorText(status) {
      if (status == 0) return "Chờ xử lý";
      if (status == 1) return "Hoàn thành";
      //if(status == 2) return "danger"
      return "Chờ xử lý";
    },

    getIconType(type) {
      let cur = type.toUpperCase();
      return cur;
    },
    getAmountDecimal(type, money) {
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

      return cur + formatter.format(money);
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
    reloadList(time) {
      this.showDeleteMultiBt = true;
      let token = localStorage.getItem("token");
      this.$store.dispatch("setToken", token);
      let f = void 0 !== time ? time : "";
      this.openLoadingInDiv();
      AuthenticationService.getBetsListHistoryAgency(this.email, f).then((resp) => {
        if (!resp.data.success) {
          localStorage.removeItem("token");
          this.$router.push("/pages/login").catch(() => {});
        } else {
          this.productsFake = resp.data.data;
        }
        this.$vs.loading.close("#loading-corners-bet > .con-vs-loading");
      });
    },

    openLoadingInDiv() {
      this.$vs.loading({
        container: "#loading-corners-bet",
        type: "corners",
        scale: 0.6,
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
  },

  mounted() {
    this.isMounted = true;
    this.openLoadingInDiv();
    this.reloadList();
  },
  watch: {
    email() {
      this.reloadList();
    },
  },
};
</script>

<style lang="scss">
#list-bet-trade {
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
