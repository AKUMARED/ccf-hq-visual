<template>
    <div id="center">
        <div class="left">
            <div class="bg-color-black" style="margin-left: 0.1rem; width: 100%" >
                <span style="color:#5cd9e8">
                    <icon name="align-left"></icon>
                </span>
                    <span class="text mx-2 mb-1" style="font-size: 0.175rem">配电线路故障异常</span>
                    <div style=" display: flex; flex-direction: row;">
                        <div class=" item" v-for="item in titleItem" :key="item.title">
                            <dv-digital-flop :config="item.number" style="width:1rem;height:.325rem;margin-left: 0.05rem"/>
                            <p class="" style="font-size:0.175rem; width: 1.125rem;text-align:center;color: #ffe339">
                                {{item.title}}</p>
                        </div>
                    </div>
            </div>
            <div class="bg-color-black" style="margin-left: 0.1rem; width: 100%" >
                <span style="color:#5cd9e8">
                    <icon name="align-left"></icon>
                </span>
                <span class="text mx-2 mb-1" style="font-size: 0.175rem">平均每万条线路</span>
                <div style=" display: flex; flex-direction: row;">
                    <div class=" item" v-for="item in titleItem" :key="item.title">
                        <dv-digital-flop :config="item.number" style="width:1rem;height:.325rem;margin-left: 0.05rem"/>
                        <p class="" style="font-size:0.175rem; width: 1.125rem;text-align:center;color: #ffe339">
                            {{item.title}}</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="right">
            <div class="ranking bg-color-black">
                <span style="color:#5cd9e8">
                    <icon name="align-left"></icon>
                </span>
                <span class="text mx-2 mb-1" style="font-size: 0.175rem">{{titleItem[0].title}}</span>
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
                    unit: "台次"
                },
            };
        },
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
                flex-direction: column;
                width: 33%;
                height: 0.625rem;
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