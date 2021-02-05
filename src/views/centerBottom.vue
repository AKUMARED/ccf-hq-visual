<template>
  <div id="centerBottom">
    <div>
      <div class="d-flex pt-2 pl-2" >
        <div class="d-flex">
<!--          <span class="fs-xl text" style="margin-left: 3.9rem;font-size: 0.215rem">近七日趋势</span>-->
<!--          <div class="decoration2">-->
<!--            <dv-decoration-2 :reverse="true" style="width:5px;height:6rem;" />-->
<!--          </div>-->
        </div>
      </div>
      <div>
        <CenterBottomChart />
      </div>
    </div>
  </div>
</template>

<script>
import CenterBottomChart from "@/components/echart/bottom/centerBottomChart";
export default {
  data() {
    return {};
  },
  components: {
    CenterBottomChart
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#centerBottom {
  margin-top: 1rem;
  padding: 0.2rem 0.2rem 0;
  height: 4.5rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .text {
    color: #c3cbde;
  } //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
  }
  .chart-box {
    /*margin-top: 0.2rem;*/
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }
}
</style>