import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Feeder:{
      feederCount: "/",    //馈线总条数
      tripCount:"/",       //跳闸条次数
      heavyLoadCount:"/",  //重载条次数
      overLoadCount:"/"    //过载条次数
    },
    malfunction:{
      MalfunctionType:""
    }
  },
  mutations: {
    Feeder(state,msg){
      state.Feeder.feederCount = msg.FEEDER_COUNT;
      state.Feeder.tripCount = msg.TRIP_COUNT;
      state.Feeder.heavyLoadCount = msg.HEAVY_LOAD_COUNT;
      state.Feeder.overLoadCount = msg.OVER_LOAD_COUNT;
    },
    FeederCount(state,msg){
      state.Feeder.feederCount = msg
    },
    TripCountCount(state,msg){
      state.Feeder.tripCount = msg
    },
    HeavyLoadCountCount(state,msg){
      state.Feeder.heavyLoadCount = msg
    },
    OverLoadCountCount(state,msg){
      state.Feeder.overLoadCount = msg
    },
    MalfunctionType(state,msg){
      state.malfunction.MalfunctionType = msg
    }
  },
  actions: {
  },
  modules: {
  }
})
