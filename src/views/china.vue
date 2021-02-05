<template>
    <div id="china_map_box">
        <el-button type="primary" class="back" @click="back" v-if="deepTree.length > 1">×</el-button>
        <div class="echarts">
            <div id="map"></div>
        </div>
    </div>
</template>

<script>

    import {getChinaJson, getProvinceJSON, getCityJSON, getList} from "../api/get-json";
    import {cityProvincesMap} from '../config/cityProvincesMap'
    import {mapOption} from '../config/mapOption'
    // import {mapOptionProvince} from '../config/mapOptionProvince'


    export default {
        name: "china",
        components: {},
        data() {
            return {
                chart: null, // 实例化echarts
                provincesMap: cityProvincesMap.provincesMap, // 省拼音，用于查找对应json
                provincesCode: cityProvincesMap.provincesCode, // 市行政区划，用于查找对应json
                areaMap: cityProvincesMap.areaMap, // 省行政区划，用于数据的查找，按行政区划查数据
                special: ["北京市", "天津市", "上海市", "重庆市", "香港", "澳门"],//直辖市和特别行政区-只有二级地图，没有三级地图
                mapData: [], // 当前地图上的地区
                option: {...mapOption.basicOption}, // map的相关配置
                // optionProvince: {...mapOptionProvince.basicOption}, // map的相关配置
                deepTree: [],// 点击地图时push，点返回时pop
                areaName: '中国', // 当前地名
                areaCode: '000000', // 当前行政区划
                areaLevel: 'country', // 当前级别
                p:{
                    "params": {
                        "currentDate": "2021-01-29",
                        "provinceCode": "sx"
                    }
                }
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

                getList(this.p).then(res => {
                    this.$store.commit('Feeder',res.data);
                    // this.$store.commit('FeederCount',res.data.FEEDER_COUNT);
                    // this.$store.commit('TripCountCount',res.data.TRIP_COUNT);
                    // this.$store.commit('HeavyLoadCountCount',res.data.HEAVY_LOAD_COUNT);
                    // this.$store.commit('OverLoadCountCount',res.data.OVER_LOAD_COUNT);
                });
            },
            // 地图点击
            echartsMapClick(params) {
                console.log(params.areaName);
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
                this.$emit('map-change', params.data);

            },
            //绘制全国地图
            requestGetChinaJson() {
                getChinaJson().then(res => {
                    let arr = [];
                    for (let i = 0; i < res.features.length; i++) {
                        let obj = {
                            name: res.features[i].properties.name,
                            areaName: res.features[i].properties.name,
                            areaCode: res.features[i].id,
                            areaLevel: 'province',
                            value: Math.round(Math.random()),
                        };
                        // console.log(obj)
                        arr.push(obj)
                    }
                    this.mapData = arr;
                    this.deepTree.push({
                        mapData: arr,
                        params: {name: 'china', areaName: '中国', areaLevel: 'country', areaCode: '000000'}
                    });
                    //注册地图
                    this.$echarts.registerMap('china', res);
                    //绘制地图
                    this.renderMap('china', arr);
                });
            },
            // 加载省级地图
            requestGetProvinceJSON(params) {
                getProvinceJSON(params.areaCode).then(res => {
                    console.log(res)
                    this.$echarts.registerMap(params.areaName, res);
                    let arr = [];
                    for (let i = 0; i < res.features.length; i++) {
                        let obj = {
                            name: res.features[i].properties.name,
                            areaName: res.features[i].properties.name,
                            areaCode: res.features[i].id,
                            areaLevel: 'city',
                            value: Math.round(Math.random()),
                        };
                        arr.push(obj)
                    }
                    this.mapData = arr;
                    this.deepTree.push({
                        mapData: arr,
                        params: params,
                    });
                    this.renderMap(params.areaName, arr);
                });
            },
            // 加载市级地图
            requestGetCityJSON(params) {
                this.areaLevel = params.areaLevel;
                getCityJSON(params.areaCode).then(res => {
                    this.$echarts.registerMap(params.areaName, res);
                    let arr = [];
                    for (let i = 0; i < res.features.length; i++) {
                        let obj = {
                            name: res.features[i].properties.name,
                            areaName: res.features[i].properties.areaName,
                            areaCode: res.features[i].id,
                            areaLevel: 'districts',
                            value: Math.round(Math.random()),
                        };
                        arr.push(obj)
                    }
                    this.mapData = arr;
                    this.deepTree.push({mapData: arr, params: params});
                    this.renderMap(params.areaName, arr);
                })
            },
            renderMap(map, data) {
                this.option.series = [
                    {
                        name: map,
                        mapType: map,
                        ...mapOption.seriesOption,
                        data: data
                    }
                ];
                //渲染地图
                this.chart.setOption(this.option);
            },
            // renderMapProvince(map, data) {
            //     this.optionProvince.series = [
            //         {
            //             name: map,
            //             mapType: map,
            //             ...mapOptionProvince.seriesOption,
            //             data: data
            //         }
            //     ];
            //     //渲染地图
            //     this.chart.setOption(this.optionProvince);
            // },
            // 返回
            back() {
                // console.log(this.deepTree);
                if (this.deepTree.length > 1) {
                    this.deepTree.pop();
                    // let areaName = this.deepTree[this.deepTree.length - 1].params.areaName;
                    let name = this.deepTree[this.deepTree.length - 1].params.name;
                    let mapData = this.deepTree[this.deepTree.length - 1].mapData;
                    this.$emit('back-change', this.deepTree[this.deepTree.length - 1].params);
                    // console.log("areaName: "+name)
                    this.renderMap(name, mapData);
                    this.$store.commit('newNODE_ALIAS',this.deepTree[this.deepTree.length - 1].params.areaName)
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    #china_map_box {
        /*display: flex;*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*position: relative;*/
        padding: 0.2rem;
        height: 6.125rem;
        min-width: 3.75rem;
        border-radius: 0.0625rem;
        margin-left:0.1rem;
        margin-right:0.1rem;
        .echarts {
            margin-top: 0.2rem;
            width: 4.125rem;
            height: 2.125rem;
            .active-ring-name {
                padding-top: 0.125rem;
            }
            /*width: 0;*/
            /*flex: 1;*/
            /*background-size: 100% 100%;*/
            #map {
                height:8.5rem;
                width:8.525rem
            }
        }
        .back {
            /*position: absolute;*/
            font-size: 0.4rem;
            float: right;
            top: 0.1rem;
            right: .5rem;
            z-index: 999;
            /*padding-left: .12rem;*/
            /*padding-right: .12rem;*/

        }
    }

</style>

