<template>
    <div class="source-box">
        <div class="title">
            <p>剩余计算资源</p>
            <img src="../images/dataScreen-title.png" alt="" />
        </div>
        <div class="charts" ref="chartRef"></div>
    </div>
</template>


<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref()
let timer
onMounted(() => {
    const myChart = echarts.init(chartRef.value)
    myChart.setOption(option)
    function doing() {
        let option = myChart.getOption();
        option.series[1].startAngle = option.series[1].startAngle - 1;
        myChart.setOption(option);
    }
    function startTimer() {
        clearInterval(self.waterQuality1Interval);
        self.waterQuality1Interval = setInterval(doing, 100);
    }
    timer = setTimeout(startTimer, 1000);
})
onUnmounted(() => {
    clearTimeout(timer)
})

let value = 96.1;
const option = {
    //你的代码
    title: {
        text: '{a|' + value + '}{b|%}',
        left: 'center',
        top: 'center',
        textStyle: {
            rich: {
                a: {
                    fontSize: 32,
                    color: '#fff',
                    fontWeight: '600',
                },
                b: {
                    fontSize: 16,
                    color: '#fff',
                    padding: [0, 0, 14, 0]
                },
                c: {
                    fontSize: 20,
                    color: '#fff',
                    padding: [5, 0]
                }
            }
        }
    },
    series: [
        {
            type: 'gauge',
            radius: '88%',
            clockwise: false,
            startAngle: 90,
            endAngle: 450,
            splitNumber: 30,
            detail: {
                offsetCenter: [0, -20],
                formatter: ' '
            },
            pointer: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: [
                        [0, '#2CFAFC'],
                        [value / 100, '#0ff'],
                        [1, 'rgba(44,250,252, 0.4)']
                    ],
                    width: 18
                },

            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                length: 200,
                lineStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 255, 255, 1)',
                    shadowOffsetY: 0,
                    color: 'rgba(2,15,24,0.3)',
                    width: 2
                },
                distance: -17
            },
            axisLabel: {
                show: false
            }
        },
        {
            type: 'pie',
            radius: ['68%', '66%'],
            animation: false,
            silent: true,
            itemStyle: {
                color: '#0C355E'
            },
            label: {
                show: false
            },
            data: _dashed()
        },

        {
            type: 'pie',
            radius: [0, '46%'],
            animation: false,
            silent: true,
            itemStyle: {
                shadowBlur: 20,
                shadowColor: 'RGBA(16, 65, 141, 0.1)',
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: '#0FF',
                }, {
                    offset: 1,
                    color: '#060f20'
                }])

            },
            label: {
                show: false
            },
            data: [100]
        },

    ]
};
function _dashed() {
    let dataArr = [];
    for (var i = 0; i < 100; i++) {
        if (i % 2 === 0) {
            dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                    color: 'rgb(0,255,255,.3)',
                }
            })
        } else {
            dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                    color: 'rgb(0,0,0,0)',
                    borderWidth: 1,
                    borderColor: "rgba(0,255,255,1)"
                }
            })
        }

    }
    return dataArr
}

</script>


<style scoped lang="scss">
.source-box {
    width: 100%;
    height: 100%;
    background: url('../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;

    .title {
        margin-top: 15px;

        p {
            margin-left: -20px;
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: 240px;
        width: 100%;
    }
}
</style>