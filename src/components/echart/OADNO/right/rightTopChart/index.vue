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
        xData: ["客户内部故障", "低压故障", "非电力故障", "计量故障","高压故障","停电原因查询","电能质量故障"],
        seriesData: [
          { value: 4795, name: "客户内部故障" },
          { value: 3336, name: "低压故障" },
          { value: 1816, name: "非电力故障" },
          { value: 956, name: "计量故障" },
          { value: 499, name: "高压故障" },
          { value: 468, name: "停电原因查询" },
          { value: 54, name: "电能质量故障" },
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