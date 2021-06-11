<template>
  <div id="center">
    <div class="left">
        <div style="margin-left: 0.1rem; width: 100%" >
            <div >
                <div class=" item" >
                    <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339" >
                        配变总数:</p>
                    <div>
                        <p class="number">{{transformerCount}}</p>
                    </div>
                </div>
            </div>
            <div >
                <div class=" item" >
                    <p class="" style="font-size:0.25rem; width: 3.2rem;text-align:center;color: #ffe339;background-color: unset;border: unset" @click="clickTY()">
                        配变停运</p>
                    <div>
                        <p class="number">{{shutdownCount}}</p>
                    </div>
                </div>
            </div>
            <div >
                <div class=" item" >
                    <p class="" style="font-size:0.25rem; width: 3.2rem;text-align:center;color: #ffe339;background-color: unset;border: unset" @click="ddy()">
                        低电压</p>
                    <div>
                        <p class="number">{{lowVoltageCount}}</p>
                    </div>
                </div>
            </div>
            <div >
                <div class=" item" >
                    <p class="" style="font-size:0.25rem; width: 3.2rem;text-align:center;color: #ffe339;background-color: unset;border: unset" @click="zz()">
                        重载</p>
                    <div>
                        <p class="number">{{heavyLoadCount}}</p>
                    </div>
                </div>
            </div>
            <div >
                <div class=" item" >
                    <p class="" style="font-size:0.25rem; width: 3.2rem;text-align:center;color: #ffe339;background-color: unset;border: unset" @click="gz()">
                        过载</p>
                    <div>
                        <p class="number">{{overLoadCount}}</p>
                    </div>
                </div>
            </div>
            <div >
                <div class=" item" >
                    <p class="" style="font-size:0.25rem; width: 3.2rem;text-align:center;color: #ffe339;background-color: unset;border: unset" @click="sx()">
                        三相不平衡</p>
                    <div>
                        <p class="number">{{phaseImbalanceCount}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="right">
      <div class="ranking bg-color-black">
                <span style="color:#5cd9e8">
                    <icon name="align-left"></icon>
                </span>
        <span class="text mx-2 mb-1" style="font-size: 0.175rem">配变情况：{{typeTransformer}}</span>
          <span class="text mx-2 mb-1" style="font-size: 0.175rem;float:right">(台次)</span>
        <dv-scroll-ranking-board :config="ranking" style="height:3rem"/>
      </div>
    </div>
  </div>
</template>

<script>
    import { formatTime } from '../../utils'
    import {getFeeder, getTansformer} from "../../api/get-json";
    import UtilsT from '../../utils/utilT';
    import Utils from '../../utils/util';

  export default {
    data() {
      return {
          transformerParameters:{
              "dateTime": "",
              "type": ""
          },
          ranking: {
              data: [
                  {
                      name: "/",
                      value: 0
                  },
                  {
                      name: "/",
                      value: 0
                  },
                  {
                      name: "/",
                      value: 0
                  },
                  {
                      name: "/",
                      value: 0
                  },
                  {
                      name: "/",
                      value: 0
                  }
              ],
              carousel: "single",
          },
      };
    },
      mounted(){
          let that = this;
          UtilsT.$on('transformer', function (msg) {
              console.log(msg);
              that.ty();
          });
          this.ty()
      },
      computed:{
          transformerCount () {
              return this.$store.state.Transformer.transformerCount
          },
          shutdownCount () {
              return this.$store.state.Transformer.shutdownCount
          },
          lowVoltageCount () {
              return this.$store.state.Transformer.lowVoltageCount
          },
          heavyLoadCount () {
              return this.$store.state.Transformer.heavyLoadCount
          },
          overLoadCount () {
              return this.$store.state.Transformer.overLoadCount
          },
          phaseImbalanceCount () {
              return this.$store.state.Transformer.phaseImbalanceCount
          },

          typeTransformer () {
              return this.$store.state.typeTransformer
          },
      },
      methods:{
        clickTY(){
            Utils.$emit('week',"msg");
            this.ty()
        },
          async ty(){
              let p={
                  "dateTime": "",
                  "nodeCode": "",
                  "cityID": ""
              };
              p.dateTime = this.dateDetermine();
              let  resultFeeder = await getFeeder(p);
              p.nodeCode = this.$store.state.nodeCode;
              this.$store.commit("FeederAll",resultFeeder);
              let  resultTransformer = await getTansformer(p);
              this.$store.commit("TransformerAll",resultTransformer);

              this.transformerParameters.dateTime = this.dateDetermine();
              this.transformerParameters.type = "SHUTDOWN_COUNT";
              let  tripCountData=[];
              for(let tripCountLength = 0;tripCountLength < this.$store.state.TransformerAll.data.length; tripCountLength++){
                  let rankingData= {
                      name: "",
                      value:0
                  };
                  rankingData.name = this.$store.state.TransformerAll.data[tripCountLength].orgName.replace("协同计算节点","").replace("国网","").replace("电力公司","").replace("电力有限公司","");
                  rankingData.value = this.$store.state.TransformerAll.data[tripCountLength].shutdownCount;
                  tripCountData.push(rankingData)
              }
              this.$store.commit('transformerRanking',tripCountData);
              this.ranking = {data:this.$store.state.transformerRanking,  carousel: "single"};


              this.$store.commit('MalfunctionType',"配变停运")
              this.$store.commit('typeTransformer',"配变停运")
          },
          ddy(){
              this.transformerParameters.dateTime = this.dateDetermine();
              this.transformerParameters.type = "LOW_VOLTAGE_COUNT";

              let  tripCountData=[];
              for(let tripCountLength = 0;tripCountLength < this.$store.state.TransformerAll.data.length; tripCountLength++){
                  let rankingData= {
                      name: "",
                      value:0
                  };
                  rankingData.name = this.$store.state.TransformerAll.data[tripCountLength].orgName.replace("协同计算节点","").replace("国网","").replace("电力公司","").replace("电力有限公司","");
                  rankingData.value = this.$store.state.TransformerAll.data[tripCountLength].lowVoltageCount;
                  tripCountData.push(rankingData)
              }
              this.$store.commit('transformerRanking',tripCountData);
              this.ranking = {data:this.$store.state.transformerRanking,  carousel: "single"};

              Utils.$emit('week',"msg");
              this.$store.commit('MalfunctionType',"低电压")
              this.$store.commit('typeTransformer',"低电压")
          },
          zz(){
              this.transformerParameters.dateTime = this.dateDetermine();
              this.transformerParameters.type = "HEAVY_LOAD_COUNT";

              let  tripCountData=[];
              for(let tripCountLength = 0;tripCountLength < this.$store.state.TransformerAll.data.length; tripCountLength++){
                  let rankingData= {
                      name: "",
                      value:0
                  };
                  rankingData.name = this.$store.state.TransformerAll.data[tripCountLength].orgName.replace("协同计算节点","").replace("国网","").replace("电力公司","").replace("电力有限公司","");
                  rankingData.value = this.$store.state.TransformerAll.data[tripCountLength].heavyLoadCount;
                  tripCountData.push(rankingData)
              }
              this.$store.commit('transformerRanking',tripCountData);
              this.ranking = {data:this.$store.state.transformerRanking,  carousel: "single"};

              Utils.$emit('week',"msg");
              this.$store.commit('MalfunctionType',"配变重载")
              this.$store.commit('typeTransformer',"重载")
          },
          gz(){
              this.transformerParameters.dateTime = this.dateDetermine();
              this.transformerParameters.type = "OVER_LOAD_COUNT";

              let  tripCountData=[];
              for(let tripCountLength = 0;tripCountLength < this.$store.state.TransformerAll.data.length; tripCountLength++){
                  let rankingData= {
                      name: "",
                      value:0
                  };
                  rankingData.name = this.$store.state.TransformerAll.data[tripCountLength].orgName.replace("协同计算节点","").replace("国网","").replace("电力公司","").replace("电力有限公司","");
                  rankingData.value = this.$store.state.TransformerAll.data[tripCountLength].overLoadCount;
                  tripCountData.push(rankingData)
              }
              this.$store.commit('transformerRanking',tripCountData);
              this.ranking = {data:this.$store.state.transformerRanking,  carousel: "single"};

              Utils.$emit('week',"msg");
              this.$store.commit('MalfunctionType',"配变过载")
              this.$store.commit('typeTransformer',"过载")
          },
          sx(){
              this.transformerParameters.dateTime = this.dateDetermine();
              this.transformerParameters.type = "PHASE_IMBALANCE_COUNT";

              let  tripCountData=[];
              for(let tripCountLength = 0;tripCountLength < this.$store.state.TransformerAll.data.length; tripCountLength++){
                  let rankingData= {
                      name: "",
                      value:0
                  };
                  rankingData.name = this.$store.state.TransformerAll.data[tripCountLength].orgName.replace("协同计算节点","").replace("国网","").replace("电力公司","").replace("电力有限公司","");
                  rankingData.value = this.$store.state.TransformerAll.data[tripCountLength].phaseImbalanceCount;
                  tripCountData.push(rankingData)
              }
              this.$store.commit('transformerRanking',tripCountData);
              this.ranking = {data:this.$store.state.transformerRanking,  carousel: "single"};

              Utils.$emit('week',"msg");
              this.$store.commit('MalfunctionType',"三相不平衡")
              this.$store.commit('typeTransformer',"三相不平衡")
          },
          dateDetermine(){
              let date = new Date();
              let dateTime = "";
              if(date.getHours() <=18){
                  dateTime = [date.getFullYear(),date.getMonth() + 1,date.getDate()-1].join("-");
              }else {
                  dateTime = formatTime(new Date()-1, 'yyyy-MM-dd');
              }
              return dateTime;
          }
      }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/font/font.css";

  #center {
    display: flex;
    flex-direction: row;

    .left {
        width: 40%;
        display: flex;
        flex-direction: column;
        margin-left: 0.1rem;
        margin-top: 0.2rem;
        justify-content: space-around;
        .item {
            display: flex;
            margin-top: 0.05rem;
            margin-left: 0.2rem;
            flex-direction: row;
            width: 90%;
            height: 0.425rem;
            .number{
                font-size: 20px;
                color: #3de7c9;
                text-shadow: 0.01rem 0.01rem 0.3rem #00f2fc;
                width:1rem;
                height:.325rem;
                margin-left: 0.05rem
            }
        }
    }

    .right {
      padding: 0.05rem 0.05rem 0;
      width: 100%;
      display: flex;
      height: 3.75rem;
      justify-content: space-between;

      .bg-color-black {
        border-radius: 0.0625rem;
      }

      .ranking {
        margin: 0.125rem 0.325rem;
        padding: 0.125rem;
        width: 100%;
      }
    }

    .itemNumber {
      font-family: "LCD", serif;
      color: #1a5cd7;
    }
  }
</style>