<template>
    <div class="day-use-box">
        <div class="title">
            <p>日均规则制定量</p>
            <img src="../images/dataScreen-title.png" alt="" />
        </div>
        <div class="charts" ref="chartRef"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref()
onMounted(() => {
    const chart = echarts.init(chartRef.value)
    chart.setOption(option)
})
const sxnja = [
  93.67, 93.44, 94.34, 94.5, 97.82, 95.09, 95.79
];

const offsetX = 10;
const offsetY = 5;
// 绘制左侧面
const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint;
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - offsetX, shape.y - offsetY];
    const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
    const c3 = [xAxisPoint[0], xAxisPoint[1]];
    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath();
  }
});

// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [xAxisPoint[0], xAxisPoint[1]];
    const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
    const c4 = [shape.x + offsetX, shape.y - offsetY];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  }
});

// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
    const c3 = [shape.x, shape.y - offsetX];
    const c4 = [shape.x - offsetX, shape.y - offsetY];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  }
});

// 注册三个面图形
echarts.graphic.registerShape('CubeLeft', CubeLeft);
echarts.graphic.registerShape('CubeRight', CubeRight);
echarts.graphic.registerShape('CubeTop', CubeTop);

const option = {
  tooltip: {},
  title: {
    text: '单位/日',
    top: '4%',
    left: '3%',
    textStyle: {
      fontSize: '10px',
      fontWeight: 300,
      color: '#B5C5D4',
      opacity: 0.8
    }
  },
  xAxis: {
    type: 'category',
    data: [
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
      '星期天',
    ],
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#B5C5D4',
      fontSize: '10px',
      interval: 0
    }
  },
  yAxis: {
    type: 'value',
    min: 80,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#B2C2D3',
        opacity: 0.3,
        type: 'dotted'
      }
    },
    axisLabel: {
      color: '#B5C5D4',
      fontSize: '12px'
    }
  },
  grid: {
    left: '7%',
    right: 0,
    top: '15%',
    bottom: '20%',
    zlevel: -1,
    z: -1
  },
  series: [
    {
      name: '平均办案天数',
      type: 'custom',
      tooltip: {
        valueFormatter: function (value) {
          return value + '天';
        }
      },
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)]);
        console.log(location)
        return {
          type: 'group',
          children: [
            {
              type: 'CubeLeft',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 80])
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1,
                    color: 'rgba(25, 124, 186, 0)'
                  },
                  {
                    offset: 0,
                    color: 'rgba(16, 149, 218, 1)'
                  },
                  {
                    offset: 1,
                    color: 'transparent'
                  }
                ])
              }
            },
            {
              type: 'CubeRight',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 80])
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1,
                    color: 'rgba(25, 124, 186, 0)'
                  },
                  {
                    offset: 0,
                    color: 'rgba(16, 149, 218, 1)'
                  }
                ])
              }
            },
            {
              type: 'CubeTop',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 80])
              },
              style: {
                fill: '#31a7e3'
              }
            }
          ]
        };
      },
      data: sxnja
    }
  ]
};

</script>


<style scoped lang="scss">
.day-use-box {
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
    height: 260px;
    width: 100%;
  }
}
</style>