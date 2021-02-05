<template>
  <div>
    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="3.75rem"
      width="3.25rem"
    ></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data () {
    return {
      options: {},
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#f5b44d"
            },
            {
              offset: 1,
              color: "#28f8de"
            }
          ]
        },
        linearGtoB: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#43dfa2"
            },
            {
              offset: 1,
              color: "#28f8de"
            }
          ]
        },
        linearBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#1c98e8"
            },
            {
              offset: 1,
              color: "#28f8de"
            }
          ]
        },
        areaBtoG: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(35,184,210,.2)"
            },
            {
              offset: 1,
              color: "rgba(35,184,210,0)"
            }
          ]
        }
      }
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
      handler () {
        this.options = {
          // title: {
          //   text: "",
          //   textStyle: {
          //     color: "#D3D6DD",
          //     fontSize: 24,
          //     fontWeight: "normal"
          //   },
          //   subtextStyle: {
          //     color: "#fff",
          //     fontSize: 12
          //   },
          //   top: 50,
          //   left: 80
          // },
          legend: {
            top: '15%',
            left: 'left',
            orient: 'vertical',
          },
          tooltip: {
            trigger: "item"
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ["70%", "40%"],
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
              data: [
                {value: 44, name: '计划停电'},
                {value: 16, name: '临时停电'},
                {value: 65, name: '故障停电'},
                {value: 0, name: '其他停电'},
                {value: 4, name: '有序用电停电'}
              ]
            },
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>