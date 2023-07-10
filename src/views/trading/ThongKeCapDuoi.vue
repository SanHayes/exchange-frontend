<template>
  <div>
    <!-- <vs-tabs alignment="center">
      <vs-tab label="Nạp" @click="tableSelecteIndex = 0"> </vs-tab>
      <vs-tab label="Rút" @click="tableSelecteIndex = 1"> </vs-tab>
      <vs-tab label="Đặt cược" @click="tableSelecteIndex = 2"> </vs-tab>
      <vs-tab label="Thống kê tuyến dưới" @click="tableSelecteIndex = 3">
      </vs-tab>
    </vs-tabs> -->
    <div class="content">
      <F17Table :email="email" />
    </div>
  </div>
</template>

<script>
// import BetTable from "./BangThongKe/BetTable.vue";
import F17Table from "./BangThongKe/F17Table.vue";
// import NapTienTable from "./BangThongKe/NapTienTable.vue";
// import RutTienTable from "./BangThongKe/RutTienTable.vue";
import getData from "@/pages/trade/navbar/components/data.json";

export default {
  components: {
    // BetTable,

    // NapTienTable,
    // RutTienTable,
    F17Table,
  },
  data() {
    return {
      tableSelecteIndex: 0,
      email: getData.email,
    };
  },
  computed: {
    // currentTable() {
    //   const tableList = [
    //     "NapTienTable",
    //     "RutTienTable",
    //     "BetTable",
    //     "F17Table",
    //   ];
    //   return tableList[this.tableSelecteIndex];
    // },
  },
};
</script>

<style>
</style>