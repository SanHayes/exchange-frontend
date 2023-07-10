<template>
  <div class="wrapper" @click="clicked">
    <div class="content" :style="{ backgroundImage: `url('${bg}')` }">
      <div class="title">
        <svg
          data-v-af39567a=""
          xmlns="http://www.w3.org/2000/svg"
          width="47"
          height="22"
          viewBox="0 0 35.734 16.158"
        >
          <g
            data-v-af39567a=""
            id="_1246264"
            data-name="1246264"
            transform="translate(8.061 -0.001)"
          >
            <path
              data-v-af39567a=""
              id="Union_3"
              data-name="Union 3"
              d="M8270.137-6214.507c-1.338,0-2.43-.781-2.459-1.756h0a.26.26,0,0,1-.006-.039v-12.568c0-.992,1.1-1.794,2.465-1.794h30.8c1.363,0,2.466.8,2.466,1.794v12.568c0,.992-1.1,1.8-2.466,1.8Z"
              transform="translate(-8275.734 6230.666)"
              fill="#fd4764"
            ></path>
            <g
              data-v-af39567a=""
              id="Group_21085"
              data-name="Group 21085"
              transform="translate(1.945 4.364)"
            >
              <path
                data-v-af39567a=""
                id="Path_34926"
                data-name="Path 34926"
                d="M60.62,78.408H57.027V72.4A.529.529,0,0,0,56,72.4v6.408a.468.468,0,0,0,.513.4H60.62a.413.413,0,1,0,0-.8Zm0,0"
                transform="translate(-56 -71.999)"
                fill="#f1f2f2"
                stroke="#fff"
                stroke-width="0.2"
              ></path>
              <path
                data-v-af39567a=""
                id="Path_34927"
                data-name="Path 34927"
                d="M332.62,72.8a.413.413,0,1,0,0-.8h-4.106a.468.468,0,0,0-.513.4v6.408a.468.468,0,0,0,.513.4h4.106a.413.413,0,1,0,0-.8h-3.593v-2.4h2.567a.413.413,0,1,0,0-.8h-2.567V72.8Zm0,0"
                transform="translate(-310.547 -71.999)"
                fill="#f1f2f2"
                stroke="#fff"
                stroke-width="0.2"
              ></path>
              <path
                data-v-af39567a=""
                id="Path_34928"
                data-name="Path 34928"
                d="M160.513,72a.468.468,0,0,0-.513.4v6.408a.529.529,0,0,0,1.027,0V72.4A.468.468,0,0,0,160.513,72Zm0,0"
                transform="translate(-153.327 -71.999)"
                fill="#f1f2f2"
                stroke="#fff"
                stroke-width="0.2"
              ></path>
              <path
                data-v-af39567a=""
                id="Path_34929"
                data-name="Path 34929"
                d="M206.33,72.015a.648.648,0,0,0-.393.01.461.461,0,0,0-.268.224l-2.555,5.317-2.12-5.3a.552.552,0,0,0-.644-.262c-.271.066-.421.291-.336.5l2.567,6.408a.512.512,0,0,0,.476.28h.014a.525.525,0,0,0,.481-.26l3.08-6.408a.321.321,0,0,0-.013-.307A.483.483,0,0,0,206.33,72.015Zm0,0"
                transform="translate(-190.751 -71.99)"
                fill="#f1f2f2"
                stroke="#fff"
                stroke-width="0.2"
              ></path>
            </g>
            <circle
              data-v-af39567a=""
              id="Ellipse_2017"
              data-name="Ellipse 2017"
              cx="2.5"
              cy="2.5"
              r="2.5"
              transform="translate(-6.327 5.334)"
              fill="#fff"
            ></circle>
          </g>
        </svg>

        <div class="name">
          {{ data.name }}
        </div>
      </div>

      <div class="title-time-countdown">
        Thời gian còn lại
      </div>

      <ul class="time-countdown" v-if="isShowTime">
        <li>
          <p>{{ day }}</p>
          <p>Days</p>
        </li>
        <li>
          <p>{{ hour }}</p>
          <p>Hours</p>
        </li>
        <li>
          <p>{{ min }}</p>
          <p>Mins</p>
        </li>
        <li>
          <p>{{ sec }}</p>
          <p>Secs</p>
        </li>
      </ul>

      <ul class="time-countdown disabled-time" v-else>
        <li>Đã hết hạn</li>
      </ul>

      <div class="prize">
        <div class="left">
          <div class="title">${{formatPrice(data.totalRewards.split(',').reduce((prev, curr) => +prev + +curr, 0), 2) }}</div>
          <div class="des">Tổng phần thưởng</div>
        </div>
        <div class="right">
          <div class="title">{{ data.type | getTypeChampion }}</div>
          <div class="des">Loại giải đấu</div>
        </div>
      </div>
      <div
        class="boxType"
        :style="{ background: data.type === 'klgd' ? '#1894f0' : '#fd157d' }"
      >
        <span>{{ data.type === "klgd" ? "trading" : "agency" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import config from '@/config';

export default {
  props: {
    data: {},
  },
  data() {
    return {
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
      interval: null,
      dm: config.domain,
      isShowTime: true,
    }
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
    formatPrice(value, minimum) {
      var formatter = new Intl.NumberFormat("en-US", {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum
      });
      return formatter.format(value);
    },
  },
  filters: {
    getTypeChampion(val) {
      switch (val) {
        case 'klgd':
          return 'KLGD';

        case 'hh':
          return 'HOA HỒNG';
        default:
          break;
      }
    }
  },
  computed: {
    bg() {
      return `${this.dm}/api/auth/photo/champions/${this.data.background}`;
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      const d = moment.duration(moment(this.data.dateEnd).diff(moment()));
      if (d.milliseconds() < 0) {
        this.isShowTime = false;
        clearInterval(this.interval);
      }
      this.day = d.days();
      this.hour = d.hours();
      this.min = d.minutes();
      this.sec = d.seconds();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 1.5rem !important;
}

@media (min-width: 2061px) {
  .wrapper {
    flex: 0 0 20%;
    max-width: 20%;
  }
}

@media (min-width: 1601px) and (max-width: 2060px) {
  .wrapper {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

@media (min-width: 1301px) and (max-width: 1600px) {
  .wrapper {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}

@media (min-width: 1024px) and (max-width: 1300px) {
  .wrapper {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

.content {
  background: url("~@/assets/images/sky/championship/bg_challenge_1.png");
  margin-bottom: 0 !important;
  padding: 15px 20px;
  width: auto;
  height: 225px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  border-radius: 9px;
  overflow: hidden;
  margin-bottom: 30px;
  cursor: pointer;
  text-align: left !important;
  position: relative !important;
}

.title {
  display: flex;
  align-items: center;
  svg {
    margin-right: 1rem;
  }
  .name {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    text-transform: capitalize;
  }
}

.boxType {
  background: #1894f0;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 700;
  padding: 1px 25px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5);
  transform: translateX(23%) translateY(68%) rotate(45deg);
  span {
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase !important;
  }
}

.title-time-countdown {
  width: 100%;
  text-align: center;
  font-size: 14px;
  display: inline-block;
  color: #828385;
  margin-bottom: 5px;
  margin-top: 15px;
}

.time-countdown {
  display: flex;
  justify-content: center;
  background-color: hsla(0, 0%, 100%, 0.18);
  border-radius: 5px;
  padding: 4px 0;
  max-width: 375px;
  margin: 0 auto;
  list-style: none;
  li {
    margin-left: 0;
    &:not(:last-child) {
      margin-right: 30px;
    }
    display: inline-block;
    margin: 0 8px;
    text-align: center;
    position: relative;
    p {
      &:first-child {
        font-size: 21px;
        font-weight: 700;
        color: #fff;
        line-height: 1.4;
        margin-bottom: 0;
        margin: 0;
      }

      &:last-child {
        font-size: 12px;
        color: hsla(0, 0%, 100%, 0.5);
        text-transform: capitalize;
        margin: 0;
      }
    }
  }
}

.disabled-time li {
  color: white;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.prize {
  margin-top: 20px;
  width: 100%;
  display: flex;

  .left,
  .right {
    width: 45%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
  }

  .left {
    .title {
      font-size: 21px;
      font-weight: 700;
      color: #31baa0;
    }

    .des {
      font-size: 11px;
      color: #848382;
    }
  }

  .right {
    text-align: right;
    .title {
      font-size: 20px;
      color: #fff;
    }

    .des {
      font-size: 11px;
      color: #848382;
    }
  }
}
</style>
