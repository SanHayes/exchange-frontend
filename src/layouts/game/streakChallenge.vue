<template>
  <div>
    <div>
      <vs-select
        v-model="config.user"
        label="User trúng giải đặc biệt"
        autocomplete
      >
        <vs-select-item
          v-for="(item, index) in users"
          :key="index"
          :value="item.email"
          :text="item.nick_name"
        />
      </vs-select>

      <vs-input
        label="Số tiền trao giải"
        type="number"
        min="0"
        v-model="config.userMoney"
      />

      <div>Ngày nhận giải</div>
      <datepicker
        class="customeTradeHistory startDate"
        :format="formatDate"
        v-model="config.userDate"
      ></datepicker>
    </div>

    <div class="form-group">
      <div>
        Biên độ tiền thưởng(Theo thời gian trong ngày, số tiền giao dịch toàn
        sàn sẽ nằm trong khoảng
        <span class="dola">${{ config.range[0] }}</span> đến
        <span class="dola">${{ config.range[1] }}</span> và tăng dần)
      </div>
      <vs-slider
        :min="10000"
        :max="100000"
        text-fixed="USD"
        color="rgb(45, 208, 129)"
        v-model="config.range"
      />
    </div>

    <div class="form-group">
      <vs-input
        label="Số lệnh win/loss liên tiếp"
        type="number"
        min="0"
        v-model="config.consecutive"
      />
    </div>

    <div class="form-group">
      <vs-input
        label="Đánh số tiền nhiều hơn số này sẽ được công nhận"
        type="number"
        min="0"
        v-model="config.moneyConditional"
      />
    </div>

    <div class="form-group">
      <vs-input
        label="Phần trăm tiền thưởng trên tổng số"
        type="number"
        min="0"
        v-model="config.precentPrize"
      />
    </div>

    <br />
    <vs-button @click="activePopupAddUser = true"
      >Thêm thủ công người chiến thắng</vs-button
    >
    <vs-table
      ref="table"
      pagination
      :max-items="15"
      search
      :data="streakChallengeList"
    >
      <template slot="thead">
        <vs-th>Email</vs-th>
        <vs-th>Nick name</vs-th>
        <vs-th>Số lệnh thua hoặc thắng liên tiếp</vs-th>
        <vs-th>Số tiền trúng</vs-th>
        <vs-th>Phiên</vs-th>
        <vs-th>Thêm bởi admin</vs-th>
        <vs-th>Kết quả phiên</vs-th>
        <vs-th>Thời gian</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" :key="tr.id" v-for="tr in data">
            <vs-td>
              <p class="user-name font-medium truncate">{{ tr.email }}</p>
            </vs-td>
            <vs-td>
              <p class="user-name font-medium truncate">{{ tr.nick_name }}</p>
            </vs-td>
            <vs-td>
              <p class="user-name font-medium truncate">{{ tr.count }}</p>
            </vs-td>
            <vs-td>
              <p class="user-name font-medium truncate">${{ tr.prize }}</p>
            </vs-td>
            <vs-td>
              <p class="user-name font-medium truncate">{{ tr.session }}</p>
            </vs-td>
            <vs-td>
              <p class="user-name font-medium truncate">
                {{ tr.isAddByAdmin ? "Yes" : "" }}
              </p>
            </vs-td>
            <vs-td>
              <p class="user-name font-medium truncate">
                {{ tr.isWin ? "Thắng" : "Thua" }}
              </p>
            </vs-td>
            <vs-td>
              <p class="user-name font-medium truncate">{{ tr.created_at }}</p>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>

    <div class="right">
      <vs-button
        icon-pack="feather"
        icon="icon-arrow-right"
        icon-after
        color="primary"
        type="border"
        @click="submit"
      >
        Lưu
      </vs-button>
    </div>

    <vs-popup
      title="Thêm mới streak challenge"
      :active.sync="activePopupAddUser"
    >
      <div class="form-group">
        <vs-input label="Email" v-model="dataAddUser.email" />
        <vs-input label="Nick name" v-model="dataAddUser.nick_name" />
        <vs-input
          label="Số lần thắng / thua liên tiếp"
          type="number"
          min="0"
          v-model="dataAddUser.count"
        />
        <br />
        <vs-checkbox v-model="dataAddUser.isWin">Thắng liên tục?</vs-checkbox>
      </div>

      <div class="right">
        <vs-button
          icon-pack="feather"
          icon="icon-arrow-right"
          icon-after
          color="primary"
          type="border"
          @click="submitAddUser"
        >
          Thêm người dùng
        </vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      users: [],
      config: {
        user: null,
        userMoney: 0,
        userDate: new Date().toDateString(),
        range: [11000, 50000],
        consecutive: 9, // số lệnh win liên tiếp
        moneyConditional: 10, // đánh số tiền >= số này
        precentPrize: 0.05, // phần trăm thưởng
        isWin: false,
      },
      streakChallengeList: [],
      activePopupAddUser: false,
      dataAddUser: {
        email: "",
        nick_name: "",
        count: 9,
        isWin: false,
      },
      formatDate: "yyyy-MM-dd",
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    async submit() {
      const { data } = await AuthenticationService.createStreakChallenge(
        this.config
      );

      if (data.success) {
        this.$vs.notify({
          title: "Thành công",
          text: "Lưu thay đổi thành công",
          color: "success",
          position: "top-right",
        });
      } else {
        this.$vs.notify({
          title: "Thất bại",
          text: data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },
    async submitAddUser() {
      const { data } = await AuthenticationService.addUserStreakChallenge(
        this.dataAddUser
      );

      if (data.success) {
        this.streakChallengeList.push(data.data[0]);
        this.activePopupAddUser = false;
        this.$vs.notify({
          title: "Thành công",
          text: "Thêm user thành công",
          color: "success",
          position: "top-right",
        });
      } else {
        this.$vs.notify({
          title: "Thất bại",
          text: data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },
  },
  mounted() {
    AuthenticationService.getAllMember().then((resp) => {
      if (resp.data.success == 4) {
        localStorage.removeItem("token");
        this.$router.push("/pages/login").catch(() => {});
      } else {
        this.users = resp.data.data;
      }
    });
    AuthenticationService.getUserStreakChallenge().then((resp) => {
      if (resp.data.success == 4) {
        localStorage.removeItem("token");
        this.$router.push("/pages/login").catch(() => {});
      } else {
        this.streakChallengeList = resp.data.data;
      }
    });
    AuthenticationService.getStreakChallenge().then((resp) => {
      if (resp.data.success == 4) {
        localStorage.removeItem("token");
        this.$router.push("/pages/login").catch(() => {});
      } else {
        this.config = resp.data.data;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-top: 20px;
}

.dola {
  color: rgb(39, 237, 82);
}

.right {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.startDate {
  width: 200px;
}
</style>
