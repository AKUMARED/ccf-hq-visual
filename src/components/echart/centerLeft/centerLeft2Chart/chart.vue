<template>
  <div>
    <Echart
      id="centreLeft2Chart"
      ref="centreLeft2ChartRef"
      :options="options"
      height="8.5rem"
      width="8.525rem"
    ></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart';
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        // 设置点的位置(经纬度)
        // const geoCoordMap = {
        //
        // };
        // let seriesData = [
        //   {
        //     name: '北京市',
        //   },
        //   {
        //     name: '天津市',
        //   },
        //   {
        //     name: '河北省',
        //   },
        //   {
        //     name: '山西省',
        //   },
        //   {
        //     name: '内蒙古自治区',
        //   },
        //   {
        //     name: '辽宁省',
        //   },
        //   {
        //     name: '吉林省',
        //   },
        //   {
        //     name: '黑龙江省',
        //   },
        //   {
        //     name: '上海市',
        //   },
        //   {
        //     name: '江苏省',
        //   },
        //   {
        //     name: '浙江省',
        //   },
        //   {
        //     name: '安徽省',
        //   },
        //   {
        //     name: '福建省',
        //   },
        //   {
        //     name: '江西省',
        //   },
        //   {
        //     name: '山东省',
        //   },
        //   {
        //     name: '河南省',
        //   },
        //   {
        //     name: '湖北省',
        //   },
        //   {
        //     name: '湖南省',
        //   },
        //   {
        //     name: '广东省',
        //   },
        //   {
        //     name: '山东省',
        //   },
        //   {
        //     name: '广西壮族自治区',
        //   },
        //   {
        //     name: '海南省',
        //   },
        //   {
        //     name: '重庆市',
        //   },
        //   {
        //     name: '四川省',
        //   },
        //   {
        //     name: '贵州省',
        //   },
        //   {
        //     name: '云南省',
        //   },
        //   {
        //     name: '西藏自治区',
        //   },
        //   {
        //     name: '陕西省',
        //   },
        //   {
        //     name: '甘肃省',
        //   },
        //   {
        //     name: '青海省',
        //   },
        //   {
        //     name: '宁夏回族自治区',
        //   },
        //   {
        //     name: '新疆维吾尔自治区',
        //   },
        //   {
        //     name: '台湾省',
        //   },
        //   {
        //     name: '香港特别行政区',
        //   },
        //   {
        //     name: '澳门特别行政区',
        //   },
        // ];
        // let seriesData = [
        //   {
        //     name: '杭州市',
        //   },
        //   {
        //     name: '湖州市',
        //   },
        //   {
        //     name: '嘉兴市',
        //   },
        //   {
        //     name: '宁波市',
        //   },
        //   {
        //     name: '绍兴市',
        //   },
        //   {
        //     name: '台州市',
        //   },
        //   {
        //     name: '金华市',
        //   },
        //   {
        //     name: '温州市',
        //   },
        //   {
        //     name: '丽水市',
        //   },
        //   {
        //     name: '衢州市',
        //   },
        //   {
        //     name: '舟山市',
        //   },
        // ];
        // let convertData = function (data) {
        //   let scatterData = [];
        //   for (var i = 0; i < data.length; i++) {
        //     var geoCoord = geoCoordMap[data[i].name];
        //     if (geoCoord) {
        //       scatterData.push({
        //         name: data[i].name,
        //         value: geoCoord.concat(data[i].value),
        //       });
        //     }
        //   }
        //   return scatterData;
        // };
        this.options = {
          showLegendSymbol: true,
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 14,
              lineHeight: 22,
            },
            position: point => {
              // 固定在顶部
              return [point[0] + 50, point[1] - 20];
            },
            // 如果需要自定义 tooltip样式，需要使用formatter
            /*
              formatter: params => {
                return `<div style=""> ... </div>`
              }
            */
          },
          visualMap: {
            min: 0,
            max: 10,
            show: false,
            seriesIndex: 0,
            // 颜色
            inRange: {
              color: ['rgba(41,166,206, .5)', 'rgba(69,117,245, .9)'],
            },
          },
          // 底部背景
          // geo: {
          //   show: true,
          //   aspectScale: 0.85, //长宽比
          //   zoom: 1.25,
          //   top: '12%',
          //   left: '10%',
          //   map: '中国',
          //   roam: false,
          //   itemStyle: {
          //     normal: {
          //       areaColor: 'rgba(0,0,0,0)',
          //       shadowColor: 'rgba(7,114,204, .8)',
          //       shadowOffsetX: 5,
          //       shadowOffsetY: 5,
          //     },
          //     emphasis: {
          //       areaColor: '#00aeef',
          //     },
          //   },
          // },
          series: [
            {
              name: '相关指数',
              type: 'map',
              aspectScale: 0.85, //长宽比
              zoom: 1.25,
              mapType: '中国', // 自定义扩展图表类型
              top: '12%',
              left: '10%',
              itemStyle: {
                normal: {
                  color: 'red',
                  areaColor: 'rgba(19,54,162, .5)',
                  borderColor: 'rgba(0,242,252,.3)',
                  borderWidth: 1,
                  shadowBlur: 7,
                  shadowColor: '#00f2fc',
                },
                emphasis: {
                  areaColor: '#4f7fff',
                  borderColor: 'rgba(0,242,252,.6)',
                  borderWidth: 2,
                  shadowBlur: 10,
                  shadowColor: '#00f2fc',
                },
              },
              label: {
                formatter: params => `${params.name}`,
                show: false,
                position: 'insideRight',
                textStyle: {
                  fontSize: 8,
                  color: '#efefef',
                },
                emphasis: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              data: newData,
            },
            // {
            //   type: 'effectScatter',
            //   coordinateSystem: 'geo',
            //   symbolSize: 7,
            //   effectType: 'ripple',
            //   legendHoverLink: false,
            //   showEffectOn: 'render',
            //   rippleEffect: {
            //     period: 4,
            //     scale: 2.5,
            //     brushType: 'stroke',
            //   },
            //   zlevel: 1,
            //   itemStyle: {
            //     normal: {
            //       color: '#99FBFE',
            //       shadowBlur: 5,
            //       shadowColor: '#fff',
            //     },
            //   },
            //   data: convertData(seriesData),
            // },
          ],
        };
        // 重新选择区域
        // this.handleMapRandomSelect();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    
  },
};
</script>
