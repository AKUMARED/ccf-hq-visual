<template>
    <div id="center">
        <div class="left">
            <div style="margin-left: 0.1rem; width: 100%" >
                <div >
                    <div class=" item" >
                        <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339">
                            线路总数:</p>
                        <div>
                            <p class="number">{{feederCount}}</p>
                        </div>
                    </div>
                </div>
                <div >
                    <div class=" item" >
                        <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339">
                            跳闸:</p>
                        <div>
                            <p class="number">{{tripCount}}</p>
                        </div>
                    </div>
                </div>
                <div >
                    <div class=" item" >
                        <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339">
                            重载:</p>
                        <div>
                            <p class="number">{{heavyLoadCount}}</p>
                        </div>
                    </div>
                </div>
                <div >
                    <div class=" item" >
                        <p class="" style="font-size:0.3rem; width: 3.2rem;text-align:center;color: #ffe339">
                            过载:</p>
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
                <span class="text mx-2 mb-1" style="font-size: 0.175rem">配电线路异常：</span>
                <dv-scroll-ranking-board :config="ranking" style="height:3rem"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                titleItem: [
                    {
                        title: "线路总数",
                        number: {
                            number: [440],
                            toFixed: 1,
                            content: "{nt}"
                        }
                    },
                    {
                        title: "跳闸",
                        number: {
                            number: [120],
                            toFixed: 1,
                            content: "{nt}"
                        }
                    },
                    {
                        title: "重载",
                        number: {
                            number: [18],
                            toFixed: 1,
                            content: "{nt}"
                        }
                    },
                    {
                        title: "过载",
                        number: {
                            number: [2],
                            toFixed: 1,
                            content: "{nt}"
                        }
                    }
                ],
                ranking: {
                    data: [
                        {
                            name: "北京",
                            value: 120
                        },
                        {
                            name: "天津",
                            value: 2
                        },
                        {
                            name: "上海",
                            value: 14
                        },
                        {
                            name: "重庆",
                            value: 18
                        },
                        {
                            name: "冀北",
                            value: 106
                        },
                    ],
                    carousel: "single",
                    unit: "次"
                },
            };
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../common/font/font.css";

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