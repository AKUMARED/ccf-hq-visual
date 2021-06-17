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
        xData: ["停送电投诉", "频繁停电类供电质量投诉", "电压质量类供电质量投诉", "供电频率类供电质量投诉","电网建设投诉"],
        seriesData: [
          { value: 17, name: "停送电投诉" },
          { value: 40, name: "频繁停电类供电质量投诉" },
          { value: 17, name: "电压质量类供电质量投诉" },
          { value: 0, name: "供电频率类供电质量投诉" },
          { value: 5, name: "电网建设投诉" },
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