<template>
  <div id="bottomRight">
    <div>
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-area"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2" style="font-size: 0.175rem">停电信息</span>
<!--          <div class="decoration2">-->
<!--            <dv-decoration-2 :reverse="true" style="width:5px;height:6rem;" />-->
<!--          </div>-->
        </div>
      </div>
      <div>
        <LeftBottomChart v-if="isShow"/>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBottomChart from "@/components/echart/OADNO/left/leftBottomChart";
export default {
  data() {
    return {
      isShow:true
    };
  },
  components: {
    LeftBottomChart
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#bottomRight {
  padding: 0.2rem 0.2rem 0;
  height: 4.25rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 3.95rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  } //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }
}
</style>