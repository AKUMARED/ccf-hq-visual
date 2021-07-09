<template>
    <div id="china_map_box">
        <el-button type="primary" class="back" @click="back" v-if="deepTree.length > 1">×</el-button>
        <div class="echarts">
            <div id="map"></div>
        </div>
    </div>
</template>

<script>
    import { formatTime } from '../../utils'
    import {getChinaJson, getProvinceJSON} from "../../api/get-json";
    import {cityProvincesMap} from '../../config/cityProvincesMap'
    import {mapOption} from '../../config/overView/mapOption'
    import {mapOptionProvince} from '../../config/overView/mapOptionProvince'
    import Utils from '../../utils/util';
    import UtilsT from '../../utils/utilT';

    function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    export default {
        name: "china",
        components: {},
        data() {
            return {
                chart: null, // 实例化echarts
                provincesMap: cityProvincesMap.provincesMap, // 省拼音，用于查找对应json
                provincesCode: cityProvincesMap.provincesCode, // 市行政区划，用于查找对应json
                nodeCode: cityProvincesMap.nodeCode,
                orgNameMap: cityProvincesMap.orgNameMap,
                cityMap: cityProvincesMap.cityMap,
                areaMap: cityProvincesMap.areaMap, // 省行政区划，用于数据的查找，按行政区划查数据
                special: ["北京市", "天津市", "上海市", "重庆市", "香港", "澳门"],//直辖市和特别行政区-只有二级地图，没有三级地图
                mapData: [], // 当前地图上的地区
                option: {...mapOption.basicOption}, // map的相关配置
                optionProvince: {...mapOptionProvince.basicOption}, // map的相关配置
                deepTree: [],// 点击地图时push，点返回时pop
                areaName: '中国', // 当前地名
                areaCode: '000000', // 当前行政区划
                areaLevel: 'country', // 当前级别
                nw: ["广西壮族自治区","海南省","广东省","贵州省","云南省","台湾省","澳门特别行政区","香港特别行政区","蒙西"],
                p:{
                    "dateTime": "",
                    "nodeCode": "",
                    "cityID": ""
                },
                dateYear: null,
                dateDay: null,
                sumFeeder:{
                    feederCount:0,
                    tripCount:0,
                    heavyLoadCount:0,
                    overLoadCount:0,
                    feederMalfunction:0
                },
                sumTransformer:{
                    transformerCount:0,
                    shutdownCount:0,
                    heavyLoadCount:0,
                    lowVoltageCount:0,
                    overLoadCount:0,
                    phaseImbalanceCount:0,
                    transformerMalfunction:0
                },
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initEcharts();
                this.chart.on('click', this.echartsMapClick);
            });
        },
        methods: {
            // 初次加载绘制地图
            initEcharts() {
                //地图容器
                this.chart = this.$echarts.init(document.getElementById('map'));
                if (this.areaCode === '000000') {
                    this.requestGetChinaJson();
                } else {
                    this.requestGetProvinceJSON({areaName: this.areaName, areaCode: this.areaCode})
                }
            },
            // 地图点击
            echartsMapClick(params) {
                this.areaName = params.areaName;
                if (params.name in this.provincesMap) {
                    this.areaCode = params.data.areaCode;
                    this.areaLevel = params.data.areaLevel;
                    //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
                    this.requestGetProvinceJSON(params.data);
                } else if (params.seriesName in this.provincesMap) {
                    //如果是【直辖市/特别行政区】只有二级下钻
                    if (this.special.indexOf(params.seriesName) >= 0) {
                        return;
                    } else {
                        this.areaCode = this.areaMap[params.name];
                        this.areaLevel = params.data.areaLevel;
                        //显示县级地图
                        this.requestGetCityJSON(params.data)
                    }
                } else {
                    return;
                }
                Utils.$emit('feeder',"msg");
                this.$store.commit('area',params.data.areaName)
                this.$emit('map-change', params.data);

            },
            //绘制全国地图
            async requestGetChinaJson() {
                let p={
                        "dateTime": "",
                        "nodeCode": "",
                        "cityID": ""
                    };
                let resultChinaJson = await getChinaJson();
                let arr = [];
                let obj = {};
                let provinceName; // eslint-disable-line no-unused-vars
                p.dateTime = this.dateDetermine();
                for (let i = 0; i < resultChinaJson.features.length; i++) {
                    if(resultChinaJson.features[i].properties.name in this.orgNameMap){
                        provinceName =this.orgNameMap[resultChinaJson.features[i].properties.name];
                    }
                    let tooltip = [];

                    if( contains(this.nw, resultChinaJson.features[i].properties.name)){
                        obj = {
                            name: resultChinaJson.features[i].properties.name,
                            areaName: resultChinaJson.features[i].properties.name,
                            areaCode: resultChinaJson.features[i].id,
                            center: resultChinaJson.features[i].properties.cp,
                            areaLevel: 'province',
                            value: null,
                            itemStyle: {
                                areaColor: 'rgba(0,0,0,0)',
                            }
                        };
                    }
                    else {
                        obj = {
                            name: resultChinaJson.features[i].properties.name,
                            areaName: resultChinaJson.features[i].properties.name,
                            areaCode: resultChinaJson.features[i].id,
                            center: resultChinaJson.features[i].properties.cp,
                            areaLevel: 'province',
                            value: tooltip,
                        };
                    }
                    arr.push(obj)
                }
                this.mapData = arr;
                this.deepTree.push({
                    mapData: arr,
                    params: {name: 'china', areaName: '中国', areaLevel: 'country', areaCode: '000000'}
                });
                //注册地图
                this.$echarts.registerMap('china', resultChinaJson);
                //绘制地图
                this.renderMap('china', arr);
            },
            // 加载省级地图
            async requestGetProvinceJSON(params) {
                let p={
                    "dateTime": "",
                    "nodeCode": "",
                    "cityID": ""
                };
                p.dateTime = this.dateDetermine();
                if(params.areaName in this.nodeCode){
                    p.nodeCode =this.nodeCode[params.areaName];
                }
                this.$store.commit("nodeCode",p.nodeCode);
                let resultProvinceJSON = await getProvinceJSON(params.areaCode);
                this.$echarts.registerMap(params.areaName, resultProvinceJSON);
                // let resultProvinceFeeder = await getFeeder(p);
                // this.$store.commit("FeederProvince",resultProvinceFeeder);
                // let resultProvinceTransformer = await getTansformer(p);
                // this.$store.commit("TransformerProvince",resultProvinceTransformer);
                let arr = [];
                let cityName; // eslint-disable-line no-unused-vars

                for (let i = 0; i < resultProvinceJSON.features.length; i++) {
                    let tooltip = []
                    if(resultProvinceJSON.features[i].properties.name in this.cityMap){
                        // p.nodeCode =this.nodeCode[params.areaName];
                        cityName = this.cityMap[resultProvinceJSON.features[i].properties.name]
                    }
                    // console.log(cityName);
                    // for(let j = 0; j < this.$store.state.FeederProvince.data.length; j++ ){
                    //     if(this.$store.state.FeederProvince.data[j].orgName === cityName){
                    //         tooltip.push(this.$store.state.FeederProvince.data[j].tripCount);
                    //         tooltip.push(this.$store.state.TransformerProvince.data[j].shutdownCount);
                    //     }
                    // }
                    // console.log(tooltip)
                    let obj = {
                        name: resultProvinceJSON.features[i].properties.name,
                        areaName: resultProvinceJSON.features[i].properties.name,
                        areaCode: resultProvinceJSON.features[i].id,
                        center: resultProvinceJSON.features[i].properties.cp,
                        areaLevel: 'city',
                        value: tooltip,
                    };
                    arr.push(obj)
                    // console.log(obj.center)
                }
                this.mapData = arr;
                this.deepTree.push({
                    mapData: arr,
                    params: params,
                });
                this.renderMapProvince(params.areaName, arr, params.center);
                UtilsT.$emit('transformer',"msg");

            },
            renderMap(map, data) {
                this.option.geo = [
                    {
                        name: map,
                        mapType: map,
                        ...mapOption.seriesOption,
                        data: data,
                    },
                ]
                this.option.series = [

                    {
                        name: map,
                        mapType: map,
                        ...mapOption.seriesOption,
                        data: data,
                    },
                ];
                if(map==="china"){
                    this.p.nodeCode =""
                }

                this.p.dateTime = this.dateDetermine();
                //渲染地图
                console.log(this.option);
                this.chart.setOption(this.option);
                UtilsT.$emit('transformer',"msg");
                Utils.$emit('week',"week");
            },
            renderMapProvince(map, data, center) {
                this.optionProvince.series = [
                    {
                        name: map,
                        mapType: map,
                        ...mapOptionProvince.seriesOption,
                        center: center,
                        data: data
                    }
                ];
                this.p.dateTime = this.dateDetermine();
                // console.log(this.p)
                if(map in this.nodeCode){
                    this.p.nodeCode =this.nodeCode[map];
                }
                // this.getData(this.p);
                //渲染地图
                this.chart.setOption(this.optionProvince);
                Utils.$emit('week',"week");
            },
            // 返回
            back() {
                if (this.deepTree.length > 1) {
                    this.deepTree.pop();
                    // let areaName = this.deepTree[this.deepTree.length - 1].params.areaName;
                    let name = this.deepTree[this.deepTree.length - 1].params.name;
                    let mapData = this.deepTree[this.deepTree.length - 1].mapData;
                    this.$emit('back-change', this.deepTree[this.deepTree.length - 1].params);
                    this.$store.commit('area',"全国网");
                    this.$store.commit('nodeCode',"");
                    this.renderMap(name, mapData);
                    Utils.$emit('feeder',"msg");

                }
            },
            //判断时间
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
    }

</script>

<style lang="scss" scoped>
    #china_map_box {
        /*display: flex;*/
        width: 100%;
        /*height: 100%;*/
        /*position: relative;*/
        padding: 0.1rem;
        height: 10.725rem;
        min-width: 3.75rem;
        border-radius: 0.0625rem;
        /*margin-left:15%;*/
        margin-right:0.1rem;
        .echarts {
            margin-top: 0.2rem;
            height:10.225rem;
            width:24.5rem;
            .active-ring-name {
                padding-top: 0.125rem;
            }
            /*width: 0;*/
            /*flex: 1;*/
            /*background-size: 100% 100%;*/
            #map {
                height:10.225rem;
                width:24.5rem
            }
        }
        .back {
            /*position: absolute;*/
            font-size: 0.6rem;
            float: right;
            top: 0.1rem;
            right: .5rem;
            z-index: 999;
            /*padding-left: .12rem;*/
            /*padding-right: .12rem;*/

        }
    }

</style>

