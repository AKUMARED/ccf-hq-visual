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
          "北京",
          "天津",
          "河北",
          "冀北",
          "山西",
          "山东",
          "上海",
          "江苏",
          "浙江",
          "安徽",
          "福建",
          "湖北",
          "湖南",
          "河南",
          "江西",
          "四川",
          "重庆",
          "辽宁",
          "吉林",
          "黑龙江",
          "蒙东",
          "陕西",
          "甘肃",
          "青海",
          "宁夏",
          "新疆",
          "西藏",
        ],
        lineData: [
          14.70,
          18.19,
          18.41,
          18.59,
          17.63,
          12.50,
          17.23,
          16.33,
          20.72,
          19.33,
          19.63,
          16.13,
          21.11,
          14.84,
          15.22,
          17.05,
          27.17,
          17.49,
          22.47,
          18.18,
          17.96,
          21.88,
          14.40,
          20.85,
          16.90,
          18.96,
          14.47
        ],
        barData: [
          46.48,
          24.79,
          34.54,
          42.64,
          36.52,
          19.88,
          19.00,
          42.63,
          33.69,
          51.88,
          15.22,
          73.99,
          30.39,
          32.26,
          48.84,
          87.75,
          79.03,
          34.44,
          40.35,
          51.63,
          49.82,
          40.34,
          92.19,
          34.59,
          26.35,
          35.80,
          77.84,
          41.94,

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