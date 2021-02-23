import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Feeder:{
      feederCount: "/",    //馈线总条数
      tripCount:"/",       //跳闸条次数
      heavyLoadCount:"/",  //重载条次数
      overLoadCount:"/",   //过载条次数
      feederMalfunction:"",//馈线异常总数
    },
    feederRanking: [],
    Transformer:{
      transformerCount:"/",         //配变总台数
      shutdownCount: "/",           //配变停运台次数
      lowVoltageCount:"/",          //配变低电压台次数
      heavyLoadCount:"/",           //配变重载台次数
      overLoadCount:"/",            //配变过载台次数
      phaseImbalanceCount:"/",      //配变三相不平衡台次数
      transformerMalfunction:""     //配变异常总数
    },
    transformerRanking:[],
    FeederAll:[],
    FeederProvince:[],
    TransformerAll:[],
    TransformerProvince:[],

    weekData:0,
    malfunction:{

      Malfunction: "",
      MalfunctionType:"七日趋势"
    },
    typeFeeder:"",
    typeTransformer:"",

    area:"全国网",
    nodeCode:""
  },
  mutations: {
    Feeder(state,msg){
      state.Feeder.feederCount = msg.feederCount;
      state.Feeder.tripCount = msg.tripCount;
      state.Feeder.heavyLoadCount = msg.heavyLoadCount;
      state.Feeder.overLoadCount = msg.overLoadCount;
    },
    feederRanking(state,msg){
      state.feederRanking = msg
    },
    Transformer(state,msg){
      state.Transformer.transformerCount = msg.transformerCount;
      state.Transformer.shutdownCount = msg.shutdownCount;
      state.Transformer.lowVoltageCount = msg.lowVoltageCount;
      state.Transformer.heavyLoadCount = msg.heavyLoadCount;
      state.Transformer.overLoadCount = msg.overLoadCount;
      state.Transformer.phaseImbalanceCount = msg.phaseImbalanceCount;
    },
    transformerRanking(state,msg){
      state.transformerRanking = msg
    },
    FeederAll(state,msg){
      state.FeederAll = msg
    },
    TransformerAll(state,msg){
      state.TransformerAll = msg
    },
    FeederProvince(state,msg){
      state.FeederProvince = msg
    },
    TransformerProvince(state,msg){
      state.TransformerProvince = msg
    },

    area(state,msg){
      state.area = msg
    },
    nodeCode(state,msg){
      state.nodeCode = msg
    },

    weekData(state,msg){
      state.weekData = msg
    },
    MalfunctionType(state,msg){
      state.malfunction.MalfunctionType = msg+" 七日趋势"
      state.malfunction.Malfunction = msg
    },
    typeFeeder(state,msg){
      state.typeFeeder = msg
    },
    typeTransformer(state,msg){
      state.typeTransformer = msg
    }
  },
  actions: {
  },
  modules: {
  }
})
