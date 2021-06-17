<template>
  <div id="bottomLeft">
    <div class="">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2" style="font-size: 0.175rem">故障抢修时间</span>
        </div>
      </div>
      <div>
        <RightCenterChart />
      </div>
    </div>
  </div>
</template>

<script>
import RightCenterChart from "@/components/echart/OADNO/right/rightCenterChart";
export default {
  data() {
    return {
    };
  },
  components: {
    RightCenterChart,
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#bottomLeft {
  margin-top: 0.1rem;
  padding: 0.3rem 0.2rem;
  height: 3.75rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 3.25rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
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