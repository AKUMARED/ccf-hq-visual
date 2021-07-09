<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex ">
          <div @click="goOverView">
              <dv-decoration-11 style="width:150px;height:60px; margin-left:10px;" >
                  <a style="color: #00f2fc;font-size: 20px">
                      首页
                  </a>
              </dv-decoration-11>
          </div>
            <div style="margin-left: .82rem;margin-top: -.1rem" class="title-scene">
<!--                <img src="@/assets/triangle-left.png">-->
                <div class="box-scene">
                    <div>
                        <a class="scene" @click="goOADNO">配电网运行情况在线统计</a>
                    </div>
                </div>
                <div class="box-scene">
                    <div>
                        <a class="scene" @click="goOnePicture">电网一张图</a>
                    </div>
                </div>

<!--                <img src="@/assets/triangle-right.png">-->
            </div>

        </div>
          <dv-decoration-10 style="width:100%;height:5px;margin-bottom: 5px" />


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
          <div class="d-flex" style="width: 10%;">
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

          </div>

          <div class="center-box">
            <china    @map-change="mapClick"
                      @back-change="backClick"/>
          </div>

          <div class="right-box">

          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import { formatTime } from '../../utils'

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
    china
  },
  mounted () {
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
      goOnePicture(){
          this.$store.commit('title','电网一张图');
          this.$router.push("/OnePicture/index");
      },
    goOverView(){
      this.$store.commit('title','首页');
      this.$router.push("/overView/index");
    },

  }
};
</script>

<style lang="scss">
@import '../../assets/scss/overView';
</style>