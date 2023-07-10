<template>
  <div>
    <div id="list-bet-trade" class="data-list-container" v-if="!isShowNapRut">
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
        <p style="color: rgb(25 146 246)">
          Tổng WIN: ${{ this.formatPrice(betWin, 2) }}
        </p>
        <p style="color: #f00">
          Tổng THUA: ${{ this.formatPrice(betLose, 2) }}
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
      <br />
      <div id="loading-corners-f17" class="vs-con-loading__container">
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
            class="
              flex flex-wrap-reverse
              items-center
              flex-grow
              justify-between
            "
          ></div>

          <template slot="thead">
            <vs-th sort-key="email">Email</vs-th>
            <vs-th sort-key="tongDatCuoc">Tổng đăt cược</vs-th>
            <vs-th sort-key="tongThua">Tổng thua</vs-th>
            <vs-th sort-key="tongWin">Tổng thắng</vs-th>
            <vs-th sort-key="napRut">Tổng nạp</vs-th>
            <vs-th sort-key="napRut">Tổng rút</vs-th>
            <!--<vs-th>Tác vụ</vs-th>-->
          </template>

          <template slot-scope="{ data }">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td>
                  <p class="bet-description font-medium truncate">
                    {{ tr.email }}
                  </p>
                </vs-td>

                <vs-td>
                  <p class="bet-currency">
                    {{ formatPrice(tr.tongDatCuoc, 2) }}<br />
                  </p>
                </vs-td>

                <vs-td>
                  <p
                    class="bet-description font-medium truncate"
                    style="color: #f00"
                  >
                    {{ formatPrice(tr.tongThua, 2) }}
                  </p>
                </vs-td>

                <vs-td>
                  <p class="bet-amount" style="color: rgb(25 146 246)">
                    {{ formatPrice(tr.tongWin, 2) }}
                  </p>
                </vs-td>

                <vs-td>
                  <p
                    style="color: rgb(25 146 246); max-width: 140px"
                    class="text-center"
                  >
                    {{ formatPrice(calNapRutTotal(tr, "nt"), 2) }}
                  </p>
                  <p>
                    <vs-button
                      icon-pack="feather"
                      icon="icon-eye"
                      @click="showNap(tr)"
                      >Xem chi tiết
                    </vs-button>
                  </p>
                </vs-td>

                <vs-td>
                  <p
                    style="color: rgb(25 146 246); max-width: 140px"
                    class="text-center"
                  >
                    {{ formatPrice(calNapRutTotal(tr, "rt"), 2) }}
                  </p>
                  <p>
                    <vs-button
                      icon-pack="feather"
                      icon="icon-eye"
                      @click="showRut(tr)"
                      >Xem chi tiết
                    </vs-button>
                  </p>
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>
    </div>
    <div v-else>
      <div class="close-table-wrapper">
        <div
          class="
            w-32
            p-3
            mb-4
            mr-4
            rounded-lg
            flex
            cursor-pointer
            items-center
            justify-center
            text-lg
            font-medium
            text-success
            border border-solid border-success
          "
          @click="isShowNapRut = false"
        >
          <feather-icon icon="ArrowLeftIcon" svgClasses="h-4 w-4" />
          <span class="ml-2 text-base text-sucess">Trở về</span>
        </div>
      </div>
      <F17NapTable :tableData="napRutData" :tableType="tableType" />
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import AuthenticationService from "@/services/AuthenticationService";
import moment from "moment";
import Vue from "vue";
import Datepicker from "vuejs-datepicker";
import F17NapTable from "./F17NapTable.vue";

export default {
  components: {
    vSelect,
    Datepicker,
    F17NapTable,
  },
  props: ["email"],
  data() {
    return {
      tableType: "nap",
      napRutData: [],
      isShowNapRut: false,
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
      productsFake: [
        {
          id: 1,
          id_account: "134242",
          type_account: 1,
          buy_sell: "buy",
          amount_win: 9.5,
          amount_lose: 0,
          amount_bet: 9.5,
          currency: "BTC",
          open: 50552.98,
          close: 50541.01,
          session: 154242443,
          created_at: "00:00:00 02-04-2021",
        },
      ],
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
        return parseFloat(curr.tongDatCuoc) + prev;
      }, 0);
    },

    betWin() {
      return this.products.reduce((prev, curr) => {
        return parseFloat(curr.tongWin) + prev;
      }, 0);
    },

    betLose() {
      return this.products.reduce((prev, curr) => {
        return parseFloat(curr.tongThua) + prev;
      }, 0);
    },

    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.productsFake.length;
    },
  },
  methods: {
    calNapRutTotal(tr, type) {
      // type: nt rt
      if (void 0 === tr.napRut) return;
      let total = tr.napRut.reduce((prev, curr) => {
        return curr.type_key === type ? parseFloat(curr.amount) + prev : prev;
      }, 0);
      return total;
    },
    showNap(tr) {
      this.napRutData = tr.napRut.filter((item) => {
        return item.type_key == "nt";
      });
      this.tableType = "nap";
      this.isShowNapRut = true;
    },
    showRut(tr) {
      this.napRutData = tr.napRut.filter((item) => {
        return item.type_key == "rt";
      });
      this.tableType = "rut";
      this.isShowNapRut = true;
    },
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

    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    //==================================================================
    // export ra file
    //==================================================================

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
      AuthenticationService.getStatisticsListF1F7(this.email, f).then(
        (resp) => {
          if (!resp.data.success) {
            localStorage.removeItem("token");
            this.$router.push("/pages/login").catch(() => {});
          } else {
            this.productsFake = resp.data.data;
          }
          this.$vs.loading.close("#loading-corners-f17 > .con-vs-loading");
        }
      );
    },

    openLoadingInDiv() {
      this.$vs.loading({
        container: "#loading-corners-f17",
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
