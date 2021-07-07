<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex ">
            <div @click="goOverView">
                <dv-decoration-11 style="width:150px;height:55px;font-size: 20px; margin-left:10px" >首页</dv-decoration-11>
            </div>
            <div style="margin-left: .82rem;margin-top: -.1rem" class="title-scene">
                <img src="@/assets/triangle-left.png">
                <span class="scene" @click="goOADNO">配电网运行情况在线统计</span>
                <span class="scene">配电网运行可靠性在线分析</span>
                <span class="scene">配电网模型在线分析</span>
                <img src="@/assets/triangle-right.png">
            </div>

        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex" style="width: 40%">
            <div
              class="react-right ml-4"
              style="width: 6.25rem; text-align: left;background-color: #0f1325;"

            >
              <span class="react-before"></span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325;">
              <span class="text colorBlue">{{titleArea}}</span>
            </div>
          </div>
          <div class="d-flex" style="width: 15%;">
            <div class="title-center">
              <span>{{title}}</span>
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b">生成报表</span>
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
              <china    @map-change="mapClick"
                        @back-change="backClick"/>
            </div>
            <div>
                <dv-border-box-11 :title="titleTrend">
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
import { formatTime } from '../../utils'

import leftTop from "./leftTop";
import leftCenter from "./leftCenter";
import leftBottom from "./leftBottom";

import centerBottom from "./centerBottom";

import rightTop from "./rightTop";
import rightCenter from "./rightCenter"
import rightBottom  from "./rightBottom";

import china  from "./china";



export default {
  data () {
    return {
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      areaData: {
        areaCode: "000000",
        areaLevel: "county",
        name: "中国",
        areaName: "中国",
      },
    };
  },
  components: {
    leftTop,
    leftCenter,
    leftBottom,
    // centerTop,
    centerBottom,
    rightTop,
    rightCenter,
    rightBottom,
    china
  },
  mounted () {
    this.$store.commit('title','配电网运行情况在线统计');
    this.timeFn();
    this.cancelLoading();
  },
  computed:{
    titleTrend(){
        return this.$store.state.malfunction.MalfunctionType
    },
    titleArea(){
      return this.$store.state.area
    },
    title(){
      return this.$store.state.title
    }
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
    },
    mapClick(data) {
      this.areaData = data;
    },
    backClick(data) {
      this.areaData = data;
    },
    returnHome() {
      this.$router.push("/home");
    },
      goOADNO(){
      this.$store.commit('title','配电网运行情况在线统计');
      this.$router.push("/index");
    },
    goOverView(){
      this.$store.commit('title','首页');
      this.$router.push("/overView/index");
    },
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/index';
</style>