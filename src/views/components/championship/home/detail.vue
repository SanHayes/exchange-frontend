<template>
  <div>
    <section class="card" :style="{ backgroundImage: `url('${bg}')` }">
      <div class="container">
        <div class="title">
          <button class="btn" @click="onBack()">
            <svg
              data-v-2f4ce6a2=""
              xmlns="http://www.w3.org/2000/svg"
              width="16.003"
              height="12.059"
              viewBox="0 0 16.003 12.059"
            >
              <g
                data-v-2f4ce6a2=""
                id="rounded-head-arrow"
                transform="translate(16.003 12.059) rotate(180)"
              >
                <path
                  data-v-2f4ce6a2=""
                  id="Path_29622"
                  data-name="Path 29622"
                  d="M15.5,4.945l-5-4.5a1.5,1.5,0,1,0-2,2.229l2.09,1.885H1.5a1.5,1.5,0,1,0,0,3h9.092L8.5,9.444a1.5,1.5,0,1,0,2.006,2.23l5-4.5a1.5,1.5,0,0,0,0-2.23Z"
                  fill="#fff"
                ></path>
              </g>
            </svg>
            Trở lại
          </button>
          <div class="name">{{ champion.name }}</div>
        </div>

        <div class="count-down">
          Thời gian còn lại
        </div>

        <div class="content">
          <div class="left">
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
          </div>
          <div class="total">
            <div class="title">{{ formatUSD(champion.totalRewards.split(',').reduce((prev, curr) => +prev + +curr, 0)) }}</div>
            <div class="des">Tổng phần thưởng</div>
          </div>
          <div class="type">
            <div class="title">{{ champion.type | getTypeChampion }}</div>
            <div class="des">Loại giải đấu</div>
          </div>
        </div>
      </div>
    </section>

    <section class="container" id="last-content">
      <ul class="tab">
        <li
          @click="changeTabActive(0)"
          :class="tabActive === 0 ? 'active' : ''"
        >
          Thông tin
        </li>
        <li
          @click="changeTabActive(1)"
          :class="tabActive === 1 ? 'active' : ''"
        >
          Bảng xếp hạng
        </li>
      </ul>

      <div class="wrapper-tab-content">
        <div v-if="tabActive === 0">
          <div class="wrapper-time">
            <div class="left-content">
              <div>Thời gian bắt đầu</div>
              <div class="divider" />
              <div>Thời gian kết thúc</div>
            </div>
            <div class="ml-auto">
              <div>{{ champion.dateStart | formatDate }}</div>
              <div class="divider" />
              <div>{{ champion.dateEnd | formatDate }}</div>
            </div>
          </div>

          <pre class="info" v-html="champion.content"></pre>
        </div>

        <div v-if="tabActive === 1">
          <div class="update" @click="updateChampion">
            <svg
              data-v-2f4ce6a2=""
              xmlns="http://www.w3.org/2000/svg"
              width="16.258"
              height="15.382"
              viewBox="0 0 16.258 15.382"
              class="mr-2"
            >
              <g
                data-v-2f4ce6a2=""
                id="undo-29"
                transform="translate(-0.2 -0.9)"
              >
                <path
                  data-v-2f4ce6a2=""
                  id="Path_34973"
                  data-name="Path 34973"
                  d="M2.64,12.678A7.685,7.685,0,0,1,1.1,9.2l2.167-.364a5.472,5.472,0,0,0,1.1,2.483Z"
                  transform="translate(0.088 0.781)"
                  fill="#fff"
                ></path>
                <path
                  data-v-2f4ce6a2=""
                  id="Path_34974"
                  data-name="Path 34974"
                  d="M7.127,15.186A7.706,7.706,0,0,1,3.858,13.8l1.3-1.77a5.483,5.483,0,0,0,2.331.986Z"
                  transform="translate(0.36 1.096)"
                  fill="#fff"
                ></path>
                <path
                  data-v-2f4ce6a2=""
                  id="Path_34975"
                  data-name="Path 34975"
                  d="M9.2,15.192l-.363-2.167a5.481,5.481,0,0,0,2.427-1.059L12.6,13.708A7.686,7.686,0,0,1,9.2,15.192Z"
                  transform="translate(0.85 1.09)"
                  fill="#fff"
                ></path>
                <path
                  data-v-2f4ce6a2=""
                  id="Path_34976"
                  data-name="Path 34976"
                  d="M8.768,1.01A7.718,7.718,0,0,0,3.333,3.264L.969.9.2,7.93l7.03-.769L4.885,4.816A5.492,5.492,0,0,1,14.261,8.7a5.447,5.447,0,0,1-1.04,3.216L15,13.2A7.691,7.691,0,0,0,8.768,1.01Z"
                  transform="translate(0 0)"
                  fill="#fff"
                ></path>
              </g>
            </svg>
            <span>Cập nhật</span>
          </div>

          <div class="table-rank">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Biệt Danh</th>
                  <th>{{ champion.type === 'klgd' ? 'Tổng KLGD' : 'Hoa hồng' }}</th>
                  <th>Phần Thưởng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, ind) in champion.topUser" :key="item.email">
                  <td>
                    <img :src="imagesRank[ind]" />
                  </td>
                  <td>{{ item.email }}</td>
                  <td>{{ formatUSD(item.trade) }}</td>
                  <td class="price">{{ formatUSD(reward[ind]) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import config from '@/config';

export default {
  props: {
    champion: {}
  },
  data() {
    return {
      tabActive: 0,
      reward: this.champion.totalRewards.split(','),
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
      interval: null,
      imagesRank: [
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3Ni45NiIgaGVpZ2h0PSI4MC40OTIiIHZpZXdCb3g9IjAgMCA3Ni45NiA4MC40OTIiPgogIDxnIGlkPSJHb2xkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAzKSI+CiAgICA8ZyBpZD0iYXdhcmQtYmFkZ2UtbWVkYWwtcHJpemUtc3BvcnQtd2luLXdpbm5lci1pY29uLTE5NTU1OSI+CiAgICAgIDxnIGlkPSJfZDQ0YTkwZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjE5NyAwLjAwMSkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTU4IiBkPSJNMCw0LjZBNDIuMzUsNDIuMzUsMCwwLDEsMTcuOCwwYy0zLjEsNi4yLTYuMywxMi4zLTkuNSwxOC41LS4yLjQtLjQuNy0uNiwxLjFMMy4yLDEwLjlDMi4xLDguOCwxLjEsNi43LDAsNC42WiIgZmlsbD0iI2Q0NGE5MCIvPgogICAgICA8L2c+CiAgICAgIDxnIGlkPSJfYTcyOTczZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2Ljg3OCkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTU5IiBkPSJNMTAuMSwwSDExbC42LDEuMkM4LjQsNy4zLDUuMywxMy41LDIuMSwxOS43SDB2LS4xYTUuOTczLDUuOTczLDAsMCwwLC42LTEuMUMzLjgsMTIuMyw3LDYuMiwxMC4xLDBaIiBmaWxsPSIjYTcyOTczIi8+CiAgICAgIDwvZz4KICAgICAgPGcgaWQ9Il8zODI2NzNmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAzLjU2MikiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTYwIiBkPSJNMzcuOSwwSDM5YTUuMzU5LDUuMzU5LDAsMCwwLS41LDEuMUMzOC4zLjcsMzguMS40LDM3LjksMFoiIGZpbGw9IiNmZWE4MjkiLz4KICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk2MSIgZD0iTTUuOCwxOC4xQTM4Ljg0NywzOC44NDcsMCwwLDEsMjAuOSw0LjJjMSwxLjksMS45LDMuOCwyLjksNS43YTMzLjM1OSwzMy4zNTksMCwwLDAtOS43LDcuOEEzMi4wMDgsMzIuMDA4LDAsMCwwLDQ4LjQsNjguOWEzMi4wODQsMzIuMDg0LDAsMCwwLDQuOC01OWMxLTEuOSwyLTMuOCwyLjktNS43QTM4LjQ4NiwzOC40ODYsMCwxLDEsNC4zLDIwLjhDNC43LDE5LjksNS4zLDE5LDUuOCwxOC4xWiIgZmlsbD0iIzEyMDIzZSIvPgogICAgICA8L2c+CiAgICAgIDxnIGlkPSJfZjE1YTllZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3Ljk2MSAwLjAwNSkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTYyIiBkPSJNMTEuMSwwQTQyLDQyLDAsMCwxLDI5LjgsNC42di4xYy0xLjEsMi4xLTIuMSw0LjItMy4yLDYuMi0xLjUsMi45LTMsNS44LTQuNSw4LjgtLjQuNy0uNywxLjQtMSwySC4xYy4zLS43LjctMS40LDEtMkM0LjMsMTMuNSw3LjQsNy40LDEwLjYsMS4yQTYuMTE3LDYuMTE3LDAsMCwxLDExLjEsMFoiIGZpbGw9IiNmMTVhOWUiLz4KICAgICAgPC9nPgogICAgICA8ZyBpZD0iXzQ3MzA4MGZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjQ0IDEwLjg2OCkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTYzIiBkPSJNMTksMGw0LjUsOC43di4xQTIuOTUxLDIuOTUxLDAsMCwwLDIxLDExLjlhMi43NzIsMi43NzIsMCwwLDAsMi4xLDIuNHY1YTIzLjQsMjMuNCwwLDAsMC04LjMsMzIuMSwyMy44OSwyMy44OSwwLDAsMCw2LjYsNy4yQTIzLjQzNiwyMy40MzYsMCwwLDAsNTQuMSwyNS45YTIzLjg5LDIzLjg5LDAsMCwwLTcuMi02LjZWMTQuMmEyLjY3NywyLjY3NywwLDAsMCwyLTIuNywyLjcwNSwyLjcwNSwwLDAsMC0yLjQtMi43QzQ4LDUuOSw0OS41LDMsNTEsMEEzNS4wNDIsMzUuMDQyLDAsMSwxLDMuOSwxNS4xLDMzLDMzLDAsMCwxLDguMyw4LjUsMzUuMywzNS4zLDAsMCwxLDE5LDBaIiBmaWxsPSIjNDczMDgwIi8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NjQiIGQ9Ik0yMy4zLDExLjFjLjItLjIuNS0uMS44LS4xSDQ2LjJjLjgtLjEuOCwxLjMsMCwxLjNIMjMuN2EuNjg0LjY4NCwwLDAsMS0uNy0uN0EyLjE4NiwyLjE4NiwwLDAsMSwyMy4zLDExLjFaIiBmaWxsPSIjNDczMDgwIi8+CiAgICAgIDwvZz4KICAgICAgPHBhdGggaWQ9IlVuaW9uXzYiIGQ9Ik0zMS42LDY0LjdhMTUuNzY3LDE1Ljc2NywwLDAsMS03LjQtMjEuMSwxNC43NjYsMTQuNzY2LDAsMCwxLDMuMS00LjMsMTYuMTI1LDE2LjEyNSwwLDAsMSw5LTQuNUExNS43NzcsMTUuNzc3LDAsMCwxLDQ5LjksNjEuNGExNS41MjQsMTUuNTI0LDAsMCwxLTguMiw0LjUsMTYuMjc5LDE2LjI3OSwwLDAsMS0zLjEuM0ExNC45NDgsMTQuOTQ4LDAsMCwxLDMxLjYsNjQuN1ptNi44LTguNVpNMzUuMiw0Ni4xYy0xLjguMy0xLjcuMy4xLDBDMzYsNDQuNCwzNiw0NC40LDM1LjIsNDYuMVoiIGZpbGw9IiNmZmRlMzkiLz4KICAgICAgPGcgaWQ9Il9mZmRlMzlmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUgMTkuNjc1KSI+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NjUiIGQ9Ik0xMS45LDBIMTRjLS4zLjctLjcsMS40LTEsMkgzNGMuNC0uNy43LTEuNCwxLTJhMi43OCwyLjc4LDAsMCwxLDIuNCwyLjcsMi43LDIuNywwLDAsMS0yLDIuNywyMi42LDIyLjYsMCwwLDEtMi42LjFIMTIuNmEzLjQsMy40LDAsMCwxLTEtLjFBMi43NzQsMi43NzQsMCwwLDEsOS42LDJhMi42NzYsMi42NzYsMCwwLDEsMi4zLTJtLS4xLDIuMmEuNzU4Ljc1OCwwLDAsMC0uMSwxYy4xLjIuMy4yLjUuMkgzNC43Yy44LDAsLjgtMS40LDAtMS4zSDEyLjZjLS4zLDAtLjYtLjEtLjguMVoiIGZpbGw9IiNmZmRlMzkiLz4KICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk2NiIgZD0iTTIxLjMsNy40YTIzLjQwOCwyMy40MDgsMCwxLDEtOS43LDMuMSwyMy40NDIsMjMuNDQyLDAsMCwxLDkuNy0zLjFNMTEsMTYuNEExOS4wMjksMTkuMDI5LDAsMCwwLDYuMSwzOC42YTQuMTc5LDQuMTc5LDAsMCwwLC40LDEsMTguNjY4LDE4LjY2OCwwLDAsMCwzLjMsNC41LDE4Ljk4NCwxOC45ODQsMCwwLDAsMjYuOS4zLDE4LjUsMTguNSwwLDAsMCw1LjYtMTEuN0ExOS4yNzUsMTkuMjc1LDAsMCwwLDQwLDIxLjRhMi42NTEsMi42NTEsMCwwLDAtLjUtLjYsMTguNzY5LDE4Ljc2OSwwLDAsMC0yNi02LjNBMTUsMTUsMCwwLDAsMTEsMTYuNFoiIGZpbGw9IiNmZmRlMzkiLz4KICAgICAgPC9nPgogICAgICA8ZyBpZD0iX2Y5YTc0ZWZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOS40IDI1LjE1NCkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTY4IiBkPSJNNy4yLDBjLjMsMCwuNy4xLDEsLjFIMjguNEEyMi42LDIyLjYsMCwwLDAsMzEsMFYuOEg3LjJaIiBmaWxsPSIjZjlhNzRlIi8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NjkiIGQ9Ik02LjYsMTAuOWExOSwxOSwwLDAsMSwyNi44LDEuOSwyMy40ODEsMjMuNDgxLDAsMCwxLDEuOSwyLjVjLS4yLS4yLS41LS40LS43LS42QTE4LjU5NCwxOC41OTQsMCwwLDAsMjMuNyw3LjksMTguOTYxLDE4Ljk2MSwwLDAsMCwxLjEsMjIuNmExNy41NjEsMTcuNTYxLDAsMCwwLDAsNy45Yy4yLjkuNSwxLjcuNiwyLjVBMTguODU3LDE4Ljg1NywwLDAsMSw2LjYsMTAuOVoiIGZpbGw9IiNmOWE3NGUiLz4KICAgICAgPC9nPgogICAgICA8ZyBpZD0iX2ZlYzYzMmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wNDIgMjUuOTE1KSI+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NzAiIGQ9Ik02LjUsMEgzMC4zVjQuM0EyMy4xMzEsMjMuMTMxLDAsMCwwLDE2LjIsMS4yLDI0LjQ2OSwyNC40NjksMCwwLDAsNi40LDQuM0M2LjUsMi45LDYuNSwxLjQsNi41LDBaIiBmaWxsPSIjZmVjNjMyIi8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NzEiIGQ9Ik0xMS45LDguMUExOS4xNTcsMTkuMTU3LDAsMCwxLDIzLDcuMWExOC41OTQsMTguNTk0LDAsMCwxLDEwLjksNi44LDQuMzQ5LDQuMzQ5LDAsMCwwLC43LjYsMi42NTEsMi42NTEsMCwwLDEsLjUuNiwxOS40MzIsMTkuNDMyLDAsMCwxLDIuMywxMS4zLDE4Ljk2NywxOC45NjcsMCwwLDEtMjAuOCwxN0ExOC43NTYsMTguNzU2LDAsMCwxLDQuOCwzNy44YTIwLjg1NSwyMC44NTUsMCwwLDEtMy4zLTQuNSwzLDMsMCwwLDEtLjQtMSwxOC4yODgsMTguMjg4LDAsMCwwLS42LTIuNSwxOC44LDE4LjgsMCwwLDEsLjktMTFBMTkuMDMsMTkuMDMsMCwwLDEsMTEuOSw4LjFtNC4zLjdhMTYuNDUxLDE2LjQ1MSwwLDAsMC05LDQuNSwxNS42OTMsMTUuNjkzLDAsMCwwLDAsMjIuMywxNi4yMjksMTYuMjI5LDAsMCwwLDQuMywzLjEsMTYuMzc4LDE2LjM3OCwwLDAsMCwxMCwxLjNBMTUuODYxLDE1Ljg2MSwwLDAsMCwzMy45LDIxLjNhMTUuNjc5LDE1LjY3OSwwLDAsMC05LTExLjMsMTcuMTIzLDE3LjEyMywwLDAsMC04LjctMS4yWiIgZmlsbD0iI2ZlYzYzMiIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgICA8ZyBpZD0iR3JvdXBfMjExNzciIGRhdGEtbmFtZT0iR3JvdXAgMjExNzciPgogICAgICA8cGF0aCBpZD0iUGF0aF8zNDk3OCIgZGF0YS1uYW1lPSJQYXRoIDM0OTc4IiBkPSJNMzIuNiw0NS4xYTEwLjA5MiwxMC4wOTIsMCwwLDAsMS41LS43LDExLjkwNSwxMS45MDUsMCwwLDAsMS41LS45LDcuMSw3LjEsMCwwLDAsMS40LTEsMTMuMDcsMTMuMDcsMCwwLDAsMS4yLTEuMWgyLjZWNTguN0gzNy4xVjQ2LjRjLS41LjMtMS4xLjYtMS43LjlhMTMuMzU1LDEzLjM1NSwwLDAsMS0xLjguN1oiIGZpbGw9IiNmZmYiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=",
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3Ni40OCIgaGVpZ2h0PSI4MC4yOTciIHZpZXdCb3g9IjAgMCA3Ni40OCA4MC4yOTciPgogIDxnIGlkPSJHcm91cF8yMTE3OSIgZGF0YS1uYW1lPSJHcm91cCAyMTE3OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIyOTcgLTQyNjkpIj4KICAgIDxjaXJjbGUgaWQ9IkVsbGlwc2VfMjA0NyIgZGF0YS1uYW1lPSJFbGxpcHNlIDIwNDciIGN4PSIyOCIgY3k9IjI4IiByPSIyOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMjg2IDQyOTEpIiBmaWxsPSIjZTRlNGU0Ii8+CiAgICA8ZyBpZD0iU2lsdmVyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTIyOTYuOTIyIDQyNjkpIj4KICAgICAgPGcgaWQ9ImF3YXJkLWJhZGdlLW1lZGFsLXByaXplLXNwb3J0LXdpbi13aW5uZXItaWNvbi0xOTU1NTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAxKSI+CiAgICAgICAgPGcgaWQ9Il9kNDRhOTBmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkuMjM1IDAuMDAxKSI+CiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk0MyIgZD0iTTAsNC41NDZBMzkuNzU0LDM5Ljc1NCwwLDAsMSwxNy43MzksMGMtMy4xLDYuMjA5LTYuMzIsMTIuMzA3LTkuNDI0LDE4LjQtLjIyMi4zMzMtLjQ0My43NzYtLjY2NSwxLjEwOS0xLjQ0MS0yLjg4My0yLjk5My01Ljc2NS00LjQzNS04LjY0OEMyLjEwNyw4Ljc1OSwxLjEwOSw2LjY1MiwwLDQuNTQ2WiIgZmlsbD0iI2Q0NGE5MCIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iX2E3Mjk3M2ZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi44ODMpIj4KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTQ0IiBkPSJNMTAuMDg5LDBoLjg4N2E1Ljk0Miw1Ljk0MiwwLDAsMSwuNTU0LDEuMjJjLTMuMSw2LjEtNi4zMiwxMi4yLTkuNDI0LDE4LjRIMHYtLjExMWMuMjIyLS4zMzMuNDQzLS43NzYuNjY1LTEuMTA5QzMuNzcsMTIuMzA3LDYuOTg1LDYuMjA5LDEwLjA4OSwwWiIgZmlsbD0iI2E3Mjk3MyIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iXzM4MjY3M2ZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDAuMDAzKSI+CiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk0NSIgZD0iTTM0LjEsMGgxLjIxOWE1LjkzNyw1LjkzNywwLDAsMC0uNTUzLDEuMjE5QzM0LjU0My43NzUsMzQuMzIyLjQ0MywzNC4xLDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjY4MikiIGZpbGw9IiMzODI2NzMiLz4KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTQ2IiBkPSJNNS43NiwyMC45NDZBMzguNiwzOC42LDAsMCwxLDIwLjgyNSw3LjFjMSwxLjg4MywxLjg4MywzLjc2NiwyLjg4LDUuNjQ5QTM0LjYzNiwzNC42MzYsMCwwLDAsMTMuOTU4LDIwLjUsMzIuMDM0LDMyLjAzNCwwLDAsMCw0OC4yOTQsNzEuNjc2LDMyLjQsMzIuNCwwLDAsMCw2OS4zNCw0OS40MTIsMzEuODU1LDMxLjg1NSwwLDAsMCw1My4wNTYsMTIuOTdjMS0xLjg4MywxLjE3My0zLjg3NywyLjA1Ni01Ljg3QzczLjg3MywxNi44NjMsODIsNDAuMDkxLDcyLjI1Niw1OC44NjFBMzguMzE5LDM4LjMxOSwwLDAsMSw0LjIxLDIzLjZDNC43NjQsMjIuNzE4LDUuMjA3LDIxLjgzMiw1Ljc2LDIwLjk0NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDEgMC43NjUpIiBmaWxsPSIjMTIwMjNlIi8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSJfZjE1YTllZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3Ljk2IDAuMDA0KSI+CiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk0NyIgZD0iTTExLjA4NywwQTQxLjE1NSw0MS4xNTUsMCwwLDEsMjkuNiw0LjU0NmgwYy0xLjEwOSwyLjEwNy0yLjEwNyw0LjEtMy4yMTUsNi4yMDktMS40NDEsMi44ODMtMi45OTMsNS43NjUtNC40MzUsOC43NTlsLTEsMkgwbDEtMmMzLjIxNS02LjEsNi4zMi0xMi4yLDkuNTM1LTE4LjI5NEE1Ljk0Miw1Ljk0MiwwLDAsMSwxMS4wODcsMFoiIGZpbGw9IiNmMTVhOWUiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgaWQ9Il80NzMwODBmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy40OTkgMTAuNzExKSI+CiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk0OCIgZD0iTTE4Ljg1Mi4wMTFjMS40NDEsMi44ODMsMi45OTMsNS43NjUsNC40MzUsOC42NDhWOC43N2EyLjY1OCwyLjY1OCwwLDAsMC0yLjQzOSwyLjk5M0EyLjk3OSwyLjk3OSwwLDAsMCwyMi45NTUsMTQuMnY1LjFBMjMuMzQ4LDIzLjM0OCwwLDAsMCwxNC42NCw1MS4yMzFhMjUuMjg1LDI1LjI4NSwwLDAsMCw2LjU0MSw3LjIwN0EyMy4zNzUsMjMuMzc1LDAsMSwwLDQ2LjY4MSwxOS4zVjE0LjJhMi42NSwyLjY1LDAsMCwwLDItMi43NzIsMi44NDMsMi44NDMsMCwwLDAtMi40MzktMi43NzJjMS40MzctMi44OCwyLjk4OS01Ljc2Myw0LjQzLTguNzU2QTM0Ljk2LDM0Ljk2LDAsMSwxLDMuODg1LDE1LjA4NywzMi4zNzQsMzIuMzc0LDAsMCwxLDguMzIsOC41NDgsMzQuMDQ3LDM0LjA0NywwLDAsMSwxOC44NTIuMDExWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wNDIgMC4xKSIgZmlsbD0iIzQ3MzA4MCIvPgogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NDkiIGQ9Ik0yMS4wMzMsOS45MTRjLjIyMi0uMjIyLjU1NC0uMTExLjc3Ni0uMTExSDQzLjc2MWMuNzc2LS4xMTEuODg3LDEuMzMsMCwxLjMzaC0yMi40YS43MTUuNzE1LDAsMCwxLS42NjUtLjY2NUMyMC44MTEsMTAuMjQ2LDIwLjgxMSwxMC4wMjQsMjEuMDMzLDkuOTE0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4yOTYgMS4xNzMpIiBmaWxsPSIjNDczMDgwIi8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSJfZmZkZTM5ZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjA4IDE5LjU5MSkiPgogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NTAiIGQ9Ik0xMC45NDYsMGgyLjEwN2wtMSwySDMzLjAwOWwxLTJhMi43NiwyLjc2LDAsMCwxLDIuMzI4LDIuNzcyLDIuODYxLDIuODYxLDAsMCwxLTIsMi43NzJIMTEuNjExYTMuMDY5LDMuMDY5LDAsMCwxLTEtLjExMSwyLjc3NCwyLjc3NCwwLDAsMS0yLjEtMy4zMjZBMi45NzksMi45NzksMCwwLDEsMTAuOTQ2LDBtLS4xMTEsMi4yMTdhLjcuNywwLDAsMC0uMTExLDEsLjg0Ny44NDcsMCwwLDAsLjU1NC4yMjJoMjIuNGMuNzc2LDAsLjc3Ni0xLjMzLDAtMS4zM0gxMS43MjJjLS4zMzMsMC0uNjY1LS4xMTEtLjg4Ny4xMTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjg5NCkiIGZpbGw9IiNlMmUyZTIiLz4KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTUxIiBkPSJNMjEuMTc0LDYuNjA5YTIzLjYyMiwyMy42MjIsMCwxLDEtOS42NDYsMy4yMTUsMjMuMTQsMjMuMTQsMCwwLDEsOS42NDYtMy4yMTVtLTEwLjIsOC45OGExOS40MjgsMTkuNDI4LDAsMCwwLTYuNDMsMTEuNzUyQTE4Ljc1OCwxOC43NTgsMCwwLDAsNS45ODUsMzcuNzYzYTMuOTM4LDMuOTM4LDAsMCwwLC40NDMsMSwxOS4xODIsMTkuMTgyLDAsMCwwLDMuMzI2LDQuNTQ2LDE4LjkzOCwxOC45MzgsMCwwLDAsMjYuODMxLjMzM0ExOC43MzYsMTguNzM2LDAsMCwwLDQyLjIzOSwzMmEyMC4wNzUsMjAuMDc1LDAsMCwwLTIuMzI4LTExLjMwOSwxLjEwNywxLjEwNywwLDAsMC0uNDQzLS41NTQsMTguODg0LDE4Ljg4NCwwLDAsMC0yNS45NDQtNi4yMDksNy44LDcuOCwwLDAsMC0yLjU1LDEuNjYzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDIxIDAuNzA5KSIgZmlsbD0iI2UyZTJlMiIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iX2Y5YTc0ZWZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOS41NTggMjUuMDQ2KSI+CiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk1MyIgZD0iTTYuNCwwYy4zMzMsMCwuNjY1LjExMSwxLC4xMTFIMjcuNDY1QTIxLjM2MywyMS4zNjMsMCwwLDAsMzAuMTI2LDBWLjc3Nkg2LjRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjU3NSkiIGZpbGw9IiM5MDkwOTAiLz4KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTU0IiBkPSJNNi41MjksMTAuMjU1QTE4LjgxMywxOC44MTMsMCwwLDEsMzMuMTM4LDEyLjE0YTIxLjY0MywyMS42NDMsMCwwLDEsMS44ODUsMi41NSwyLjk0LDIuOTQsMCwwLDEtLjY2NS0uNTU0QTE4Ljg1LDE4Ljg1LDAsMCwwLDIzLjQ5Myw3LjM3MiwxOC42MzksMTguNjM5LDAsMCwwLDEuMSwyMS45YTE4LjgzOCwxOC44MzgsMCwwLDAsMCw3Ljg3MiwyMS42LDIxLjYsMCwwLDEsLjY2NSwyLjU1QTE4LjYyMywxOC42MjMsMCwwLDEsLjMyMSwyMS45LDE3Ljg0MSwxNy44NDEsMCwwLDEsNi41MjksMTAuMjU1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMTA5IDAuNjExKSIgZmlsbD0iIzkwOTA5MCIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iX2ZlYzYzMmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wNzYgMjUuODA0KSI+CiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk1NSIgZD0iTTUuOTExLDBIMjkuNTI2VjQuMzI0YTIyLjkxMiwyMi45MTIsMCwwLDAtMTMuOTctMy4yMTVBMjUuMTgxLDI1LjE4MSwwLDAsMCw1LjgsNC4yMTNDNS44LDIuODgzLDUuOCwxLjQ0MSw1LjkxMSwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC42MykiIGZpbGw9IiNiMmIyYjIiLz4KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTU2IiBkPSJNMTEuODYzLDcuNDM4YTE5LjAzNSwxOS4wMzUsMCwwLDEsMTEuMDg3LTFBMTguNTA4LDE4LjUwOCwwLDAsMSwzMy44MTUsMTMuMmEyLjk0LDIuOTQsMCwwLDAsLjY2NS41NTQsMS4xMDcsMS4xMDcsMCwwLDEsLjQ0My41NTRBMjAuMDc1LDIwLjA3NSwwLDAsMSwzNy4yNTIsMjUuNjIsMTguOTgxLDE4Ljk4MSwwLDAsMSwxNi41Miw0Mi41ODQsMTguNzM2LDE4LjczNiwwLDAsMSw0Ljg3OCwzNi45MjlhMTkuMTgyLDE5LjE4MiwwLDAsMS0zLjMyNi00LjU0NkExLjUyMywxLjUyMywwLDAsMSwxLDMxLjVhMjEuNiwyMS42LDAsMCwwLS42NjUtMi41NSwyMC4xNDMsMjAuMTQzLDAsMCwxLDEtMTAuODY1QTE4Ljc2NSwxOC43NjUsMCwwLDEsMTEuODYzLDcuNDM4bTQuMzI0LjY2NWExNC44LDE0LjgsMCwwLDAtOC44Nyw0LjQzNSwxNS42NTksMTUuNjU5LDAsMCwwLDAsMjIuMjg1LDE3LjE0NSwxNy4xNDUsMCwwLDAsNC4zMjQsMy4xLDE2LjMsMTYuMywwLDAsMCw5Ljk3OCwxLjIyQTE1Ljc4NSwxNS43ODUsMCwwLDAsMzMuOTI2LDIwLjUyYTE1LjYxOSwxNS42MTksMCwwLDAtOC45OC0xMS4yQTE4LjMzNywxOC4zMzcsMCwwLDAsMTYuMTg3LDguMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC42NTYpIiBmaWxsPSIjYjJiMmIyIi8+CiAgICAgICAgPC9nPgogICAgICA8L2c+CiAgICAgIDxnIGlkPSJHcm91cF8yMTE3OCIgZGF0YS1uYW1lPSJHcm91cCAyMTE3OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzMuMTUxIDQxLjkwOSkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTc5IiBkYXRhLW5hbWU9IlBhdGggMzQ5NzkiIGQ9Ik0zOS4yMTMsNDEuNzkxYTMuOTEzLDMuOTEzLDAsMCwxLS4zMzMsMS41NTIsOS4xNjMsOS4xNjMsMCwwLDEtLjc3NiwxLjQ0MUExMS43NDQsMTEuNzQ0LDAsMCwxLDM3LDQ2LjExNWExMi42NDgsMTIuNjQ4LDAsMCwwLTEuMjIsMS4yMkwzNS4xMTEsNDhhNC44MjIsNC44MjIsMCwwLDAtLjY2NS43NzYsMi45NCwyLjk0LDAsMCwwLS41NTQuNjY1LDEuMDEzLDEuMDEzLDAsMCwwLS4zMzMuNTU0aDYuMzJ2Mi42NjFIMzAuMTIyVjUxLjU0OGE1LjE3OSw1LjE3OSwwLDAsMSwuMzMzLTEuODg1LDcuMDY5LDcuMDY5LDAsMCwxLC44ODctMS41NTIsMTMuMjg5LDEzLjI4OSwwLDAsMSwxLjIyLTEuMzMsMTMuMjg5LDEzLjI4OSwwLDAsMSwxLjMzLTEuMjIsNy4xNzMsNy4xNzMsMCwwLDEsMS0uODg3LDIuOTg5LDIuOTg5LDAsMCwwLC43NzYtLjg4NywzLjM2OSwzLjM2OSwwLDAsMCwuNTU0LS43NzYsMi4wODksMi4wODksMCwwLDAsLjIyMi0uODg3LDEuNTEyLDEuNTEyLDAsMCwwLS41NTQtMS4zMywyLjM2NCwyLjM2NCwwLDAsMC0xLjMzLS4zMzMsMy45MzksMy45MzksMCwwLDAtMS4xMDkuMjIyLDIuMjI4LDIuMjI4LDAsMCwwLS44ODcuNDQzLDYuNzksNi43OSwwLDAsMS0uNjY1LjQ0M2MtLjIyMi4xMTEtLjMzMy4zMzMtLjQ0My40NDNMMjkuOSwzOS44YTE0LjExOSwxNC4xMTksMCwwLDEsMi4xMDctMS40NDEsNy4wMzgsNy4wMzgsMCwwLDEsNC44NzgtLjIyMiwzLjU3NCwzLjU3NCwwLDAsMSwxLjU1Mi44ODcsMi44MjcsMi44MjcsMCwwLDEsLjg4NywxLjMzQzM5LjU0Niw0MC45LDM5LjIxMyw0MS4yMzcsMzkuMjEzLDQxLjc5MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yOS45IC0zNy44KSIgZmlsbD0iI2ZmZiIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NS4yMjEiIGhlaWdodD0iNzguNjQ1IiB2aWV3Qm94PSIwIDAgNzUuMjIxIDc4LjY0NSI+CiAgPGcgaWQ9Ikdyb3VwXzIxMTc0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMS4zOTUgLTEuNDQ2KSI+CiAgICA8ZyBpZD0iYXdhcmQtYmFkZ2UtbWVkYWwtcHJpemUtc3BvcnQtd2luLXdpbm5lci1pY29uLTE5NTU1OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4zODIgMS40NDYpIj4KICAgICAgPGcgaWQ9Il9kNDRhOTBmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTguNzc5IDAuMDAxKSI+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NTgiIGQ9Ik0wLDQuNUE0MC40OTQsNDAuNDk0LDAsMCwxLDE3LjQsMGMtMy4xLDYtNi4yLDEyLTkuMywxOC4xLS4yLjQtLjQuNy0uNiwxLjFDNiwxNi40LDQuNiwxMy41LDMuMSwxMC43Yy0xLTIuMS0yLTQuMS0zLjEtNi4yWiIgZmlsbD0iI2Q0NGE5MCIvPgogICAgICA8L2c+CiAgICAgIDxnIGlkPSJfYTcyOTczZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2LjI5MSkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTU5IiBkPSJNOS45LDBoLjlhMTAuOTA4LDEwLjkwOCwwLDAsMCwuNiwxLjFjLTMuMSw2LTYuMiwxMi4xLTkuMywxOC4xSC4xdi0uMWMuMi0uNC40LS43LjYtMS4xQzMuNywxMiw2LjgsNiw5LjksMFoiIGZpbGw9IiNhNzI5NzMiLz4KICAgICAgPC9nPgogICAgICA8ZyBpZD0iXzM4MjY3M2ZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDMuNDc3KSI+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NjAiIGQ9Ik0zNy4xLDBoMS4xYTkuMjUsOS4yNSwwLDAsMC0uNSwxQTguOCw4LjgsMCwwLDEsMzcuMSwwWiIgZmlsbD0iIzM4MjY3MyIvPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTYxIiBkPSJNNS43LDE3LjdBMzguMTg5LDM4LjE4OSwwLDAsMSwyMC40LDQuMmMuOSwxLjksMS45LDMuNywyLjgsNS42YTMxLjg4NCwzMS44ODQsMCwwLDAtOS41LDcuNkEzMS4zNzgsMzEuMzc4LDAsMCwwLDQ3LjQsNjcuNSwzMS44ODEsMzEuODgxLDAsMCwwLDY4LDQ1LjYsMzEuNDMsMzEuNDMsMCwwLDAsNTIsOS44YzEtMS45LDEuOS0zLjcsMi45LTUuNkEzNy41OTIsMzcuNTkyLDAsMSwxLDQuMiwyMC40LDE4LjIxMiwxOC4yMTIsMCwwLDEsNS43LDE3LjdaIiBmaWxsPSIjMTIwMjNlIi8+CiAgICAgIDwvZz4KICAgICAgPGcgaWQ9Il9mMTVhOWVmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjcuMzQ5IDAuMDA1KSI+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NjIiIGQ9Ik0xMC45LDBBMzkuODMzLDM5LjgzMywwLDAsMSwyOS4xLDQuNXYuMWMtMSwyLTIuMSw0LjEtMy4xLDYuMS0xLjUsMi45LTIuOSw1LjctNC40LDguNi0uMy43LS43LDEuMy0xLDJILjFjLjMtLjcuNy0xLjMsMS0yLDMuMS02LDYuMi0xMi4xLDkuMy0xOC4xQTYuMTE3LDYuMTE3LDAsMCwxLDEwLjksMFoiIGZpbGw9IiNmMTVhOWUiLz4KICAgICAgPC9nPgogICAgICA8ZyBpZD0iXzQ3MzA4MGZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjM3MSAxMC42MjgpIj4KICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk2MyIgZD0iTTE4LjUsMGMxLjUsMi44LDIuOSw1LjcsNC40LDguNXYuMWEyLjcsMi43LDAsMCwwLTIuNCwzLDIuNTU0LDIuNTU0LDAsMCwwLDIsMi4zdjQuOWEyMy4wNzEsMjMuMDcxLDAsMCwwLTgsMzEuNSwyMS40ODksMjEuNDg5LDAsMCwwLDYuNCw3LDIyLjkzNiwyMi45MzYsMCwwLDAsMzItMzIsMjMuNzA1LDIzLjcwNSwwLDAsMC03LTYuNFYxNGEyLjcsMi43LDAsMCwwLDItMi43LDIuNzgyLDIuNzgyLDAsMCwwLTIuMy0yLjdDNDcsNS44LDQ4LjUsMi45LDQ5LjksMEEzNC4yNTksMzQuMjU5LDAsMSwxLDMuOCwxNC44LDM0Ljg2NSwzNC44NjUsMCwwLDEsOC4xLDguMywzNy43MDYsMzcuNzA2LDAsMCwxLDE4LjUsMFoiIGZpbGw9IiM0NzMwODAiLz4KICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk2NCIgZD0iTTIyLjgsMTAuOGMuMi0uMi41LS4xLjgtLjFINDUuMmMuOC0uMS44LDEuMywwLDEuM2gtMjJhLjY2OS42NjksMCwwLDEtLjctLjZBMS42MjgsMS42MjgsMCwwLDEsMjIuOCwxMC44WiIgZmlsbD0iIzQ3MzA4MCIvPgogICAgICA8L2c+CiAgICAgIDxwYXRoIGlkPSJVbmlvbl83IiBkPSJNMzAuOSw2My4zYTE1LjQsMTUuNCwwLDAsMS03LjItMjAuNiwxNi4wMTYsMTYuMDE2LDAsMCwxLDMtNC4yQTE1LjQ5MywxNS40OTMsMCwwLDEsNTMsNDcuMmExNS42ODMsMTUuNjgzLDAsMCwxLTQuMiwxMywxNS4yNDQsMTUuMjQ0LDAsMCwxLTExLDQuN0ExNy40NjcsMTcuNDY3LDAsMCwxLDMwLjksNjMuM1oiIGZpbGw9IiNiNDYxMTciLz4KICAgICAgPGcgaWQ9Il9mZmRlMzlmZiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuNjc1IDE5LjI0KSI+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NjUiIGQ9Ik0xMS43LDBoMmMtLjMuNy0uNywxLjMtMSwySDMzLjJjLjMtLjcuNy0xLjMsMS0yYTIuNywyLjcsMCwwLDEsMi4zLDIuNywyLjc5LDIuNzksMCwwLDEtMiwyLjcsMjIuNiwyMi42LDAsMCwxLTIuNi4xSDEyLjJhMy40LDMuNCwwLDAsMS0xLS4xQTIuODgsMi44OCwwLDAsMSw5LjMsMmEyLjY3MiwyLjY3MiwwLDAsMSwyLjQtMm0tLjIsMi4yYS42NDIuNjQyLDAsMCwwLS4xLjljLjEuMi4zLjIuNS4yaDIyYy44LDAsLjgtMS40LDAtMS4zSDEyLjNjLS4yLjEtLjYsMC0uOC4yWiIgZmlsbD0iI2I0NjExNyIvPgogICAgICAgIDxwYXRoIGlkPSJQYXRoXzM0OTY2IiBkPSJNMjAuOCw3LjJBMjMuMTIyLDIzLjEyMiwwLDAsMSw0NS44LDI4LDIyLjk0NiwyMi45NDYsMCwwLDEsLjEsMzIuMmEyMy4wMTUsMjMuMDE1LDAsMCwxLDIwLjctMjVNMTAuNywxNkExOC44NTksMTguODU5LDAsMCwwLDQuNCwyNy41LDE4LjgzNCwxOC44MzQsMCwwLDAsNiwzNy43YTIuMzksMi4zOSwwLDAsMCwuMy45QTIwLjI2MSwyMC4yNjEsMCwwLDAsOS42LDQzYTE4LjY1MSwxOC42NTEsMCwwLDAsMjYuNC4zLDE4LjM4MywxOC4zODMsMCwwLDAsNS41LTExLjQsMTguNzk0LDE4Ljc5NCwwLDAsMC0yLjMtMTEuMSwyLjY1MSwyLjY1MSwwLDAsMC0uNS0uNiwxOC41NTgsMTguNTU4LDAsMCwwLTI1LjUtNkExOS41LDE5LjUsMCwwLDAsMTAuNywxNloiIGZpbGw9IiNiNDYxMDAiLz4KICAgICAgPC9nPgogICAgICA8ZyBpZD0iX2Y5YTc0ZWZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOC45NzggMjQuNTk3KSI+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NjgiIGQ9Ik03LDBjLjMsMCwuNy4xLDEsLjFIMjcuN0EyMi42LDIyLjYsMCwwLDAsMzAuMywwVi43SDdaIiBmaWxsPSIjNGIyOTA1Ii8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NjkiIGQ9Ik02LjQsMTAuNmExOC42MzMsMTguNjMzLDAsMCwxLDI2LjIsMS44LDE0LjM3MSwxNC4zNzEsMCwwLDEsMS44LDIuNWMtLjItLjItLjUtLjQtLjYtLjZBMTguNjM3LDE4LjYzNywwLDAsMCwxLDIyLjFhMjAuNDY4LDIwLjQ2OCwwLDAsMCwwLDcuOCwxOC4yODgsMTguMjg4LDAsMCwxLC42LDIuNUExNy45LDE3LjksMCwwLDEsLjEsMjIuMiwxOS4zODUsMTkuMzg1LDAsMCwxLDYuNCwxMC42WiIgZmlsbD0iIzU1MjgwMCIvPgogICAgICA8L2c+CiAgICAgIDxnIGlkPSJfZmVjNjMyZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjYwNiAyNS4zNDIpIj4KICAgICAgICA8cGF0aCBpZD0iUGF0aF8zNDk3MCIgZD0iTTYuNCwwSDI5LjdWNC4yQTIzLjgyNSwyMy44MjUsMCwwLDAsMTUuOSwxLjEsMjIuNjc4LDIyLjY3OCwwLDAsMCw2LjQsNC4yUTYuNCwyLjEsNi40LDBaIiBmaWxsPSIjNTUyODAwIi8+CiAgICAgICAgPHBhdGggaWQ9IlBhdGhfMzQ5NzEiIGQ9Ik0xMS42LDhhMTguNTc4LDE4LjU3OCwwLDAsMSwyMS42LDUuNmwuNi42YTEuMDI0LDEuMDI0LDAsMCwxLC41LjYsMTkuNDEyLDE5LjQxMiwwLDAsMSwyLjMsMTEuMUExOC42NzMsMTguNjczLDAsMCwxLDQuNywzNy4xYTIwLjI2LDIwLjI2LDAsMCwxLTMuMy00LjQsMy41NTIsMy41NTIsMCwwLDEtLjQtLjksMjIuNjc2LDIyLjY3NiwwLDAsMC0uNi0yLjUsMTcuODEzLDE3LjgxMywwLDAsMSwuOS0xMC43QTE4LjUzMiwxOC41MzIsMCwwLDEsMTEuNiw4bTQuMi42QTE1Ljc0NSwxNS43NDUsMCwwLDAsNywxM2ExNS40NTUsMTUuNDU1LDAsMCwwLDQuMiwyNC44QTE1LjA1MiwxNS4wNTIsMCwwLDAsMjEsMzksMTUuNDksMTUuNDksMCwwLDAsMjQuMyw5LjdhMTcuMjcxLDE3LjI3MSwwLDAsMC04LjUtMS4xWiIgZmlsbD0iIzY5NDAwMCIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgICA8ZyBpZD0iR3JvdXBfMjExNzYiIGRhdGEtbmFtZT0iR3JvdXAgMjExNzYiPgogICAgICA8cGF0aCBpZD0iUGF0aF8zNDk3NyIgZGF0YS1uYW1lPSJQYXRoIDM0OTc3IiBkPSJNMzcuNiw1Ny4zYTQuMSw0LjEsMCwwLDEtMS4xLS4xLDUuMDE5LDUuMDE5LDAsMCwxLTEuMi0uMmMtLjQtLjEtLjctLjItMS0uM2E0Ljg3NSw0Ljg3NSwwLDAsMS0uNy0uM2wuNi0yLjVjLjMuMS44LjMsMS4zLjVhNS44NjUsNS44NjUsMCwwLDAsMiwuMiwzLjQzOSwzLjQzOSwwLDAsMCwyLS41LDEuNjc4LDEuNjc4LDAsMCwwLC42LTEuNCwyLDIsMCwwLDAtLjItLjlsLS42LS42YTEuNjg5LDEuNjg5LDAsMCwwLTEtLjMsNC44NjksNC44NjksMCwwLDAtMS4yLS4xSDM2VjQ4LjRoMS4zYTIuNzY5LDIuNzY5LDAsMCwwLC45LS4xYy4zLS4xLjUtLjEuNy0uM2ExLjIwNSwxLjIwNSwwLDAsMCwuNS0uNSwxLjg4NCwxLjg4NCwwLDAsMCwuMi0uOCwxLjQ0NSwxLjQ0NSwwLDAsMC0uMi0uNywxLjc1NiwxLjc1NiwwLDAsMC0uNC0uNWwtLjYtLjNhMS40ODMsMS40ODMsMCwwLDAtLjctLjEsNC4xNDYsNC4xNDYsMCwwLDAtMS42LjNjLS41LjItLjkuNC0xLjMuNmwtMS4xLTIuMmE1LjkzOCw1LjkzOCwwLDAsMSwuOC0uNCwxMC4zNzYsMTAuMzc2LDAsMCwxLDEtLjRjLjQtLjEuNy0uMiwxLjEtLjNhNC44NjksNC44NjksMCwwLDEsMS4yLS4xLDYuNjQ4LDYuNjQ4LDAsMCwxLDIuMS4zLDUuMyw1LjMsMCwwLDEsMS41LjgsNC43LDQuNywwLDAsMSwuOSwxLjIsNC4wMTMsNC4wMTMsMCwwLDEsLjMsMS41LDMuMzIsMy4zMiwwLDAsMS0uNSwxLjYsMy40NDcsMy40NDcsMCwwLDEtMS4yLDEuMiwzLjQzOCwzLjQzOCwwLDAsMSwyLjMsMy40LDUuNjYzLDUuNjYzLDAsMCwxLS4zLDEuOCwzLjMxNiwzLjMxNiwwLDAsMS0xLDEuNCw0LjYwOCw0LjYwOCwwLDAsMS0xLjcuOUE0LjU1Nyw0LjU1NywwLDAsMSwzNy42LDU3LjNaIiBmaWxsPSIjZmZmIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
      ],
      dm: config.domain,
      isShowTime: true,
    };
  },
  methods: {
    changeTabActive(tabActive) {
      this.tabActive = tabActive;
    },
    formatUSD(usd) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      return formatter.format(usd);
    },
    onBack() {
      this.$emit("goBack");
    },
    updateChampion() {
      this.$emit('update');
    }
  },
  computed: {
    bg() {
      return `${this.dm}/api/auth/photo/champions/${this.champion.background}`;
    }
  },
  filters: {
    getTypeChampion(val) {
      switch (val) {
        case "klgd":
          return "KLGD";

        case "hh":
          return "HOA HỒNG";
        default:
          break;
      }
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY hh:mm:ss");
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      const d = moment.duration(moment(this.champion.dateEnd).diff(moment()));
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
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
.card {
  z-index: 9999;
  height: 276px;
  margin-top: unset;
  background-repeat: no-repeat;
  background-size: cover !important;
  padding: 24px 0;
  border: none;
  border-radius: 0;
  color: #5d6481;
  background: url("~@/assets/images/sky/championship/bg_challenge_1.png");

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .title {
    display: flex;
    align-items: center;
    .btn {
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      background: hsla(0, 0%, 100%, 0.5);
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      height: 38px;
      margin: 0 8px 0 0;
    }
    .name {
      color: #fff;
      font-size: 35px;
      font-weight: 700;
      text-transform: capitalize !important;
    }
  }

  .count-down {
    font-size: 16px;
    color: #808590;
    margin-top: 32px;
    margin-bottom: 1rem;
  }

  .content {
    display: flex;
    align-items: center;

    .left {
      flex: 1 1;
    }

    .total,
    .type {
      flex: 0.5 1;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .total {
      .title {
        color: #31baa0;
        font-size: 38px;
        font-weight: 700;
        margin-top: 0;
      }
      .des {
        font-size: 20px;
        color: #868a91;
      }
    }

    .type {
      .title {
        font-size: 38px;
        color: #fff;
        text-transform: capitalize;
        margin-top: 0;
      }

      .des {
        font-size: 20px;
        color: #868a91;
      }
    }
  }

  .time-countdown {
    display: flex;
    justify-content: center;
    background-color: hsla(0, 0%, 100%, 0.18);
    border-radius: 5px;
    padding: 4px 0;
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
    font-size: 1.5rem;
    text-transform: uppercase;
  }
}

.tab {
  border-bottom: 1px solid #393261;
  transition: all 0.8s ease-out;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;

  li {
    background-color: transparent;
    transition: all 0.35s;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.75rem 1rem;
    font-size: 20px;
    cursor: pointer;
  }

  .active {
    position: relative;
    border-radius: 0;
    font-weight: 700;
    height: 55px;
    font-size: 28px;
    color: #fff;

    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 4px;
      background: #2077fc;
      position: absolute;
      bottom: -1px;
      left: 0;
    }
  }
}

.wrapper-tab-content {
  .wrapper-time {
    font-size: 16px;
    margin-top: 21px;
    margin-bottom: 1rem;
    display: flex;
    flex: 0 0 50%;
    max-width: 50%;

    .left-content {
      color: #89819f;
    }
  }
}

.divider {
  width: 100%;
  height: 29px;
}

.info {
  font-family: "Sarabun", Helvetica, sans-serif;
  font-weight: 400;
  white-space: pre-wrap;
}

#last-content {
  padding-bottom: 45px;
}

.update {
  color: #fff;
  font-size: 14px;
  background-color: transparent;
  border: 0;
  padding-top: 46px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  span {
    text-decoration: underline;
  }
}

.table-rank {
  padding-top: 30px;
  display: flex;

  table {
    width: 100%;
    border: none;
    border-collapse: collapse;

    thead th {
      font-size: 14px;
      font-weight: 300;
      background-color: #21124a;
      color: #645980;
      padding-top: 8px;
      padding-bottom: 8px;
    }

    tbody td {
      border-bottom: 1px solid #393157;
      transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      align-items: center;
      font-size: 16px;
      padding-top: 18px;
      padding-bottom: 18px;
      color: #fff;
      padding-left: 10px;

      img {
        width: 40px;
      }
    }

    tbody td.price {
      color: #31baa0;
    }
  }
}
</style>
