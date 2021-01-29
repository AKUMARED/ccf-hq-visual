<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 style="width:33.3%;height:.0625rem;" />
          <div class="d-flex jc-center">
            <dv-decoration-8 :color="['#568aea', '#000000']" style="width:2.5rem;height:.625rem;" />
            <div class="title">
              <span class="title-text">国网配电网运行情况</span>
              <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width:3.125rem;height:.1rem;"
              />
            </div>
            <dv-decoration-8
              :reverse="true"
              :color="['#568aea', '#000000']"
              style="width:2.5rem;height:.625rem;"
            />
          </div>
          <dv-decoration-10 style="width:33.3%;height:.0625rem; transform: rotateY(180deg);" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex" style="width: 40%">
            <div
              class="react-right ml-4"
              style="width: 6.25rem; text-align: left;background-color: #0f1325;"
            >
              <span class="react-before"></span>
              <span class="text"></span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325;">
              <span class="text colorBlue"></span>
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b"></span>
            </div>
            <div
              class="react-left mr-4"
              style="width: 6.25rem; background-color: #0f1325; text-align: right;"
            >
              <span class="react-after"></span>
              <span class="text">{{dateYear}} {{dateWeek}} {{dateDay}}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <div class="left-box">
            <div>
              <dv-border-box-12>
                <leftTop />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-13>
                <leftCenter />
              </dv-border-box-13>
            </div>
            <div>
              <dv-border-box-13>
                <leftBottom />
              </dv-border-box-13>
            </div>
          </div>

          <div class="center-box">
            <div>
              <centerTop />
            </div>
            <div>
                <dv-border-box-11>
                    <centerBottom />
                </dv-border-box-11>
            </div>
          </div>

          <div class="right-box">
            <div>
              <dv-border-box-12>
               <rightTop />
              </dv-border-box-12>
            </div>
              <div>
                  <dv-border-box-13>
                      <rightCenter />
                  </dv-border-box-13>
              </div>
            <div>
              <dv-border-box-13>
                <rightBottom />
              </dv-border-box-13>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import { formatTime } from '../utils/index.js'

import leftTop from "./leftTop";
import leftCenter from "./leftCenter";
import leftBottom from "./leftBottom";

import centerTop from "./centerTop";
import centerBottom from "./centerBottom";

import rightTop from "./rightTop";
import rightCenter from  "./rightCenter"
import rightBottom from "./rightBottom";

export default {
  data () {
    return {
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    };
  },
  components: {
    leftTop,
    leftCenter,
    leftBottom,
    centerTop,
    centerBottom,
    rightTop,
    rightCenter,
    rightBottom
  },
  mounted () {
    this.timeFn();
    this.cancelLoading();
  },
  methods: {
    timeFn () {
      setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss');
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd');
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000)
    },
    cancelLoading () {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/index.scss';
</style>