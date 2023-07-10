<template>
  <div class="p-16">
    <div id="list-bet-trade" class="data-list-container" v-if="!isShowNapRut">
      <div class="flex-between-center">
        <a-select
          default-value="all"
          :showArrow="false"
          style="width: 120px"
          @change="onTimeChange"
          :dropdownClassName="'bg-white'"
        >
          <a-select-option
            :key="index"
            :value="item.value"
            v-for="(item, index) in options"
          >
            {{ item.text }}
          </a-select-option>
        </a-select>

        <div class="mt-2">TÍNH TỔNG THEO ACCOUNT LIVE</div>
        <div class="space-y-2 py-2">
          <p>Tổng cược: ${{ this.formatPrice(betTotal, 2) }}</p>
          <p style="color: rgb(25 146 246)">
            Tổng WIN: ${{ this.formatPrice(betWin, 2) }}
          </p>
          <p style="color: #f00">
            Tổng THUA: ${{ this.formatPrice(betLose, 2) }}
          </p>
          <p style="color: #7167E8">LỜI: ${{ this.formatPrice(betWin - betLose, 2) }}</p>
        </div>
      </div>
      <div class="flex items-end space-x-4">
        <div>
          <small class="date-label">Từ ngày</small>
          <datepicker v-model="startDate" format="dd-MM-yyyy"></datepicker>
        </div>
        <div>
          <small class="date-label">Đến ngày</small>
          <datepicker
            name="end-date"
            v-model="endDate"
            format="dd-MM-yyyy"
          ></datepicker>
        </div>
        <a-button
          @click="filterFromToDate"
          type="primary"
          :disabled="!startDate || !endDate"
        >
          Tìm kiếm
        </a-button>
      </div>
      <br />
      <div id="loading-corners-f17" class="vs-con-loading__container">
        <a-table
          :columns="columns"
          :loading="tableLoading"
          :data-source="products"
          :row-key="(record, index) => index"
        >
          <template slot="email" slot-scope="row"> {{ row.email }} </template>

          <template slot="bet" slot-scope="row">
            {{ formatPrice(row.tongDatCuoc, 2) }}
          </template>

          <template slot="win-total" slot-scope="row">
            <div style="color: rgb(25 146 246)">${{ formatPrice(row.tongWin, 2) }}</div>
          </template>

          <template slot="lose-total" slot-scope="row">
            <div style="color: #f00">${{ formatPrice(row.tongThua, 2) }}</div>
          </template>
          <template slot="tb-total" slot-scope="row">
            <div style="color: #7167E8">${{ formatPrice(row.tongWin - row.tongThua, 2) }}</div>
          </template>

          <template slot="tong-nap" slot-scope="row">
            ${{ formatPrice(tongNap(row.napRut), 2) }}
            <a-button icon="eye" @click="showNap(row)">Xem</a-button>
          </template>

          <template slot="tong-rut" slot-scope="row">
            ${{ formatPrice(tongRut(row.napRut), 2) }}
            <a-button icon="eye" @click="showRut(row)">Xem</a-button>
          </template>
        </a-table>
      </div>
    </div>
    <div v-else>
      <div class="mb-4">
        <a-button @click="isShowNapRut = false" icon="arrow-left"
          >Trở về</a-button
        >
      </div>
      <!-- <div class="close-table-wrapper">
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
          <span class="ml-2 text-base text-sucess">Trở về</span>
        </div>
      </div> -->
      <F17NapTable :tableData="napRutData" :tableType="tableType" />
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import AuthenticationService from "@/services/AuthenticationService";
import moment from "moment";

import Datepicker from "vuejs-datepicker";
import F17NapTable from "./F17NapTable.vue";

const columns = [
  {
    title: "Email",
    key: "email",
    scopedSlots: { customRender: "email" },
  },

  {
    title: "Tổng đặt cược",
    key: "bet",
    scopedSlots: { customRender: "bet" },
  },

  {
    title: "Tổng thắng",
    key: "win-total",
    scopedSlots: { customRender: "win-total" },
  },

  {
    title: "Tổng thua",
    key: "lose-total",
    scopedSlots: { customRender: "lose-total" },
  },

  {
    title: "Lợi nhuận",
    key: "tb-total",
    scopedSlots: { customRender: "tb-total" },
  },

  {
    title: "Tổng nạp",
    key: "tong-nap",
    scopedSlots: { customRender: "tong-nap" },
  },

  {
    title: "Tổng rút",
    key: "tong-rut",
    scopedSlots: { customRender: "tong-rut" },
  },
];
export default {
  components: {
    vSelect,
    Datepicker,
    F17NapTable,
  },
  data() {
    return {
      email: localStorage.getItem("agencyMail") || "",
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

      productsFake: [],
      itemsPerPage: 10,

      columns,
      tableLoading: false,
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
    tongNap(napRut) {
      return napRut.reduce((prev, curr) => {
        return curr.type_key === "nt" ? parseFloat(curr.amount) + prev : 0;
      }, 0);
    },
    tongRut(napRut) {
      return napRut.reduce((prev, curr) => {
        return curr.type_key === "rt" ? parseFloat(curr.amount) + prev : 0;
      }, 0);
    },
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
      console.log(e);
      let timQuery = e !== "all" ? `&f=${e}` : "";
      this.reloadList(timQuery);
    },

    filterFromToDate() {
      let from = moment(this.startDate).format("YYYY-MM-DD");
      let to = moment(this.endDate).format("YYYY-MM-DD");
      let timeQuery = `&from=${from}&to=${to}`;
      this.reloadList(timeQuery);
    },

    formatPrice(value, minimum) {
      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum,
      });
      return formatter.format(parseFloat(value));
    },

    reloadList(time) {
      this.tableLoading = true;
      let f = void 0 !== time ? time : "";
      AuthenticationService.getStatisticsListF1F7(this.email, f)
        .then((resp) => {
          if (!resp.data.success) {
          } else {
            this.productsFake = resp.data.data;
          }
          // this.$vs.loading.close("#loading-corners-f17 > .con-vs-loading");
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
  },
  created() {
    this.reloadList();
  },

  mounted() {},
};
</script>

<style>
</style>
<style lang="scss" scoped>
</style>
