<template>
  <div id="tradePage" v-scroll-lock="$store.state.isScrollTrading" class="trade-container relative">
    <div class="streak" v-if="false">
      <span class="streak-title">streak</span>
      <div class="ep-container" style="width: 32px; height: 32px">
        <div class="ep-content">
          <div class="ep-svg-container">
            <svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" class="ep-svg">
              <g class="ep-circle--container">
                <defs></defs>
                <g class="ep-circle" style="transition-timing-function: ease-in-out; transform: rotate(-90deg)">
                  <circle r="15.2" cx="16" cy="16" stroke="#617F8D" stroke-dasharray="" fill="#06354C" stroke-width="1.6" class="ep-circle--empty" style="transition-duration: 1000ms; transition-timing-function: ease-in-out"></circle>
                  <circle
                    r="15.2"
                    cx="16"
                    cy="16"
                    fill="transparent"
                    stroke="#2AE6D8"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-dasharray="95.50441666912971"
                    class="ep-circle--progress animation__default"
                    :style="{ 'stroke-dashoffset': 96 - (96 / 9) * streak }"
                    style="
                      transition: all 1000ms ease-in-out 0s, opacity 0.3s 0s;
                      transform-origin: 50% 50%;
                      opacity: 1;
                      --ep-circumference: 95.5044;
                      --ep-negative-circumference: -95.5044;
                      --ep-double-circumference: 191.009;
                      --ep-stroke-offset: 84.8928;
                      --ep-loop-stroke-offset: -106.116;
                      --ep-bounce-out-stroke-offset: 0;
                      --ep-bounce-in-stroke-offset: 84.8928;
                      --ep-reverse-stroke-offset: 275.902;
                      --ep-loading-stroke-offset: 19.1009;
                      animation-duration: 1000ms;
                    "
                  ></circle>
                </g>
              </g>
            </svg>
          </div>
          <div class="ep-legend--container" style="max-width: 32px">
            <div class="ep-legend--value">
              <span class="ep-legend--value__counter"> <span>11.11111111111111</span> </span
              ><span class="streak-value"
                >x<span>{{ streak }}</span></span
              >
            </div>
          </div>
        </div>
      </div>
      <canvas id="canvas-fire"></canvas>
      <svg id="svg-fire" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -9"></feColorMatrix>
        </filter>
      </svg>
    </div>
    <div class="vx-row m-0 wrapper">
      <div :class="['vx-col w-full relative trans']" id="left-content">
        <div class="h-full">
          <div class="relative chartBox">
            <highcharts ref="chartStock" class="wap-chart trans" :constructor-type="'stockChart'" :options="chartOptionsStock"></highcharts>
            <div class="title-wraps">
              <!-- <div class="titleChartCandle items-center">
                <span class="iconBTC"></span>
                <span class="textPrice">USOIL</span>
              </div>
              <div class="titleChartCandle items-center">
                <span class="iconBTC"></span>
                <span class="textPrice">UKOIL</span>
              </div> -->
              <div class="titleChartCandle items-center">
                <span class="iconBTC"></span>
                <span class="textPrice">BTC/USDT</span>
              </div>
            </div>
            <div class="slider sidebarMobile">
              <div class="slidercontent">
                <div class="backgroundOverlay" :style="`background-image: url(${require('@/assets/images/sky/overlay_left.svg')});`"></div>
                <div class="flex flex-col justify-between progress_c">
                  <span class="font-12 zIndex99" style="color: #fa5f65">{{ CSSELL }}%</span>
                  <vs-progress style="width: 354px; background: #fa5f65 !important" class="bg-red progress" :height="4" :percent="CSBUY" color="success"></vs-progress>
                  <span class="font-12 zIndex99" style="color: #29c770">{{ CSBUY }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div id="analysis-wrapper" class="analysis-wrapper relative">
            <vs-tabs>
              <vs-tab label="INDICATORS" @click="(activeGau = true), (activeHis = true)"> </vs-tab>
              <vs-tab label="LAST RESULTS" @click="(activeGau = true), (activeHis = false)"> </vs-tab>
            </vs-tabs>

            <div class="wrap-gauge-meter" :class="{ active: activeGau, hidden: !activeHis }">
              <div class="wrap-gauge-meter-inner">
                <div class="gauge-meter">
                  <div class="gauge-meter-sub gauge-meter--os">
                    <div class="v-popover gauge-meter-popover">
                      <div class="trigger inline-block">
                        <h3 class="gauge-meter-title">
                          Oscillators
                          <span class="gauge-meter-title-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                              <g id="c-question" transform="translate(3.068 -8.774)">
                                <g id="Ellipse_1825" data-name="Ellipse 1825" transform="translate(-2.068 9.774)" fill="none" stroke="#fefefe" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1">
                                  <circle cx="10" cy="10" r="10" stroke="none"></circle>
                                  <circle cx="10" cy="10" r="10.5" fill="none"></circle>
                                </g>
                                <g id="question" transform="translate(3.497 13.43)">
                                  <path
                                    id="Path_30768"
                                    data-name="Path 30768"
                                    d="M8.359,10.774a4.349,4.349,0,0,1,.4-2.323,5.026,5.026,0,0,1,1.4-1.421c1.317-.981,1.876-1.491,1.876-2.54,0-1.166-.924-1.637-2.166-1.637a7.306,7.306,0,0,0-3.334.866L5.694,2.063A9.2,9.2,0,0,1,10.035,1a4.89,4.89,0,0,1,3.1.9A3,3,0,0,1,14.287,4.4,3.24,3.24,0,0,1,13.4,6.7,10.58,10.58,0,0,1,11.872,8,5.71,5.71,0,0,0,10.63,9.137a2.68,2.68,0,0,0-.315,1.637H8.359Z"
                                    transform="translate(-5.694 -1)"
                                    fill="#fefefe"
                                  ></path>
                                  <ellipse id="Ellipse_1827" data-name="Ellipse 1827" cx="1.363" cy="1.284" rx="1.363" ry="1.284" transform="translate(2.252 11.56)" fill="#fefefe"></ellipse>
                                </g>
                              </g>
                            </svg>
                          </span>
                        </h3>
                      </div>
                    </div>
                    <h4 class="gauge-meter-sub-title">{{ textTitleOs }}</h4>
                    <div class="gauge-meter-border">
                      <div class="gauge-meter-background rank-2"></div>
                      <ul class="gauge-meter-label-list">
                        <li class="gauge-meter-label-item gauge-meter-label-item--strong-sell">strong<br />sell</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--sell active">sell</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--neutral">neutral</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--buy">buy</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--strong-buy">strong<br />buy</li>
                      </ul>
                      <ul class="gauge-meter-status-list">
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--sell">{{ NumOscSELL }}</span>
                          <span class="gauge-meter-status-text">Sell</span>
                        </li>
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--neutral">{{ NumOscNeutral }}</span>
                          <span class="gauge-meter-status-text">Neutral</span>
                        </li>
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--buy">{{ NumOscBUY }}</span>
                          <span class="gauge-meter-status-text">Buy</span>
                        </li>
                      </ul>
                      <highcharts ref="chartOs" class="gauge-meter-pane" :options="optionsOs"></highcharts>
                    </div>
                  </div>
                  <div class="gauge-meter-sub gauge-meter--su">
                    <div class="v-popover gauge-meter-popover">
                      <div class="trigger" style="display: inline-block">
                        <h3 class="gauge-meter-title">
                          Summary
                          <span class="gauge-meter-title-icon"
                            ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                              <g id="c-question" transform="translate(3.068 -8.774)">
                                <g id="Ellipse_1825" data-name="Ellipse 1825" transform="translate(-2.068 9.774)" fill="none" stroke="#fefefe" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1">
                                  <circle cx="10" cy="10" r="10" stroke="none"></circle>
                                  <circle cx="10" cy="10" r="10.5" fill="none"></circle>
                                </g>
                                <g id="question" transform="translate(3.497 13.43)">
                                  <path
                                    id="Path_30768"
                                    data-name="Path 30768"
                                    d="M8.359,10.774a4.349,4.349,0,0,1,.4-2.323,5.026,5.026,0,0,1,1.4-1.421c1.317-.981,1.876-1.491,1.876-2.54,0-1.166-.924-1.637-2.166-1.637a7.306,7.306,0,0,0-3.334.866L5.694,2.063A9.2,9.2,0,0,1,10.035,1a4.89,4.89,0,0,1,3.1.9A3,3,0,0,1,14.287,4.4,3.24,3.24,0,0,1,13.4,6.7,10.58,10.58,0,0,1,11.872,8,5.71,5.71,0,0,0,10.63,9.137a2.68,2.68,0,0,0-.315,1.637H8.359Z"
                                    transform="translate(-5.694 -1)"
                                    fill="#fefefe"
                                  ></path>
                                  <ellipse id="Ellipse_1827" data-name="Ellipse 1827" cx="1.363" cy="1.284" rx="1.363" ry="1.284" transform="translate(2.252 11.56)" fill="#fefefe"></ellipse>
                                </g>
                              </g></svg
                          ></span>
                        </h3>
                      </div>
                    </div>
                    <h4 class="gauge-meter-sub-title">{{ textTitleSu }}</h4>
                    <div class="gauge-meter-border">
                      <div class="gauge-meter-background rank-3"></div>
                      <ul class="gauge-meter-label-list">
                        <li class="gauge-meter-label-item gauge-meter-label-item--strong-sell">
                          strong
                          <br />sell
                        </li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--sell">sell</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--neutral active">neutral</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--buy">buy</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--strong-buy">
                          strong
                          <br />buy
                        </li>
                      </ul>
                      <ul class="gauge-meter-status-list">
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--sell">{{ NumSumSELL }}</span>
                          <span class="gauge-meter-status-text">Sell</span>
                        </li>
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--neutral">{{ NumSumNeutral }}</span>
                          <span class="gauge-meter-status-text">Neutral</span>
                        </li>
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--buy">{{ NumSumBUY }}</span>
                          <span class="gauge-meter-status-text">Buy</span>
                        </li>
                      </ul>
                      <!--  -->
                      <highcharts class="gauge-meter-pane" :options="optionsSu" ref="chartSu"></highcharts>
                      <!--  -->
                    </div>
                  </div>
                  <div class="gauge-meter-sub gauge-meter--ma">
                    <div class="v-popover gauge-meter-popover">
                      <div class="trigger" style="display: inline-block">
                        <h3 class="gauge-meter-title">
                          Moving Averages
                          <span class="gauge-meter-title-icon"
                            ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                              <g id="c-question" transform="translate(3.068 -8.774)">
                                <g id="Ellipse_1825" data-name="Ellipse 1825" transform="translate(-2.068 9.774)" fill="none" stroke="#fefefe" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1">
                                  <circle cx="10" cy="10" r="10" stroke="none"></circle>
                                  <circle cx="10" cy="10" r="10.5" fill="none"></circle>
                                </g>
                                <g id="question" transform="translate(3.497 13.43)">
                                  <path
                                    id="Path_30768"
                                    data-name="Path 30768"
                                    d="M8.359,10.774a4.349,4.349,0,0,1,.4-2.323,5.026,5.026,0,0,1,1.4-1.421c1.317-.981,1.876-1.491,1.876-2.54,0-1.166-.924-1.637-2.166-1.637a7.306,7.306,0,0,0-3.334.866L5.694,2.063A9.2,9.2,0,0,1,10.035,1a4.89,4.89,0,0,1,3.1.9A3,3,0,0,1,14.287,4.4,3.24,3.24,0,0,1,13.4,6.7,10.58,10.58,0,0,1,11.872,8,5.71,5.71,0,0,0,10.63,9.137a2.68,2.68,0,0,0-.315,1.637H8.359Z"
                                    transform="translate(-5.694 -1)"
                                    fill="#fefefe"
                                  ></path>
                                  <ellipse id="Ellipse_1827" data-name="Ellipse 1827" cx="1.363" cy="1.284" rx="1.363" ry="1.284" transform="translate(2.252 11.56)" fill="#fefefe"></ellipse>
                                </g>
                              </g></svg
                          ></span>
                        </h3>
                      </div>
                    </div>
                    <h4 class="gauge-meter-sub-title">{{ textTitleMa }}</h4>
                    <div class="gauge-meter-border">
                      <div class="gauge-meter-background rank-3"></div>
                      <ul class="gauge-meter-label-list">
                        <li class="gauge-meter-label-item gauge-meter-label-item--strong-sell">
                          strong
                          <br />sell
                        </li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--sell">sell</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--neutral active">neutral</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--buy">buy</li>
                        <li class="gauge-meter-label-item gauge-meter-label-item--strong-buy">
                          strong
                          <br />buy
                        </li>
                      </ul>
                      <ul class="gauge-meter-status-list">
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--sell">{{ NumMovSELL }}</span>
                          <span class="gauge-meter-status-text">Sell</span>
                        </li>
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--neutral">{{ NumMovNeutral }}</span>
                          <span class="gauge-meter-status-text">Neutral</span>
                        </li>
                        <li class="gauge-meter-status-item">
                          <span class="gauge-meter-status-value gauge-meter-status-value--buy">{{ NumMovBUY }}</span>
                          <span class="gauge-meter-status-text">Buy</span>
                        </li>
                      </ul>
                      <highcharts class="gauge-meter-pane" :options="optionsMa" ref="chartMa"></highcharts>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="historyBox" :class="{ active: !activeGau, hidden: activeHis }" style="transform: translateX(0px)">
              <div class="overviewInfo flex items-center">
                <span class="badgeItem">
                  <span class="color-green uppercase font-bold">Mua</span>
                  <span> {{ totalBuyStatic }}</span>
                </span>
                <span class="badgeItem ml-2">
                  <span class="color-red uppercase font-bold">Bán</span>
                  <span> {{ totalSellStatic }}</span>
                </span>
              </div>
              <div class="ct flex justify-center">
                <div class="vx-row history-column">
                  <div class="vx-col w-18 list1">
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                  </div>
                  <div class="vx-col w-18 list2">
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                  </div>
                  <div class="vx-col w-18 list3">
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                  </div>
                  <div class="vx-col w-18 list4">
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                  </div>
                  <div class="vx-col w-18 list5">
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-1 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-2 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-3 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-4 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                    <span class="gridcs-5 inline-flex m-1 item rounded-full empty"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vx-col w-full rightBar c-desktop trans" id="right-content">
        <div class="pc block">
          <div class="mb-6">
            <div class="wrapper">
              <div class="session">
                <!--交易号-->
                <div class="title">Giao dịch</div>
                <div class="ss">{{ session }}</div>
              </div>
              <div class="wrapper-time">
                <div class="text">{{ textTimeDown }}</div>
<!--               倒计时-->
                <div v-if="seconDown !== null" class="time">{{ seconDown }}s</div>
              </div>
            </div>
            <div class="price-center mt-3">Ví tiền: {{ formatPrice(balanceForuser) }}</div>
            <div class="amount m-0 mt-3">
              <div>Số tiền</div>
              <div class="relative">
                <v-select taggable :create-option="createOption" v-model="selectedAmount" :options="amounts"></v-select>
              </div>
            </div>
            <!--            <div class="vx-row m-0 mt-2 m_hide">
              <div class="item-col md:w-4/12 w-full text-center mt-2">
                <span class="w-full bpF cursor-pointer h-12" @click="clickCT(5)"
                >+5</span
                >
              </div>
              <div class="item-col md:w-4/12 w-full text-center mt-2">
                <span
                    class="w-full bpF cursor-pointer h-12"
                    @click="clickCT(10)"
                >+10</span
                >
              </div>
              <div class="item-col md:w-4/12 w-full text-center mt-2">
                <span
                    class="w-full bpF cursor-pointer h-12"
                    @click="clickCT(20)"
                >+20</span
                >
              </div>
              <div class="item-col md:w-4/12 w-full text-center mt-2">
                <span
                    class="w-full bpF cursor-pointer h-12"
                    @click="clickCT(50)"
                >+50</span
                >
              </div>
              <div class="item-col md:w-4/12 w-full text-center mt-2">
                <span
                    class="w-full bpF cursor-pointer h-12"
                    @click="clickCT(100)"
                >+100</span
                >
              </div>
              <div class="item-col md:w-4/12 w-full text-center mt-2">
                <span class="w-full bpF cursor-pointer h-12" @click="clickCT(0)"
                >All</span
                >
              </div>
            </div>-->
          </div>
          <div class="lg:relative mb-5 no-margin-m">
            <div class="text-center">
              <div class="profitPercent mb-2">Lợi nhuận <span class="text-color-red">95%</span></div>
              <div class="profitValue color-green text-3xl font-bold no-margin-m">+{{ loiNhuan }} {{ unit }}</div>
            </div>
          </div>
          <div class="lg:relative mb-10 text-center no-margin-m">
            <div class="text-center">Chỉ báo tâm lý</div>
            <vs-progress class="bg-green" :height="7" :percent="CSBUY" color="danger"></vs-progress>
            <div class="block">
              <span class="color-red float-left"> {{ CSBUY }}% </span>
              <span class="color-green float-right"> {{ CSSELL }}% </span>
            </div>
          </div>

          <div v-if="seconDown !== null" class="lg:relative mb-5 mt-10 no-margin-m">
            <div class="h-6"></div>
            <div @click="isBet && BetBuySell('buy')" :class="`btn_dat_cuoc tang mb-5 ${!isBet ? 'disabled' : ''}`">
              MUA
              <feather-icon icon="TrendingUpIcon" svgClasses="w-6 h-5"></feather-icon>
            </div>
            <div @click="isBet && BetBuySell('sell')" :class="`btn_dat_cuoc giam ${!isBet ? 'disabled' : ''}`">
              BÁN
              <feather-icon icon="TrendingDownIcon" svgClasses="w-6 h-5"></feather-icon>
            </div>
          </div>
        </div>
        <div class="mobile hidden">
          <div class="sidebarPC relative">
            <vs-progress class="bg-red" :height="4" :percent="CSBUY" color="success"></vs-progress>
            <div class="block">
              <span class="color-green float-left"> {{ CSBUY }}% </span>
              <span class="color-red float-right"> {{ CSSELL }}% </span>
            </div>
          </div>
          <div class="relative">
            <div class="mt-1 text-center c-loinhuan">
              Lợi nhuận
              <span class="profitPercent text-color-red mb-2">95%</span>
              <span class="profitValue color-green text-2xl font-bold">+{{ loiNhuan }}{{ unit }}</span>
            </div>
          </div>
          <!--          <div class="relative">
            <div class="flex">
              <div class="flex w-full mr-2">
                <div @click="truBetAmount" class="operator_mobile w-full">
                  <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <div class="flex relative" style="width: 55rem">
                <vs-input
                    readonly="readonly"
                    @click.stop="showMobileMenu = !showMobileMenu"
                    class="w-full betInput"
                    icon-pack="feather"
                    icon="icon-dollar-sign"
                    placeholder="10"
                    v-model="betAmount"
                    icon-no-border
                />
              </div>
              <div class="flex w-full ml-2">
                <div @click="congBetAmount" class="operator_mobile w-full">
                  <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>-->
          <div class="wrapper-cuoc-mobile">
            <!--            <div class="relative">-->
            <v-select taggable  :create-option="createOption" append-to-body :calculate-position="withPopper" v-model="selectedAmount" :options="amounts"></v-select>
            <!--            </div>-->
            <div class="session-mobile">
              <div>Phiên</div>
              <div>{{ session }}</div>
            </div>
          </div>
          <div class="relative mb-5 mt-3">
            <div v-if="seconDown !== null" style="display: flex; justify-content: space-between">
              <div @click="BetBuySell('sell')" :class="`btn_dat_cuoc_m giam ${!isBet ? 'disabled' : ''}`">BÁN</div>
              <div class="font-bold btn_dat_cuoc_m time">
                <div>{{ textTimeDown }}</div>
                <div class="display-remain-time timer_counter second">{{ seconDown }}s</div>
              </div>
              <div @click="BetBuySell('buy')" :class="`btn_dat_cuoc_m tang ${!isBet ? 'disabled' : ''}`">MUA</div>
            </div>
          </div>
          <div class="keyboard-input-wrap" :class="{ active: showMobileMenu }">
            <div class="numKeyboardInput" @click="showMobileMenu = !showMobileMenu"></div>
            <div class="keyboard" :class="{ hiddenKey: !showMobileMenu }">
              <div id="amountWrapper" class="amountWrapper">
                <div class="headerAmount">
                  <span>Khối lượng giao dịch</span>
                </div>
                <div class="groupButtonMobile flex">
                  <div class="flex w-full mr-2">
                    <vs-button @click="truBetAmount" class="w-full" type="border" icon-pack="feather" icon="icon-minus"></vs-button>
                  </div>
                  <div class="flex relative" style="width: 55rem">
                    <vs-input readonly="readonly" @keyup="nhapBetAmount" class="w-full betInput" icon-pack="feather" icon="icon-dollar-sign" placeholder="10" v-model="betAmount" icon-no-border />
                    <feather-icon @click="clearBAmount()" style="right: 5px; top: 7px; position: absolute !important" class="cursor-pointer" icon="XCircleIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
                  </div>
                  <div class="flex w-full ml-2">
                    <vs-button @click="congBetAmount" class="w-full" type="border" icon-pack="feather" icon="icon-plus"></vs-button>
                  </div>
                </div>
                <div class="relative">
                  <div class="mt-2 mb-2 text-center">
                    Lợi nhuận
                    <span class="profitPercent text-color-red mb-2">95%</span>
                    <span class="profitValue color-green text-3xl font-bold">+${{ loiNhuan }}</span>
                  </div>
                </div>
              </div>
              <table id="keyboardLandscape" style="height: calc(100% - 160px)">
                <tbody>
                  <tr class="suggestion">
                    <td @click="clickCT(5)">+5</td>
                    <td @click="clickCT(10)">+10</td>
                    <td @click="clickCT(50)">+50</td>
                    <td @click="clickCT(100)">+100</td>
                  </tr>
                  <tr>
                    <td @click="writeBetAmountKey(1)">1</td>
                    <td @click="writeBetAmountKey(2)">2</td>
                    <td @click="writeBetAmountKey(3)">3</td>
                    <td rowspan="2" @click="clickCT(0)"><span>Tất cả</span></td>
                  </tr>
                  <tr>
                    <td @click="writeBetAmountKey(4)">4</td>
                    <td @click="writeBetAmountKey(5)">5</td>
                    <td @click="writeBetAmountKey(6)">6</td>
                  </tr>
                  <tr>
                    <td @click="writeBetAmountKey(7)">7</td>
                    <td @click="writeBetAmountKey(8)">8</td>
                    <td @click="writeBetAmountKey(9)">9</td>
                    <td rowspan="2" @click="showMobileMenu = !showMobileMenu">Hoàn tất</td>
                  </tr>
                  <tr>
                    <td @click="writeBetAmountKey('.')">.</td>
                    <td @click="writeBetAmountKey(0)">0</td>
                    <td @click="deleteString">
                      <feather-icon class="cursor-pointer" icon="DeleteIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div :class="['c-body trans his-bet-wrapper']" :style="`${isOpenSideBar && !isTablet ? 'width: 230px' : ''}`"></div>
    </div>

    <div class="popupCongratulation" :class="{ block: isWinPop }">
      <div class="mask"></div>
      <div class="popupCongratulationContent">
        <div class="winLive flex justify-center">
          <div class="wrapNotify congratulation h-100">
            <div class="boxNotify">
              <img :src="require('@/assets/images/logo/logo.png')" alt="" class="iconWin" />
              <div class="badgeDemo" v-if="!blObj.isAccount">DEMO</div>
              <div class="boxContent flex justify-center items-center flex-col">
                <div class="flex items-center">
                  <!---->
                </div>
                <p class="titleWin">Xin chúc mừng!</p>
                <span class="message_money text-4xl font-bold">+{{ moneyWin }}VND</span>
              </div>
              <span class="cursor-pointer pointer"><i class="iconClose" data-feather="x"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue';
import Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import stockInit from 'highcharts/modules/stock';
import loadIndicatorsAll from 'highcharts/indicators/indicators';
import { isMobile, isTablet } from 'mobile-device-detect';
import getData from '@/pages/trade/navbar/components/data.json';
import config from '@/config';
import Vue from 'vue';
import AuthenticationService from '@/services/AuthenticationService';
import VScrollLock from 'v-scroll-lock';
import vSelect from 'vue-select';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { createPopper } from '@popperjs/core';

Vue.use(VScrollLock);

More(Highcharts);
stockInit(Highcharts);
loadIndicatorsAll(Highcharts);

let timer = null;

function convertTextValueMeter(t) {
  return t >= -90 && t <= -54
    ? { cl: 'rank-1', text: 'Strong sell', index: 1 }
    : t > -54 && t <= -18
    ? { cl: 'rank-2', text: 'Sell', index: 2 }
    : t > -18 && t <= 17
    ? { cl: 'rank-3', text: 'Neutral', index: 3 }
    : t > 17 && t <= 53
    ? { cl: 'rank-4', text: 'Buy', index: 4 }
    : t > 53
    ? { cl: 'rank-5', text: 'Strong Buy', index: 5 }
    : void 0;
}

var UP_COLOR = '#2BB196',
  DOWN_COLOR = '#FC5454',
  deviceVersion = 'pc';

var progressBar = $('.e-c-progress');
var lengthp = Math.PI * 2 * 100;
progressBar.css('stroke-dasharray', lengthp);

//circle ends
//let wholeTime = 30; // manage this to set the whole time

if (isMobile) {
  deviceVersion = 'mobile';
} else if (isTablet) {
  deviceVersion = 'tablet';
}

var listData = [],
  ohlcStock = [],
  volumeStock = [];

var chartGet = '';

const stockChart = {
  chart: {
    panning: false,
    followTouchMove: false,
    width: '100%',
    height: 'pc' !== deviceVersion ? '100%' : (9 / 16) * 100 + '%', // 16:9 ratio
    zoomType: '',
    backgroundColor: 'transparent',
    plotBackgroundImage: require('@/assets/images/sky/world_map.svg'),
    marginLeft: 0,
    marginRight: 'pc' !== deviceVersion ? 60 : 80,
    marginBottom: 'pc' !== deviceVersion ? 40 : 30,

    // margin: 0,
    // defaultSeriesType: 'areaspline',

    events: {
      // load(event) {
      // event.target.reflow();
      // }
    }
  },
  rangeSelector: {
    enabled: false,
    selected: 4
  },
  credits: {
    enabled: false
  },
  scrollbar: {
    enabled: false
  },
  navigator: {
    enabled: false
  },

  stockTools: {
    gui: {
      enabled: false
    }
  },
  exporting: {
    enabled: false
  },
  plotOptions: {
    candlestick: {
      lineColor: DOWN_COLOR,
      upLineColor: UP_COLOR,
      pointWidth: 'pc' !== deviceVersion ? 7 : 8,
      maxPointWidth: 'pc' !== deviceVersion ? 7 : 8
    },
    column: {
      minPointLength: 2,
      pointWidth: 'pc' !== deviceVersion ? 7 : 8,
      maxPointWidth: 'pc' !== deviceVersion ? 7 : 8,
      borderWidth: 0,
      pointPadding: 0,
      groupPadding: 0
    },
    series: {
      zIndex: 2,

      states: {
        inactive: {
          opacity: 1
        }
      },
      allowPointSelect: false,
      point: {
        events: {
          click() {}
        }
      }
    }
  },
  tooltip: {
    split: false,
    enabled: true,
    label: false,
    animation: false,
    backgroundColor: 'rgba(8,26,52,0.5)',
    borderColor: 'transparent',
    borderWidth: 0,
    shadow: false,
    stroke: 'transparent',
    useHTML: true,
    style: {
      color: '#fff',
      fontSize: '10px',
      stroke: 'transparent'
    },
    formatter() {
      return 'BTC/USDT' === this.series.name
        ? '\n<span style="margin-right: 10px;"><b>O</b>: ' +
            this.point.open +
            '</span>\n<span style="margin-right: 10px;"><b>C</b>: ' +
            this.point.close +
            '</span>\n<span>&nbsp;</span>\n<br/>\n<span style="margin-right: 10px;"><b>H</b>: ' +
            this.point.high +
            '</span>\n<span style="margin-right: 10px;"><b>L</b>: ' +
            this.point.low +
            '</span>\n<span><b>Vol</b>: ' +
            this.point.vol +
            '</span>'
        : 'Volume' === this.series.name
        ? '<b>Vol</b>: ' + this.y
        : '';
    },
    positioner() {
      var t = 20,
        e = 'pc' !== deviceVersion ? 50 : 60;
      return {
        x: t,
        y: e
      };
    }
  },
  xAxis: {
    type: 'datetime',
    labels: {
      enabled: true,
      padding: 0,
      formatter() {
        return Highcharts.dateFormat('%M:%S', this.value);
      },
      style: {
        fontSize: 10,
        color: '#707070'
      }
    },
    plotLines: [
      {
        value: 0,
        color: '#ffffff',
        width: 0.75,
        id: 'current-pricex',
        zIndex: 1e3,
        dashStyle: 'LongDash'
      }
    ],
    lineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: 'transparent',
    minorTickLength: 0,
    tickLength: 0,
    gridLineColor: '#243140',
    gridLineWidth: 1
  },
  yAxis: [
    {
      gridLineColor: '#243140',
      tickLength: 5,
      labels: {
        align: 'right',
        x: 'pc' !== deviceVersion ? 45 : 50,
        style: {
          color: '#fff',
          fontSize: '11px'
        }
      },
      height: '90%',
      top: 0,
      plotLines: [
        {
          value: 0,
          color: '#ffffff',
          width: 0.75,
          id: 'current-price',
          zIndex: 100,
          label: {
            useHTML: true,
            text: 0,
            x: 'pc' !== deviceVersion ? 60 : 70,
            align: 'right',
            style: {
              color: '#fff',
              fontSize: '11px',
              background: 'transparent',
              borderRadius: '4px'
            }
          }
        }
      ],
      lineWidth: 0,
      resize: {
        enabled: true
      }
    },
    {
      gridLineColor: '',
      visible: false,
      title: {
        align: 'high',
        text: null,
        rotation: 0,
        y: 0,
        useHTML: true
      },
      top: 'pc' == deviceVersion ? '83.4%' : '85%',
      height: '15%',
      lineWidth: 0,
      offset: 0
    }
  ],
  series: [
    {
      id: 'aapl',
      type: 'candlestick',
      name: 'BTC/USDT',
      color: DOWN_COLOR,
      upColor: UP_COLOR,
      data: ohlcStock
    },
    {
      type: 'column',
      name: 'Volume',
      data: volumeStock,
      yAxis: 1
    },
    {
      name: 'sma1',
      id: 'sma1',
      type: 'sma',
      linkedTo: 'aapl',
      color: '#2177FF',
      lineWidth: 2,
      marker: false,
      zIndex: 3,
      visible: true,
      enableMouseTracking: false,
      params: {
        index: '0',
        period: 10
      },
      allowPointSelect: false,
      point: {
        events: {
          // click: function(t) {
          //     setTimeout(function() {}, 500)
          // }
        },
        tooltip: {
          enabled: false
        }
      }
    },
    {
      name: 'sma2',
      id: 'sma2',
      type: 'sma',
      linkedTo: 'aapl',
      color: '#E22A67',
      lineWidth: 2,
      marker: false,
      zIndex: 3,
      visible: true,
      enableMouseTracking: false,
      params: {
        index: '1',
        period: 5
      },
      allowPointSelect: false,
      point: {
        events: {
          // click: function(t) {
          //     setTimeout(function() {}, 500)
          // }
        },
        tooltip: {
          enabled: false
        }
      }
    }
  ]
};

const gaugeMeterOs = {
  chart: {
    type: 'gauge',
    plotBorderWidth: null,
    backgroundColor: 'rgba(0,0,0,0)',
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    height: 70,
    spacingBottom: 0,
    spacingTop: 0,
    spacingLeft: 0,
    spacingRight: 0,
    events: {
      render(t) {
        let td = t.target.series[0].points[0].y;
        let n = convertTextValueMeter(td);
        $('.gauge-meter--os .gauge-meter-background').removeClass('rank-1 rank-2 rank-3 rank-4 rank-5').addClass(n.cl);
        $('.gauge-meter--os .gauge-meter-label-item').removeClass('active');
        $('.gauge-meter--os .gauge-meter-label-item:nth-child(' + n.index + ')').addClass('active');
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce'
    }
  },

  title: {
    text: ''
  },

  pane: [
    {
      startAngle: -90,
      endAngle: 90,
      background: null,
      center: ['50%', '105%'],
      size: 140
    }
  ],

  credits: {
    enabled: false
  },

  exporting: {
    enabled: false
  },

  tooltip: {
    enabled: false
  },

  yAxis: [
    {
      min: -90,
      max: 90,
      minorTickPosition: 'outside',
      tickPosition: 'outside',
      labels: {
        rotation: 'auto',
        distance: 0,
        style: {
          color: 'rgba(0,0,0,0)'
        }
      },
      pane: 0,
      title: '',
      minorTickColor: 'rgba(0,0,0,0)',
      lineColor: 'rgba(0,0,0,0)',
      tickColor: 'rgba(0,0,0,0)'
    }
  ],

  plotOptions: {
    gauge: {
      dataLabels: {
        enabled: false
      },
      dial: {
        radius: '85%',
        baseLength: '1%',
        rearLength: 0,
        backgroundColor: {
          linearGradient: {
            x1: 1,
            y1: 0,
            x2: 0,
            y2: 0
          },
          stops: [
            [0, '#fff'],
            [1, '#000']
          ]
        },
        baseWidth: 6,
        topWidth: 3
      }
    }
  },

  series: [
    {
      name: 'Oscillator',
      data: [10],
      yAxis: 0
    }
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 71
        },
        chartOptions: {
          chart: {
            height: 35
          },
          pane: [
            {
              size: 70
            }
          ]
        }
      }
    ]
  }
};

const gaugeMeterSu = {
  chart: {
    type: 'gauge',
    plotBorderWidth: null,
    backgroundColor: 'rgba(0,0,0,0)',
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    height: 88,
    spacingBottom: 0,
    spacingTop: 0,
    spacingLeft: 0,
    spacingRight: 0,
    events: {
      render(t) {
        let td = t.target.series[0].points[0].y;
        let n = convertTextValueMeter(td);
        $('.gauge-meter--su .gauge-meter-background').removeClass('rank-1 rank-2 rank-3 rank-4 rank-5').addClass(n.cl);
        $('.gauge-meter--su .gauge-meter-label-item').removeClass('active');
        $('.gauge-meter--su .gauge-meter-label-item:nth-child(' + n.index + ')').addClass('active');
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce'
    }
  },

  title: {
    text: ''
  },

  pane: [
    {
      startAngle: -90,
      endAngle: 90,
      background: null,
      center: ['50%', '105%'],
      size: 176
    }
  ],

  credits: {
    enabled: false
  },

  exporting: {
    enabled: false
  },

  tooltip: {
    enabled: false
  },

  yAxis: [
    {
      min: -90,
      max: 90,
      minorTickPosition: 'outside',
      tickPosition: 'outside',
      labels: {
        rotation: 'auto',
        distance: 0,
        style: {
          color: 'rgba(0,0,0,0)'
        }
      },
      pane: 0,
      title: '',
      minorTickColor: 'rgba(0,0,0,0)',
      lineColor: 'rgba(0,0,0,0)',
      tickColor: 'rgba(0,0,0,0)'
    }
  ],

  plotOptions: {
    gauge: {
      dataLabels: {
        enabled: false
      },
      dial: {
        radius: '85%',
        baseLength: '1%',
        rearLength: 0,
        backgroundColor: {
          linearGradient: {
            x1: 1,
            y1: 0,
            x2: 0,
            y2: 0
          },
          stops: [
            [0, '#fff'],
            [1, '#000']
          ]
        },
        baseWidth: 6,
        topWidth: 3
      }
    }
  },

  series: [
    {
      name: 'Summary',
      data: [10],
      yAxis: 0
    }
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 89
        },
        chartOptions: {
          chart: {
            height: 44
          },
          pane: [
            {
              size: 88
            }
          ]
        }
      }
    ]
  }
};

const gaugeMeterMa = {
  chart: {
    type: 'gauge',
    plotBorderWidth: null,
    backgroundColor: 'rgba(0,0,0,0)',
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    height: 70,
    spacingBottom: 0,
    spacingTop: 0,
    spacingLeft: 0,
    spacingRight: 0,
    events: {
      render(t) {
        let td = t.target.series[0].points[0].y;
        let n = convertTextValueMeter(td);
        $('.gauge-meter--ma .gauge-meter-background').removeClass('rank-1 rank-2 rank-3 rank-4 rank-5').addClass(n.cl);
        $('.gauge-meter--ma .gauge-meter-label-item').removeClass('active');
        $('.gauge-meter--ma .gauge-meter-label-item:nth-child(' + n.index + ')').addClass('active');
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce'
    }
  },

  title: {
    text: ''
  },

  pane: [
    {
      startAngle: -90,
      endAngle: 90,
      background: null,
      center: ['50%', '105%'],
      size: 140
    }
  ],

  credits: {
    enabled: false
  },

  exporting: {
    enabled: false
  },

  tooltip: {
    enabled: false
  },

  yAxis: [
    {
      min: -90,
      max: 90,
      minorTickPosition: 'outside',
      tickPosition: 'outside',
      labels: {
        rotation: 'auto',
        distance: 0,
        style: {
          color: 'rgba(0,0,0,0)'
        }
      },
      pane: 0,
      title: '',
      minorTickColor: 'rgba(0,0,0,0)',
      lineColor: 'rgba(0,0,0,0)',
      tickColor: 'rgba(0,0,0,0)'
    }
  ],

  plotOptions: {
    gauge: {
      dataLabels: {
        enabled: false
      },
      dial: {
        radius: '85%',
        baseLength: '1%',
        rearLength: 0,
        backgroundColor: {
          linearGradient: {
            x1: 1,
            y1: 0,
            x2: 0,
            y2: 0
          },
          stops: [
            [0, '#fff'],
            [1, '#000']
          ]
        },
        baseWidth: 6,
        topWidth: 3
      }
    }
  },

  series: [
    {
      name: 'ma',
      data: [10],
      yAxis: 0
    }
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 71
        },
        chartOptions: {
          chart: {
            height: 35
          },
          pane: [
            {
              size: 70
            }
          ]
        }
      }
    ]
  }
};

export default {
  components: {
    highcharts: Chart,
    vSelect
  },
  data() {
    return {
      streak: 0,
      thisIDPlayer: 0,
      totalBuyStatic: 0,
      totalSellStatic: 0,

      //Moving
      NumMovBUY: 0,
      NumMovSELL: 0,
      NumMovNeutral: 0,
      textTitleMa: 'NEUTRAL',

      //Oscillators
      NumOscBUY: 0,
      NumOscSELL: 0,
      NumOscNeutral: 0,
      textTitleOs: 'NEUTRAL',

      //Summary
      NumSumBUY: 0,
      NumSumSELL: 0,
      NumSumNeutral: 0,
      textTitleSu: 'NEUTRAL',

      moneyWin: 0,
      isWinPop: false,
      blObj: {...getData},
      isBet: true,
      CSBUY: 0,
      CSSELL: 0,
      isOrder: true,
      activeGau: false,
      activeHis: true,
      balanceForuser: 0,
      showMobileMenu: false,
      betAmount: 10,
      loiNhuan: 19.5,
      optionsOs: gaugeMeterOs,
      optionsSu: gaugeMeterSu,
      optionsMa: gaugeMeterMa,
      chartOptionsStock: stockChart,
      betOpen: {
        s: 0,
        l: {
          bet: [
            {
              items: []
            }
          ]
        }
      },
      isTablet,
      session: 0,
      amounts: [
        {
          label: '20K',
          code: 20000
        },
        /*{
          label: '50K',
          code: 50000
        },*/
        {
          label: '100K',
          code: 100000
        },
       /* {
          label: '200K',
          code: 200000
        },
        {
          label: '500K',
          code: 500000
        },*/
        {
          label: '1M',
          code: 1000000
        },
        /*{
          label: '2M',
          code: 2000000
        },
        {
          label: '3M',
          code: 3000000
        },*/
        {
          label: '5M',
          code: 5000000
        },
        {
          label: '10M',
          code: 10000000
        },
        {
          label: '20M',
          code: 20000000
        },
      /*  {
          label: '30M',
          code: 30000000
        },*/
        {
          label: '50M',
          code: 50000000
        },
        {
          label: '100M',
          code: 100000000
        },
        {
          label: '200M',
          code: 200000000
        },
        {
          label: '300M',
          code: 300000000
        }
      ],
      selectedAmount: {
        label: '20k',
        code: 20000
      },
      unit: 'K',
      multiple: 1000,
      placement: 'top'
    };
  },
  computed: {
    seconDown() {
      const getData = this.blObj
      return getData.countDown;
    },
    textTimeDown() {
      const getData = this.blObj
      return getData.textTimeDown;
    },
    isOpenSideBar() {
      const isOpenSideBarStore = this.$store.state.isOpenSideBar;
      return isOpenSideBarStore;
    }
  },
  watch: {
    selectedAmount: {
      handler: function (val) {
        const { code } = val;
        if (code >= 1000000) {
          this.unit = 'M';
          this.multiple = 1000000;
        } else {
          this.unit = 'K'
          this.multiple = 1000
        }
        this.betAmount = code;
        this.tinhloinhuan(code / this.multiple);
      },
      immediate: true
    },
    session(ss) {
      let streak = JSON.parse(localStorage.getItem('streak') || '{}');
      if (streak.session != ss - 1) {
        localStorage.removeItem('streak');
        this.streak = 0;
      }
    },
    showMobileMenu: function (newVal) {
      if (!newVal) {
        window.scrollTo(0, 0);
      }
    },
    'oscillators.meter.numberValue': function () {
      this.redrawGaugeMeter('oscillators'), this.redrawGaugeMeter('summary');
    },
    'movingAverages.meter.numberValue': function () {
      this.redrawGaugeMeter('movingAverages'), this.redrawGaugeMeter('summary');
    },
    isOpenSideBar: function (isOpenSideBarStore) {
      const tradeView = document.querySelector('.highcharts-container');
      const cDesktop = document.querySelector('.c-desktop');
      const historyBox = document.querySelector('.historyBox');
      const gaugeMeter = document.querySelector('.wrap-gauge-meter');
      const analysis = document.querySelector('#analysis-wrapper');

      if (isTablet || isMobile) return isOpenSideBarStore;
      if (isOpenSideBarStore) {
        if (tradeView) {
          // tradeView.style.transform = `translateX(-230px)`;
        }
        if (cDesktop) {
          // cDesktop.style.transform = `translateX(-230px)`;
        }
        if (historyBox) {
          // historyBox.style.transform = `translateX(-230px)`;
          /*    historyBox.style.width = "calc(100% - 230px)";
          historyBox.style.setProperty('--width', (analysis.clientWidth - 230) / analysis.clientWidth);*/
        }
        if (gaugeMeter) {
          // gaugeMeter.style.transform = `translateX(-128px)`;
        }
      } else {
        if (tradeView) {
          tradeView.style.transform = `translateX(0px)`;
        }
        if (cDesktop) {
          cDesktop.style.transform = `translateX(0px)`;
        }
        if (historyBox) {
          // historyBox.style.transform = `translateX(0px)`;
          historyBox.style.width = '100%';
          historyBox.style.setProperty('--width', 1);
        }
        if (gaugeMeter) {
          gaugeMeter.style.transform = `translateX(0px)`;
        }
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('TOGGLE_IS_OPEN_SIDEBAR', false);
    const tradeView = document.querySelector('.highcharts-container');
    if (tradeView) {
      tradeView.style.transform = `translateX(0px)`;
    }
  },
  methods: {
    createOption(code){
      return {
        label: this.formatPrice(code),
        code
      }
    },
    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width;
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1]
            }
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle('drop-up', true);
            }
          }
        ]
      });
      return () => popper.destroy();
    },
    setStreak(result) {
      if ((result.kq == 'lose' && result.money < 10) || (result.kq == 'win' && result.money < 19.5)) {
        localStorage.setItem('streak', JSON.stringify(streak));
        return;
      }
      let streak = JSON.parse(localStorage.getItem('streak') || '{}');
      if (streak.last == result.kq) {
        if (this.streak < 9) {
          this.streak += 1;
        }
      } else {
        this.streak = 1;
      }
      streak.count = this.streak;
      streak.last = result.kq;
      streak.session = this.session;
      localStorage.setItem('streak', JSON.stringify(streak));
    },

    disabledBet() {
      return (this.isBet = !this.isBet ? true : false);
    },
    sendMessage(message) {
      this.connection.send(JSON.stringify(message));
    },

    replaceAll(str, find, replace) {
      return Number(str.replace(new RegExp(find, 'g'), replace));
    },

    changeBlance(v) {
      const getData = this.blObj
      if (getData.isAccount) {
        getData.blLive = getData.blLive - v;
      } else {
        getData.blDemo = getData.blDemo - v;
      }

      this.balanceForuser = getData.isAccount ? getData.blLive : getData.blDemo;
      this.$store.dispatch('setCurrentBalance', this.balanceForuser)
    },

    checkBet(v) {
      const getData = this.blObj
      // lấy tổng số dư của tài khoản
      let sodu = getData.isAccount ? getData.blLive : getData.blDemo;

      this.balanceForuser = sodu;
      this.$store.dispatch('setCurrentBalance', this.balanceForuser)
      if (sodu < v) return true;
    },

    BetBuySell(v) {
      this.playAudio("order");
      const getData = this.blObj
      if (getData.countDown <= 1) {
        return this.$vs.notify({
          text: 'Vui lòng đợi phiên sau!',
          color: 'order_fail',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-x'
        });
      }
      //this.isBet = false

      let gAmount = this.betAmount.toString();
      gAmount = this.replaceAll(gAmount, ',', '');

      if (this.checkBet(gAmount)) {
        return this.$vs.notify({
          text: 'Số dư của bạn không đủ',
          color: 'order_fail',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-x'
        });
      }
      if (+gAmount < 20000) {
        return this.$vs.notify({
          text: `Số tiền tối thiểu là 20k.`,
          iconPack: "feather",
          icon: "icon-check",
          position: "top-right",
          color: "danger",
        });
      }
      let email = getData.email;
      let typeAccount = getData.isAccount;
      let uidLive = getData.uidLive;
      let uidDemo = getData.uidDemo;
      let uidAcc = 0;

      this.changeBlance(gAmount);

      if (typeAccount == 1) {
        uidAcc = uidLive;
      } else {
        uidAcc = uidDemo;
      }

      let obj = {
        email: email,
        uid: uidAcc,
        ref: getData.ref,
        UpId: getData.upid,
        typeAccount: typeAccount, // 0: demo: 0 , 1: live
        betAmount: gAmount,
        type: v,
        mkt: getData.mkt,
        forceWin: this.$store.state.forceWin
        //idPlayer: this.thisIDPlayer
      };

      this.sendMessage({ type: 'bet', data: obj });

      let ss = this.$store.session;
      let timeGet = new Date().getTime();

      this.betOpen.s = ss;
      let itp = {
        ss: ss,
        time: timeGet,
        amt: gAmount,
        type: v,
        acc_type: typeAccount,
        currencyType: 'BTC/USD',
        classIcon: 'iconBitcoin'
      };

      this.betOpen.l.bet[0].items.push(itp);

      localStorage.setItem('stateOpen', JSON.stringify(this.betOpen));

      window.dispatchEvent(
        new CustomEvent('stateOpen-localstorage-changed', {
          detail: {
            storage: localStorage.getItem('stateOpen')
          }
        })
      );

      getData.Notify = this.betOpen.l.bet[0].items.length;

      this.clearBAmount();

      // if(v === 'buy'){

      // }else{

      //     return this.$vs.notify({
      //         text:'Đặt lệnh thành công',
      //         color:'success',
      //         position:'top-right',
      //         iconPack: 'feather',
      //         icon:'icon-check'});
      // }
    },
    // 输入框弹出键盘点击事件
    deleteString() {
      let getAmount = this.betAmount.toString();
      let total = getAmount.slice(0, -1);
      let sl = total.split('.');
      let check = sl.length - 1;
      if (check == 1) {
        let g = this.replaceAll(total, ',', '');
        //console.log(g)
        this.betAmount = this.formatPrice(g, sl[1].length);
        this.tinhloinhuan(g);
        return;
      }
      let g = this.getOnlyNumberInString(total, ',', '');
      this.betAmount = this.formatPrice(g, 0);
      this.tinhloinhuan(g);
    },
    // 输入框弹出键盘点击事件
    writeBetAmountKey(v) {
      let getAmount = this.betAmount.toString() + v;
      let sl = getAmount.split('.');
      let check = sl.length - 1;
      if (v == '.') {
        this.betAmount = getAmount;
        return;
      }
      if (check > 1) return;
      if (check == 1) {
        let g = this.replaceAll(getAmount, ',', '');
        this.betAmount = this.formatPrice(g, sl[1].length);
        this.tinhloinhuan(g);
        return;
      }
      let a = this.getOnlyNumberInString(getAmount);
      this.betAmount = this.formatPrice(a, 0);
      this.tinhloinhuan(a);
    },
    // 输入框左边按钮
    congBetAmount() {
      let getAmount = this.betAmount.toString();
      let sl = getAmount.split('.');
      let check = sl.length - 1;
      if (check > 1) return;
      let tt = 0;
      if (check == 1) {
        tt = this.replaceAll(getAmount, ',', '');
        let kq = tt * 2;
        this.betAmount = this.formatPrice(kq, sl[1].length);
        this.tinhloinhuan(kq);
        return;
      }
      let a = this.getOnlyNumberInString(getAmount);
      tt = a * 2;
      this.tinhloinhuan(tt);
      this.betAmount = this.formatPrice(tt, 0);
    },
    // 输入框右边边按钮
    truBetAmount() {
      let getAmount = this.betAmount.toString();
      let sl = getAmount.split('.');
      let check = sl.length - 1;
      if (check > 1) return;
      let tt = 0;
      if (check == 1) {
        tt = this.replaceAll(getAmount, ',', '');
        let kq = tt / 2;
        this.betAmount = this.formatPrice(kq, sl[1].length);
        this.tinhloinhuan(kq);
        return;
      }
      let a = this.getOnlyNumberInString(getAmount);
      tt = a / 2;
      this.tinhloinhuan(tt);
      this.betAmount = this.formatPrice(tt, 0);
    },
    // 输入框输入事件
    nhapBetAmount(e) {
      let g = e.target.value;
      let check = g.split('.').length - 1;
      if (check > 1) return;

      if (check == 1) {
        g = this.replaceAll(g, ',', '');
        this.tinhloinhuan(g);
        return;
      }
      g = this.getOnlyNumberInString(g);
      this.betAmount = this.formatPrice(g, 0);
      this.tinhloinhuan(g);
    },

    formatPrice(value, minimum) {
      var formatter = new Intl.NumberFormat('en-US', {
        //style: 'currency',
        //currency: '',
        minimumFractionDigits: minimum
      });
      let val = Number(value).toFixed(0)
      return formatter.format(val);
    },

    tinhloinhuan(m) {
      let lb = Number(m);
      lb = lb + (lb * 95) / 100;
      // tính lợi nhuận 95%
      console.log('tinhloinhuan', lb)
      // this.loiNhuan = this.formatPrice(lb, 0);
      this.loiNhuan = lb;
    },

    getOnlyNumberInString(t) {
      let e = t.match(/\d+/g);

      return e ? Number(e.join('')) : 0;
    },

    clearBAmount() {
      const {code} = this.selectedAmount
      this.tinhloinhuan(code / this.multiple);
      this.betAmount = code;
    },

    clickCT(amount) {
      let getAmount = this.betAmount.toString();
      getAmount = this.betAmount.toString();

      if (amount == 0) {
        getAmount = getData.isAccount ? getData.blLive.toString() : getData.blDemo.toString();
      }

      let check = getAmount.split('.').length - 1;
      if (check > 1) return;

      if (check == 1) {
        getAmount = this.replaceAll(getAmount, ',', '');
        let tt = getAmount + amount;
        this.tinhloinhuan(tt);
        this.betAmount = tt;
        return;
      }
      let aB = this.getOnlyNumberInString(getAmount);
      let tt = aB + amount;
      this.betAmount = tt;
      this.tinhloinhuan(tt);
    },

    editUser() {
      //this.sidebarData = data
      this.toggleDataSidebar(true);
    },

    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },

    updateBarChart(boPrice) {
      var chartInstance = chartGet;
      try {
        var lastCandle = chartInstance.series[1].points[chartInstance.series[1].points.length - 1];
        var color = this.getColor(boPrice.open, boPrice.close);
        if (lastCandle.x === boPrice?.date) {
          lastCandle.update(
            {
              x: boPrice.date,
              y: boPrice.volume,
              color: color
            },
            true
          );
        } else {
          chartInstance.series[1].addPoint(
            {
              x: boPrice.date,
              y: boPrice.volume,
              color: color
            },
            true,
            true
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        //
      }
    },

    updateCandleStickChart(boPrice) {
      const getData = this.blObj
      var chartInstance = chartGet;

      try {
        var lastCandle = chartInstance.series[0].points[chartInstance.series[0].points.length - 1];
        var color = this.getColor(boPrice.open, boPrice.close);

        var counter = Number(boPrice.candleClose);

        var o = {
          x: boPrice.date,
          open: boPrice.open.toFixed(2) * 1,
          high: boPrice.high.toFixed(2) * 1,
          low: boPrice.low.toFixed(2) * 1,
          close: boPrice.close.toFixed(2) * 1,
          vol: boPrice.volume.toFixed(2) * 1,
          color: color
        };
        if (lastCandle.x === boPrice.date) {
          lastCandle.update(o, true);
        } else {
          chartInstance.series[0].addPoint(o, true, true);

          // if(listData.length >= 200){
          //     listData.shift();
          // }
          //console.log(boPrice);
          listData.push(boPrice);
          let begin = 0;
          //console.log(listData);
          const { dataMax } = chartInstance.xAxis[0].getExtremes();
          begin = this.setSizeStock(listData);
          chartGet.xAxis[0]?.setExtremes(listData[begin]?.date, dataMax, false);
          chartGet.redraw();
        }
        chartInstance.xAxis[0].options.plotLines[0].value = boPrice.date;
        chartInstance.yAxis[0].options.plotLines[0].value = boPrice.close;

        let f = chartInstance.yAxis[0].plotLinesAndBands[0];

        f.label &&
          f.label.attr({
            text: '<div class="plotlineChart flex flex-col"><span class="price">' + boPrice.close + '</span><span class="time self-end">00:' + (counter > 9 ? counter : '0' + counter) + '</span></div>'
          });
        if (boPrice.type === 'order') {
          this.isOrder = true;
          this.isBet = true;
          getData.textTimeDown = 'Hãy đặt lệnh';
        } else {
          this.isOrder = false;
          this.isBet = false;
          getData.textTimeDown = 'Chờ kết quả';
        }

        getData.countDown = counter > 9 ? counter : '0' + counter;
      } catch {}
    },

    getColor(openPrice, closePrice) {
      return openPrice < closePrice ? UP_COLOR : DOWN_COLOR;
    },

    onReceiveSocketData(boPrice) {
      this.updateCandleStickChart(boPrice);
      this.updateBarChart(boPrice);
    },

    StaOscillators(e) {
      try {
        let chart = this.$refs.chartOs.chart;

        let left = chart.series[0].points[0],
          leftVal;
        //Oscillators
        this.NumOscBUY = e.b;
        this.NumOscSELL = e.s;
        this.NumOscNeutral = e.m;

        if ((e.m > e.s && e.m > e.b) || (e.m === e.s && e.m === e.b)) {
          this.textTitleOs = 'NEUTRAL';
          left.update(0, true);
          chart.redraw();
        }
        if (e.s > e.b) {
          leftVal = -35;
          this.textTitleOs = 'SELL';
          if (e.s >= 5) (leftVal = -70), (this.textTitleOs = 'STRONG SELL');
          left.update(leftVal, true);
          chart.redraw();
        } else if (e.s < e.b) {
          leftVal = 35;
          this.textTitleOs = 'BUY';
          if (e.b >= 5) (leftVal = 70), (this.textTitleOs = 'STRONG BUY');
          left.update(leftVal, true);
          chart.redraw();
        }
      } catch {}
    },

    StaSummary(e) {
      try {
        let chart = this.$refs.chartSu.chart;

        let left = chart.series[0].points[0],
          leftVal;

        //Summary
        this.NumSumBUY = e.b;
        this.NumSumSELL = e.s;
        this.NumSumNeutral = e.m;

        if ((e.m > e.s && e.m > e.b) || (e.m === e.s && e.m === e.b)) {
          this.textTitleSu = 'NEUTRAL';
          left.update(0, true);
          chart.redraw();
          return;
        }
        if (e.s > e.b) {
          leftVal = -35;
          this.textTitleSu = 'SELL';
          if (e.s >= 5) (leftVal = -70), (this.textTitleSu = 'STRONG SELL');
          left.update(leftVal, true);
          chart.redraw();
        } else if (e.s < e.b) {
          leftVal = 35;
          this.textTitleSu = 'BUY';
          if (e.b >= 5) (leftVal = 70), (this.textTitleSu = 'STRONG BUY');
          left.update(leftVal, true);
          chart.redraw();
        }
      } catch {}
    },

    StaMovingAverages(e) {
      try {
        let chart = this.$refs.chartMa.chart;
        let left = chart.series[0].points[0],
          leftVal;
        //Moving

        this.NumMovBUY = e.b;
        this.NumMovSELL = e.s;
        this.NumMovNeutral = e.m;

        if ((e.m > e.s && e.m > e.b) || (e.m === e.s && e.m === e.b)) {
          this.textTitleMa = 'NEUTRAL';
          left.update(0, true);
          chart.redraw();
          return;
        }
        if (e.s > e.b) {
          leftVal = -35;
          this.textTitleMa = 'SELL';
          if (e.s >= 5) (leftVal = -70), (this.textTitleMa = 'STRONG SELL');
          left.update(leftVal, true);
          chart.redraw();
        } else if (e.s < e.b) {
          leftVal = 35;
          this.textTitleMa = 'BUY';
          if (e.b >= 5) (leftVal = 70), (this.textTitleMa = 'STRONG BUY');
          left.update(leftVal, true);
          chart.redraw();
        }
      } catch {}
    },

    // setSizeStock(){
    setSizeStock(data) {
      var chartWidth = parseInt($('.chartBox').width());

      let numBar = Math.floor((chartWidth - 90) / 13.44); //90 17.44 13.44
      if (numBar < data.length - 10) {
        return data.length - numBar;
      }
      return 10;

      // var chartWidth = parseInt($('.chartBox').width());
      // if (chartWidth < 400) {
      //     return 65;
      // }

      // if (chartWidth > 400 && chartWidth < 800) {
      //     return 95;
      // }
    },

    getDataDefaultGet(get) {
      let data = get;
      (ohlcStock = []), (volumeStock = []);

      var begin = 0;

      // if (deviceVersion !== "pc") {
      //   begin = this.setSizeStock(data);
      // } else {
      //   let getWidth = parseInt($("body").width());
      //   if (getWidth >= 1260 && getWidth <= 1500) {
      //     begin = 65;
      //   }
      //   if (getWidth >= 1500 && getWidth <= 1600) {
      //     begin = 45;
      //   }
      //   if (getWidth >= 820 && getWidth <= 1260) {
      //     begin = 75;
      //   }
      //   if (getWidth > 1500) {
      //     begin = 55;
      //   }
      // }

      for (var i = begin; i < data.length; i++) {
        var _o = {
          x: data[i].date, // the date
          open: data[i].open, // open
          high: data[i].high, // high
          low: data[i].low, // low
          close: data[i].close, // close
          vol: data[i].volume // volume
        };
        ohlcStock.push(_o);

        volumeStock.push({
          x: data[i].date, // the date
          y: data[i].volume, // the volume
          color: data[i].open < data[i].close ? UP_COLOR : DOWN_COLOR
        });
      }
      stockChart.series[0].data = ohlcStock;
      stockChart.series[1].data = volumeStock;
      this.chartOptionsStock = stockChart;

      let ao = setInterval(() => {
        if (chartGet != '') {
          clearInterval(ao);
          const { dataMax } = chartGet.xAxis[0].getExtremes(); //dataMin
          begin = this.setSizeStock(listData);
          chartGet.xAxis[0]?.setExtremes(data[begin]['date'], dataMax, false);
          chartGet.redraw();
        }
      }, 100);
    },

    setChartHeight() {
      if (window.innerWidth > 768) {
        deviceVersion = 'pc';
      } else {
        deviceVersion = 'mobile';
      }
      let setS = setInterval(() => {
        let w = $('.chartBox').width();
        let h = $('.chartBox').height();
        if (!!w && !!h) {
          let cH = this.$refs.chartStock?.chart.chartHeight;
          if (cH !== h) {
            let chartInstance = this.$refs.chartStock?.chart;
            chartInstance?.setSize($('.chartBox').width(), $('.chartBox').height(), true);
            chartGet = chartInstance;
          } else {
            clearInterval(setS);
          }
        }
      }, 600);
      this.$forceUpdate();
    },

    resizeBieuDo() {
      this.sendMessage({ type: 'getListData' });
      if (window.innerWidth > 768) {
        deviceVersion = 'pc';
      } else {
        deviceVersion = 'mobile';
      }
      let chartInstance = this.$refs.chartStock?.chart;
      chartInstance?.setSize($('.chartBox').width(), $('.chartBox').height(), true);
      chartGet = chartInstance;
      this.$forceUpdate();
      this.setWidthHistoryBox();
    },

    setWidthHistoryBox() {
      const historyBox = document.querySelector('.historyBox');
      const analysis = document.querySelector('#analysis-wrapper');
      if (historyBox && historyBox.clientWidth) {
        historyBox.style.setProperty('--width', historyBox.clientWidth / analysis.clientWidth);
      }
    },

    onWindowLoad() {
      const getData = this.blObj
      let uidLive = getData.uidLive;
      let uidDemo = getData.uidDemo;
      let uidAcc = 0;

      let acc = localStorage.getItem("BO_BALANCE_TYPE");
      if (acc != "DEMO") {
        getData.isAccount = 1;
      } else {
        getData.isAccount = 0;
      }

      getData.isAccount ? (uidAcc = uidLive) : (uidAcc = uidDemo);

      this.sendMessage({
        type: 'accountDetail',
        data: { uid: uidAcc, email: getData.email }
      });

      let notify = JSON.parse(localStorage.getItem('stateOpen'));
      if (notify) {
        getData.Notify = notify.l.bet[0].items.length;
      }
    },

    addSound() {
      createjs.Sound.alternateExtensions = ['mp3'];
      createjs.Sound.registerSounds([
        {
          id: 'win',
          src: require('@/assets/sounds/win-n.mp3')
        },
        {
          id: 'lose',
          src: require('@/assets/sounds/lose-n.mp3')
        },
        {
          id: 'order',
          src: require('@/assets/sounds/order-n.mp3')
        }
      ]);
    },

    playAudio(v) {
      let checkSound = localStorage.getItem('SOUND');
      if (checkSound === 'false') return;
      createjs.Sound.play(v);

      // let sound;
      // if(v == 'win'){
      //    // sound = require('@/assets/sounds/win-n.mp3');
      // }else if(v == 'lose'){
      //   //  sound = require('@/assets/sounds/lose-n.mp3');
      // }else if(v == 'order'){
      //    // sound = require('@/assets/sounds/order-n.mp3');
      // }
      // var audio = new Audio(sound);
      // audio.play();
    },

    getUserInfo() {
      const getData = this.blObj
      AuthenticationService.getInfoUser().then((res) => {
        if (res.data.success == 1) {
          let gData = res.data.data;

          (getData.uid = gData.id),
            (getData.email = gData.email),
            (getData.profile_image = gData.profile_image),
            (getData.displayName = gData.nick_name),
            (getData.uidLive = gData.order[1]?.u_id),
            (getData.uidDemo = gData.order[0]?.u_id),
            (getData.vip = gData.vip),
            (getData.vip_lv = gData.level_vip),
            (getData.pen_commiss = gData.pending_commission),
            (getData.ref = gData.ref),
            (getData.c2fa = gData.fa2),
            (getData.id_front = gData.id_front),
            (getData.id_back = gData.id_back),
            (getData.first_name = gData.first_name),
            (getData.last_name = gData.last_name),
            (getData.verify = gData.verify),
            (getData.num_secu = gData.num_secury),
            (getData.country = gData.c),
            (getData.blLive = gData.order[1]?.balance ?? 0);
          getData.blDemo = gData.order[0]?.balance ?? 0;
          (getData.balance = gData.balance), (getData.mkt = gData.mkt);
          this.balanceForuser = getData.isAccount ? getData.blLive : getData.blDemo;
          this.$store.dispatch('setCurrentBalance', this.balanceForuser)
          localStorage.setItem('INFO', JSON.stringify(gData));
        } else {
          window.location.href = window.location.origin + '/login';
        }
      });
    }
  },
  created() {
    const getData = this.blObj
    //let token = localStorage.getItem('token')
    //this.$store.dispatch('setToken', token)
    let streak = JSON.parse(localStorage.getItem('streak') || '{}');
    this.streak = streak.count || 0;
    let acc = localStorage.getItem("BO_BALANCE_TYPE");
    if (acc != "DEMO") {
      getData.isAccount = 1;
    } else {
      getData.isAccount = 0;
    }

    // lấy tổng số dư của tài khoản
    this.balanceForuser = getData.isAccount ? getData.blLive : getData.blDemo;
    this.$store.dispatch('setCurrentBalance', this.balanceForuser)
    this.connection = new ReconnectingWebSocket(config.BASE_URL_SOCKET);

    this.connection.onopen = function () {
      // console.log("Successfully connected to the echo websocket server...")
      this.onWindowLoad();
      this.getUserInfo();
    }.bind(this);

    this.connection.onmessage = function (event) {
      let data = JSON.parse(event.data);

      let dl = data.data;
      if (data.type === 'getListDauTien') {
        if (!!dl) {
          listData = dl;
          this.getDataDefaultGet(dl);
        }
      }
      if (data.type === 'getidPlayer') {
        this.thisIDPlayer = data.data;
      }
      if (data.type === 'allData') {
        this.session = data.data.session;
        this.onReceiveSocketData(dl);
      }
      if (data.type === 'transVolum') {
        if (dl.nbuy) {
          this.CSBUY = dl.ptbuy;
          this.CSSELL = dl.ptsell;
        }
      }
      if (data.type === 'checkBet') {
        this.$store.dispatch('setCurrentBalance', data.balance)
        this.isBet = true;
        return this.$vs.notify({
          text: 'Đặt lệnh thành công',
          color: 'order_success',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-check'
        });
      }
      if (data.type === 'kq') {
        //console.log(dl);
        if (getData.isAccount) {
          this.setStreak(dl);
        }
        if (this.$store.state.forceWin || dl.kq == 'win') {
          let mn = dl.money;

          this.playAudio('win');

          if (getData.isAccount) {
            getData.blLive = getData.blLive + mn;
          } else {
            getData.blDemo = getData.blDemo + mn;
          }

          this.moneyWin = this.formatPrice(mn, 2);
          this.isWinPop = true;
          setTimeout(() => {
            this.isWinPop = false;
          }, 3000);
        } else {
          this.playAudio('lose');
        }
        // xóa notice = 0
        getData.Notify = 0;
        this.betOpen.l.bet[0].items = [];
        localStorage.removeItem('stateOpen');
        window.dispatchEvent(
          new CustomEvent('stateOpen-localstorage-changed', {
            detail: {
              storage: undefined
            }
          })
        );
        this.getUserInfo();
      }
      if (data.type === 'mess') {
        if (dl.type == 'bet') {
          const color = dl.style !== 'danger' ? dl.style : 'order_fail';
          return this.$vs.notify({
            text: dl.mess,
            color: color,
            position: 'top-right',
            iconPack: 'feather',
            icon: 'icon-x'
          });
        }

        if (dl.type === 'disAccount') {
          // đăng xuất tài khoản
          setTimeout(() => {
            localStorage.removeItem('tokenUser');
            localStorage.removeItem('INFO');
            getData.Notify = 0;
            localStorage.removeItem('stateOpen');
            window.location.href = window.location.origin + '/login';
          }, 3000);
          const color = dl.style !== 'danger' ? dl.style : 'order_fail';
          return this.$vs.notify({
            text: dl.mess,
            color: color,
            position: 'top-right',
            iconPack: 'feather',
            icon: 'icon-x'
          });
        }

        if (dl.type === 'reloadAccount') {
          location.reload();
        }
      }
      if (data.type === 'static') {
        let indicato = data.load;

        this.StaOscillators(indicato.Oscillators);
        this.StaSummary(indicato.Summary);
        this.StaMovingAverages(indicato.Moving);

        //this.totalBuyStatic = dl.cbuy;
        //this.totalSellStatic = dl.csell;

        let sta = dl.static;

        let stl = sta.length;
        let istart = 0;
        let csl = 40;
        this.totalBuyStatic = this.totalSellStatic = 0;
        //if(isMobile){ // rs lại tổng số
        //    this.totalBuyStatic = this.totalSellStatic = 0;
        //}
        if (isMobile && stl > 60) {
          //let sl = stl - csl;
          let sl = 0;
          if (stl > 60 && stl <= 80) {
            sl = 20;
          } else if (stl > 80) {
            sl = 40;
          }
          for (let x = 0; x < sl; x++) {
            sta.shift();
          }
          stl = sta.length;
        }
        let list = $('.historyBox');
        $('.historyBox .item').removeClass('bg-green bg-red');
        for (let i = istart; i < stl; i++) {
          let item = i;
          // let l1 = $('.historyBox .list1')
          // let l2 = $('.historyBox .list2')
          // let l3 = $('.historyBox .list3')
          // let l4 = $('.historyBox .list4')
          // let l5 = $('.historyBox .list5')
          if (i < 20) {
            if (sta[i] == 'buy') {
              list.find('.item:eq(' + item + ')').addClass('bg-green');
              this.totalBuyStatic++;
            } else if (sta[i] == 'sell') {
              list.find('.item:eq(' + item + ')').addClass('bg-red');
              this.totalSellStatic++;
            }
          }
          if (i > 19 && i < 40) {
            if (sta[i] == 'buy') {
              list.find('.item:eq(' + item + ')').addClass('bg-green');
              this.totalBuyStatic++;
            } else if (sta[i] == 'sell') {
              list.find('.item:eq(' + item + ')').addClass('bg-red');
              this.totalSellStatic++;
            }
          }
          if (i > 39 && i < 60) {
            if (sta[i] == 'buy') {
              list.find('.item:eq(' + item + ')').addClass('bg-green');
              this.totalBuyStatic++;
            } else if (sta[i] == 'sell') {
              list.find('.item:eq(' + item + ')').addClass('bg-red');
              this.totalSellStatic++;
            }
          }
          if (i > 59 && i < 80) {
            if (sta[i] == 'buy') {
              list.find('.item:eq(' + item + ')').addClass('bg-green');
              this.totalBuyStatic++;
            } else if (sta[i] == 'sell') {
              list.find('.item:eq(' + item + ')').addClass('bg-red');
              this.totalSellStatic++;
            }
          }
          if (i > 79 && i < 100) {
            if (sta[i] == 'buy') {
              list.find('.item:eq(' + item + ')').addClass('bg-green');
              this.totalBuyStatic++;
            } else if (sta[i] == 'sell') {
              list.find('.item:eq(' + item + ')').addClass('bg-red');
              this.totalSellStatic++;
            }
          }
        }
      }
    }.bind(this);

    this.connection.onclose = () => {
      // xóa notice = 0
      getData.Notify = 0;
      this.betOpen.l.bet[0].items = [];
      localStorage.removeItem('stateOpen');
    };
  },
  mounted() {
    this.addSound();

    function debounce(func) {
      var timer;
      return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
      };
    }

    const self = this;

    window.addEventListener(
      'resize',
      debounce(function () {
        self.resizeBieuDo();
      })
    );
    //window.addEventListener("load", this.setChartHeight);

    this.setChartHeight();

    // this.isMounted = true;

    // const chart = this.$children[1].$refs.highcharts
    // console.log(chart);
    //setTimeout(() => {

    // let chart = this.$refs.chartOs.chart
    // if (chart.series) { // the chart may be destroyed
    //     timer = setInterval(() => {
    //         var left = chart.series[0].points[0],
    //             //right = chart.series[1].points[0],
    //             leftVal,
    //             //rightVal,
    //             inc = (Math.random() * 200) - 85;

    //         leftVal = left.y + inc;
    //         //console.log(left.y)
    //         //rightVal = leftVal + inc / 3;
    //         if (leftVal < -85 || leftVal > 85) {
    //             leftVal = left.y - inc;
    //         }
    //         // if (rightVal < -20 || rightVal > 6) {
    //         //     rightVal = leftVal;
    //         // }
    //         //console.log(leftVal)
    //         left.update(leftVal, false);
    //         //right.update(rightVal, false);
    //         chart.redraw();
    //     }, 3000)
    // }

    //}, 3000)

    this.$store.commit('SET_IS_RENDER_TRADE_INDEX', true);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeBieuDo);

    if (timer) {
      clearInterval(timer);
    }
    this.$store.commit('SET_IS_RENDER_TRADE_INDEX', false);
    this.connection.close();
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

<style lang="scss">
@import './index_common.scss';
</style>
