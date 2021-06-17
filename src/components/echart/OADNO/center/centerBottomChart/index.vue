<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
import {getFeeder, getTansformer} from "../../../../../api/get-json";
import Utils from '../../../../../utils/util';
import {cityProvincesMap} from '../../../../../config/cityProvincesMap'

export default {
  data () {
    return {
      drawTiming: null,
      cdata: {
        year: null,
        weekCategory: [],
        // maxData: 120,
        weekMaxData: [],
        weekLineData: [],
        weekDays:[],
        nodeCode: cityProvincesMap.nodeCode,
      },
        p:{
            "dateTime": "",
            "nodeCode": "",
            "cityID": ""
        },
    }
  },
  components: {
    Chart,
  },
  mounted () {
    let that = this;
    Utils.$on('week', function (msg) {
      console.log(msg);
      that.drawTimingFn();
    });
    // this.drawTimingFn();
  },
  beforeDestroy () {
    clearInterval(this.drawTiming);
  },
  methods: {
    drawTimingFn () {
      this.setData();
    },
    async setData () {
      // 清空轮询数据
      this.cdata.weekCategory = [];
      this.cdata.weekMaxData = [];
      this.cdata.weekLineData = [];

      let dateBase = new Date();
      this.cdata.year = dateBase.getFullYear();

      // if(this.$store.state.area==="全国网"){
      //   this.p.nodeCode =""
      // }else {
      //   if (this.$store.state.area in this.nodeCode){
      //     this.p.nodeCode =this.nodeCode[this.$store.state.area];
      //   }
      // }
      // console.log(this.$store.state.area)
      // console.log(this.p.nodeCode)
      // 周数据
      for (let i = 0; i < 7; i++) {
        // 日期
        let date = new Date();
        this.cdata.weekCategory.unshift([date.getMonth() + 1, date.getDate()-i].join("/"));
        this.cdata.weekDays.unshift( [date.getFullYear(),date.getMonth() + 1,date.getDate()-i].join("-"));
        this.p.dateTime = this.cdata.weekDays[0];
        // let ob = Object(this.$store.state.area)
        // if(ob in this.nodeCode) {
        //   this.p.nodeCode = this.nodeCode[this.$store.state.area]
        // }
        // console.log(typeof(this.p.nodeCode))
        // console.log(this.nodeCode[ob])
        // console.log(this.nodeCode[this.$store.state.area])
        let result;
        let sumFeeder={
          tripCount:0,
          heavyLoadCount:0,
          overLoadCount:0,
        };
        let sumTransformer={
          shutdownCount:0,
          heavyLoadCount:0,
          lowVoltageCount:0,
          overLoadCount:0,
          phaseImbalanceCount:0,
        };
        let resultFeeder = await getFeeder(this.p);
        if(resultFeeder.data==null){
          sumFeeder={
            feederCount:0,
            tripCount:0,
            heavyLoadCount:0,
            overLoadCount:0,
            feederMalfunction:0
          };
        }else {
          for(let feederLength = 0;feederLength < resultFeeder.data.length; feederLength++){
            sumFeeder.tripCount = sumFeeder.tripCount + resultFeeder.data[feederLength].tripCount;
            sumFeeder.heavyLoadCount = sumFeeder.heavyLoadCount + resultFeeder.data[feederLength].heavyLoadCount;
            sumFeeder.overLoadCount = sumFeeder.overLoadCount + resultFeeder.data[feederLength].overLoadCount;
          }
        }
        let resultTransformer = await getTansformer(this.p);
        if(resultTransformer.data==null){
          sumTransformer={
            shutdownCount:0,
            heavyLoadCount:0,
            lowVoltageCount:0,
            overLoadCount:0,
            phaseImbalanceCount:0,
          };
        }else {
          for(let transformerLength = 0;transformerLength < resultTransformer.data.length; transformerLength++){
            sumTransformer.shutdownCount = sumTransformer.shutdownCount + resultTransformer.data[transformerLength].shutdownCount;
            sumTransformer.lowVoltageCount = sumTransformer.lowVoltageCount + resultTransformer.data[transformerLength].lowVoltageCount;
            sumTransformer.heavyLoadCount = sumTransformer.heavyLoadCount + resultTransformer.data[transformerLength].heavyLoadCount;
            sumTransformer.overLoadCount = sumTransformer.overLoadCount + resultTransformer.data[transformerLength].overLoadCount;
            sumTransformer.phaseImbalanceCount = sumTransformer.phaseImbalanceCount + resultTransformer.data[transformerLength].phaseImbalanceCount;
          }
        }
        switch (this.$store.state.malfunction.Malfunction) {
          case "跳闸":
            result = sumFeeder.tripCount;
            break
          case "线路重载":
            result =   sumFeeder.heavyLoadCount;
            break
          case "线路过载":
            result =   sumFeeder.overLoadCount;
            break
          case "配变停运":
            result =   sumTransformer.shutdownCount;
            break
          case "低电压":
            result =   sumTransformer.lowVoltageCount;
            break
          case "配变重载":
            result =   sumTransformer.heavyLoadCount;
            break
          case "配变过载":
            result =   sumTransformer.overLoadCount;
            break
          case "三相不平衡":
            result =   sumTransformer.phaseImbalanceCount;
            break
          default:
            result = 0;
            break
        }
        // 折线图数据
        this.cdata.weekMaxData.push(result);
        // let distance = Math.round(Math.random() * 110 + 5);
        this.cdata.weekLineData.unshift(result);
        console.log("weekLineData")
        console.log(this.cdata.weekLineData.unshift(result))

      }
    },

  }
};
</script>

<style lang="scss" scoped>
</style>