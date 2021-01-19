<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  data () {
    return {
      cdata: {
        xData: ["跳闸条次数", "低电压条次数", "轻载条次数", "重过载条次数"],
        seriesData: [
          { value: 10, name: "跳闸条次数" },
          { value: 5, name: "低电压条次数" },
          { value: 15, name: "轻载条次数" },
          { value: 25, name: "重过载条次数" },

        ]
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>