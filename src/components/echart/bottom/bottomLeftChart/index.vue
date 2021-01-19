<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  data () {
    return {
      cdata: {
        category: [
          "投入抢修人员数量",
          "出动抢修人员数量",
          "投入抢修车辆数量",
          "出动抢修车辆数量",
          "投入应急发电车数量",
          "出动应急发电车数量",
          "投入发电机数量",
          "出动发电机数量",
        ],
        lineData: [

        ],
        barData: [
          100,
          100,
          0,
          0,
          1,
          1,
          4,
          4
        ],
        rateData: []
      }
    };
  },
  components: {
    Chart,
  },
  mounted () {
    this.setData();
  },
  methods: {
    // 根据自己的业务情况修改
    setData () {
      for (let i = 0; i < this.cdata.barData.length -1; i++) {
        let rate = this.cdata.barData[i] / this.cdata.lineData[i];
        this.cdata.rateData.push(rate.toFixed(2));
      }
    },
  }
};
</script>

<style lang="scss" scoped>
</style>