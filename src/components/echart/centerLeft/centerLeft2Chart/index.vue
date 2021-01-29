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
      cdata:[
        {
          name: '北京市',
          value: 4,
        },
        {
          name: '天津市',
          value: 4,
        },
        {
          name: '河北省',
          value: 4,
        },
        {
          name: '山西省',
          value: 4,
        },
        {
          name: '内蒙古自治区',
          value: 4,
        },
        {
          name: '辽宁省',
        },
        {
          name: '吉林省',
        },
        {
          name: '黑龙江省',
        },
        {
          name: '上海市',
        },
        {
          name: '江苏省',
        },
        {
          name: '浙江省',
        },
        {
          name: '安徽省',
        },
        {
          name: '福建省',
        },
        {
          name: '江西省',
        },
        {
          name: '山东省',
        },
        {
          name: '河南省',
        },
        {
          name: '湖北省',
        },
        {
          name: '湖南省',
        },
        {
          name: '广东省',
        },
        {
          name: '山东省',
        },
        {
          name: '广西壮族自治区',
        },
        {
          name: '海南省',
        },
        {
          name: '重庆市',
        },
        {
          name: '四川省',
        },
        {
          name: '贵州省',
        },
        {
          name: '云南省',
        },
        {
          name: '西藏自治区',
        },
        {
          name: '陕西省',
        },
        {
          name: '甘肃省',
        },
        {
          name: '青海省',
        },
        {
          name: '宁夏回族自治区',
        },
        {
          name: '新疆维吾尔自治区',
        },
        {
          name: '台湾省',
        },
        {
          name: '香港特别行政区',
        },
        {
          name: '澳门特别行政区',
        },
      ]
      // cdata: [
      //   {
      //     // 名字需要与 “common/map/zhejiang.js” 地图数据文件里面定义的一一对应，不能是 “福州” 或者 “闽” 之类的缩写
      //     name: '杭州市',
      //     value: 10,
      //     elseData:{
      //       // 这里放置地图 tooltip 里想显示的数据
      //     }
      //   },
      //   {
      //     name: '湖州市',
      //     value: 4,
      //   },
      //   {
      //     name: '嘉兴市',
      //     value: 8,
      //   },
      //   {
      //     name: '宁波市',
      //     value: 7,
      //   },
      //   {
      //     name: '绍兴市',
      //     value: 6,
      //   },
      //   {
      //     name: '台州市',
      //     value: 5,
      //   },
      //   {
      //     name: '金华市',
      //     value: 4,
      //   },
      //   {
      //     name: '温州市',
      //     value: 3,
      //   },
      //   {
      //     name: '丽水市',
      //     value: 2,
      //   },
      //   {
      //     name: '衢州市',
      //     value: 1,
      //   },
      //   {
      //     name: '舟山市',
      //     value: 1,
      //   },
      // ]
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