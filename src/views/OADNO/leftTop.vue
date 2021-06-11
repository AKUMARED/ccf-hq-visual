<template>
    <div id="center">
        <div class="left">
            <div style="margin-left: 0.1rem; width: 100%" >
                <div >
                    <div class=" item" >
                        <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339" >
                            线路总数:</p>
                        <div>
                            <p class="number">{{feederCount}}</p>
                        </div>
                    </div>
                </div>
                <div >
                    <div class=" item" >
                        <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339;background-color: unset;border: unset" @click="clickTZ()">
                            跳闸</p>
                        <div>
                            <p class="number">{{tripCount}}</p>
                        </div>
                    </div>
                </div>
                <div >
                    <div class=" item" >
                        <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339;background-color: unset;border: unset" @click="zz()">
                            重载</p>
                        <div>
                            <p class="number">{{heavyLoadCount}}</p>
                        </div>
                    </div>
                </div>
                <div >
                    <div class=" item" >
                        <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339;background-color: unset;border: unset" @click="gz()">
                            过载</p>
                        <div>
                            <p class="number">{{overLoadCount}}</p>
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
                <span class="text mx-2 mb-1" style="font-size: 0.175rem">配电线路异常: {{typeFeeder}}</span>
                <span class="text mx-2 mb-1" style="font-size: 0.175rem;float:right">（条次）</span>
                <dv-scroll-ranking-board :config="ranking" style="height:3rem"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { formatTime } from '../../utils'
    import {getFeeder, getTansformer} from "../../api/get-json";
    import Utils from '../../utils/util';

    export default {
        data() {
            return {
                feederParameters:{
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
            Utils.$on('feeder', function (msg) {
                console.log(msg);
                that.tz();
            });
            this.tz();
        },
        computed:{
            feederCount () {
                return this.$store.state.Feeder.feederCount
            },
            tripCount () {
                return this.$store.state.Feeder.tripCount
            },
            heavyLoadCount () {
                return this.$store.state.Feeder.heavyLoadCount
            },
            overLoadCount () {
                return this.$store.state.Feeder.overLoadCount
            },
            typeFeeder () {
                return this.$store.state.typeFeeder
            },
        },
        methods:{
            clickTZ(){
                Utils.$emit('week',"week");
                this.tz()
            },
            async tz(){
                let p={
                    "dateTime": "",
                    "nodeCode": "",
                    "cityID": ""
                };
                 p.dateTime = this.dateDetermine();
                 p.nodeCode = this.$store.state.nodeCode;
                 // console.log(p.nodeCode)
                 let  resultFeeder = await getFeeder(p);
                 this.$store.commit("FeederAll",resultFeeder);
                 let  resultTransformer = await getTansformer(p);
                 this.$store.commit("TransformerAll",resultTransformer);

                this.feederParameters.dateTime = this.dateDetermine();
                this.feederParameters.type = "TRIP_COUNT";
                let  tripCountData=[];
                for(let tripCountLength = 0;tripCountLength < this.$store.state.FeederAll.data.length; tripCountLength++){
                    let rankingData= {
                        name: "",
                        value:0
                    };
                    rankingData.name = this.$store.state.FeederAll.data[tripCountLength].orgName.replace("协同计算节点","").replace("国网","").replace("电力公司","").replace("电力有限公司","");
                    rankingData.value = this.$store.state.FeederAll.data[tripCountLength].tripCount;
                    tripCountData.push(rankingData)
                }
                this.$store.commit('feederRanking',tripCountData);
                this.ranking = {data:this.$store.state.feederRanking,  carousel: "single"};
                // console.log(this.$store.state.FeederAll.data.)
                // console.log(this.$store.state.feederRanking)


                this.$store.commit('MalfunctionType',"跳闸");
                this.$store.commit('typeFeeder',"跳闸");
            },
            async zz(){
                this.feederParameters.dateTime = this.dateDetermine();
                this.feederParameters.type = "HEAVY_LOAD_COUNT";

                let  tripCountData=[];
                for(let tripCountLength = 0;tripCountLength < this.$store.state.FeederAll.data.length; tripCountLength++){
                    let rankingData= {
                        name: "",
                        value:0
                    };
                    rankingData.name = this.$store.state.FeederAll.data[tripCountLength].orgName.replace("协同计算节点","").replace("国网","").replace("电力公司","").replace("电力有限公司","");
                    rankingData.value = this.$store.state.FeederAll.data[tripCountLength].heavyLoadCount;
                    tripCountData.push(rankingData)
                }
                this.$store.commit('feederRanking',tripCountData);
                this.ranking = {data:this.$store.state.feederRanking,  carousel: "single"};

                Utils.$emit('week',"msg");
                this.$store.commit('MalfunctionType',"线路重载");
                this.$store.commit('typeFeeder',"重载");
            },
            async gz(){
                this.feederParameters.dateTime = this.dateDetermine();
                this.feederParameters.type = "OVER_LOAD_COUN";

                let  tripCountData=[];
                for(let tripCountLength = 0;tripCountLength < this.$store.state.FeederAll.data.length; tripCountLength++){
                    let rankingData= {
                        name: "",
                        value:0
                    };
                    rankingData.name = this.$store.state.FeederAll.data[tripCountLength].orgName.replace("协同计算节点","").replace("国网","").replace("电力公司","").replace("电力有限公司","");
                    rankingData.value = this.$store.state.FeederAll.data[tripCountLength].overLoadCount;
                    tripCountData.push(rankingData)
                }
                this.$store.commit('feederRanking',tripCountData);
                this.ranking = {data:this.$store.state.feederRanking,  carousel: "single"};

                Utils.$emit('week',"msg");
                this.$store.commit('MalfunctionType',"线路过载");
                this.$store.commit('typeFeeder',"过载");
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
            justify-content: space-around;

            .item {
                display: flex;
                margin-top: 0.25rem;
                margin-left: 0.3rem;
                flex-direction: row;
                width: 90%;
                height: 0.625rem;
                .number{
                    font-size: 24px;
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