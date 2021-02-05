<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="3.75rem"
      width="6rem"
    ></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data () {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    },
  },
  watch: {
    cdata: {
      handler (newData) {
        this.options = {
          color: [
            "#37a2da",
            "#32c5e9",
            "#9fe6b8",
            "#ffdb5c",
            "#ff9f7f",
            "#fb7293",
            "#e7bcf3",
            "#8378ea"
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show: true
          },
          legend: {
            top: '5%',
            left: '10%',
            orient: 'vertical',
          },
          calculable: true,
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ["75%", "40%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '10',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },

              data: newData.seriesData
            }
          ]
        }
      },
      immediate: true,
      // deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>