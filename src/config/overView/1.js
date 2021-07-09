export const mapOption = {
    basicOption:{
        showLegendSymbol: true,
        tooltip: {
            trigger: 'item',
            formatter:function(params) {
                let a = "--";
                let b = "--"; // eslint-disable-line no-unused-vars
                a = JSON.stringify(params.data.value);
                b = JSON.parse(a);
                let tooltip = "线路跳闸: "+ "--" +'</br>'+"配变停运数: "+ "--" +'</br>'+"工单总数: "+"--";
                return tooltip
            },


            textStyle: {
                fontSize: 14,
                lineHeight: 22,
            },
            position: point => {
                // 固定在顶部
                return [point[0] + 50, point[1] - 20];
            },
        },
        //左侧小导航图标
        visualMap: {
            min: 0,
            max: 100,
            show: false,
            seriesIndex: 0,
            // 颜色
            inRange: {
                color: ['rgba(41,166,206,0.83)', 'rgba(69,117,245, .9)'],
            },
        },
        geo: {
            map:'china',
            name: '',
            type: 'map',
            // aspectScale: 1, //长宽比
            zoom: 1.2,
            roam: true,
            center: [104.28, 36.32],
            top: '10%',
            left: '25%',
            nameMap:{
                'china':'中国'
            },
            label: {
                formatter: params => `${params.name}`,
                show: false,
                position: 'insideRight',
                textStyle: {
                    fontSize: 16,
                    color: '#efefef',
                },
                emphasis: {
                    textStyle: {
                        color: '#fff',
                    },
                },
            },
            // itemStyle: {
            //     normal: {
            //         color: 'red',
            //         areaColor: 'rgba(2,32,24,0.19)',
            //         borderColor: 'rgba(0,242,252,.3)',
            //         borderWidth: 1,
            //         shadowBlur: 4,
            //         shadowColor: '#00f2fc',
            //     },
            //     emphasis: {
            //         areaColor: '#4f7fff',
            //         borderColor: 'rgba(0,242,252,.6)',
            //         borderWidth: 2,
            //         shadowBlur: 10,
            //         shadowColor: '#00f2fc',
            //     },
            // },

            // top:100,
            // layoutCenter: ['30%', '30%'],
            // // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
            // layoutSize: 100
            // 设置这两个值后 left/right/top/bottom/width/height 无效。
        }
    },
    // seriesOption:{
    //     name: '',
    //     type: 'map',
    //     // aspectScale: 1, //长宽比
    //     zoom: 1.2,
    //     roam: true,
    //     center: [104.28, 36.32],
    //     top: '10%',
    //     left: '25%',
    //     nameMap:{
    //         'china':'中国'
    //     },
    //     label: {
    //         formatter: params => `${params.name}`,
    //         show: false,
    //         position: 'insideRight',
    //         textStyle: {
    //             fontSize: 16,
    //             color: '#efefef',
    //         },
    //         emphasis: {
    //             textStyle: {
    //                 color: '#fff',
    //             },
    //         },
    //     },
    //     itemStyle: {
    //         normal: {
    //             color: 'red',
    //             areaColor: 'rgba(2,32,24,0.19)',
    //             borderColor: 'rgba(0,242,252,.3)',
    //             borderWidth: 1,
    //             shadowBlur: 4,
    //             shadowColor: '#00f2fc',
    //         },
    //         emphasis: {
    //             areaColor: '#4f7fff',
    //             borderColor: 'rgba(0,242,252,.6)',
    //             borderWidth: 2,
    //             shadowBlur: 10,
    //             shadowColor: '#00f2fc',
    //         },
    //     },
    // }
}
