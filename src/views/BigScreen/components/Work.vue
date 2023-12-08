<template>
  <div class="age-box">
    <div class="title">
      <p>启用规则占比</p>
      <img src="../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import "echarts-gl";



const chartRef = ref()

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
function getCirlPoint(x0, y0, r, angle) {
  let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
  let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
  return {
    x: x1,
    y: y1
  };
}
let angle = 0; //角度，用来做简单的动画效果的
let value = 85;
let code = '启用规则占比';
const option = {
  title: {
    text: `{primary|${value}}\t{point|%}\n${code}`,
    left: 'center',
    top: 'center',
    textStyle: {
      rich: {
        primary: {
          color: '#fff',
          fontWeight: 500,
          fontSize: 48,
          lineHeight: 67.2
        },
        point: {
          fontSize: 14,
          lineHeight: 22,
          color: '#A1A6B1',
          verticalAlign: 'top',
          padding: [10, -10, 0, 0]
        }
      }
    }
  },
  legend: {
    show: false
  },
  series: [
    {
      name: '分数',
      type: 'pie',
      radius: ['60%', '82%'],
      silent: true,
      clockwise: true,
      startAngle: 180,
      z: 0,
      zlevel: 0,
      label: {
        position: 'center'
      },
      data: [
        {
          value: value,
          name: '',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#5FE2FC' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#0F7EFF' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        {
          value: 100 - value,
          name: '',
          label: {
            show: false
          },
          itemStyle: {
            color: '#E6EAF2'
          }
        }
      ]
    },
    {
      name: '分割线',
      type: 'gauge',
      radius: '110%',
      center: ['50%', '50%'],
      startAngle: 0,
      endAngle: 360.0,
      splitNumber: 65,
      splitLine: {
        length: 130,
        lineStyle: {
          width: 4,
          color: '#1f1f1f'
        }
      },
      // hoverAnimation: true,
      axisTick: {
        show: false
      },
      // splitLine: {
      //   length: 30,
      //   lineStyle: {
      //     width: 5,
      //     color: '#fff',
      //   },
      // },
      axisLabel: {
        show: false
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          opacity: 0
        }
      },
      detail: {
        show: false
      },
      data: [
        {
          value: 100,
          name: ''
        }
      ]
    },
    // {
    //   name: '背景线',
    //   type: 'pie',
    //   silent: true,
    //   startAngle: 0,
    //   z: 1,
    //   clockWise: true,
    //   hoverAnimation: false,
    //   radius: ['85%', '100%'],
    //   center: ['50%', '50%'],
    //   label: {
    //     show: false,
    //   },
    //   itemStyle: {
    //     label: {
    //       show: false,
    //     },
    //     labelLine: {
    //       show: false,
    //     },

    //     color: '#0b5263',
    //     borderWidth: 14,
    //     borderColor: '#fff',
    //   },
    //   data: [50, 50, 50, 50],
    // },
    // 第1个弧 点-线-点
    {
      name: 'ring5', // 上右点
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95;
        let point = getCirlPoint(x0, y0, r, 278 + angle);
        return {
          type: 'circle',
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: '#E6EAF2',
            fill: 'transparent'
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: 'ring5',
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        return {
          type: 'arc',
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95,
            startAngle: ((280 + -angle) * Math.PI) / 180,
            endAngle: ((-10 + -angle) * Math.PI) / 180
          },
          style: {
            stroke: '#E6EAF2',
            fill: 'transparent',
            lineWidth: 1
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: 'ring5', // 右上点
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95;
        let point = getCirlPoint(x0, y0, r, -8 + angle);
        return {
          type: 'circle',
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: '#E6EAF2', //绿
            fill: 'transparent'
          },
          silent: true
        };
      },
      data: [0]
    },
    // 第2个弧 点-线-点
    {
      name: 'ring5', // 左下点
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95;
        let point = getCirlPoint(x0, y0, r, 8 + angle);
        return {
          type: 'circle',
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: '#E6EAF2', //绿
            fill: 'transparent'
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: 'ring5', // 线
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        return {
          type: 'arc',
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95,
            startAngle: ((10 + -angle) * Math.PI) / 180,
            endAngle: ((80 + -angle) * Math.PI) / 180
          },
          style: {
            stroke: '#E6EAF2',
            fill: 'transparent',
            lineWidth: 1
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: 'ring5', // 下右点
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95;
        let point = getCirlPoint(x0, y0, r, 82 + angle);
        return {
          type: 'circle',
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: '#E6EAF2', //绿
            fill: 'transparent'
          },
          silent: true
        };
      },
      data: [0]
    },
    // 第3个弧 点-线-点
    {
      name: 'ring5', // 下左点
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95;
        let point = getCirlPoint(x0, y0, r, 98 + angle);
        return {
          type: 'circle',
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: '#E6EAF2',
            fill: 'transparent'
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: 'ring5', // 线
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        return {
          type: 'arc',
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95,
            startAngle: ((100 + -angle) * Math.PI) / 180,
            endAngle: ((170 + -angle) * Math.PI) / 180
          },
          style: {
            stroke: '#E6EAF2',
            fill: 'transparent',
            lineWidth: 1
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: 'ring5', // 左下点
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95;
        let point = getCirlPoint(x0, y0, r, 172 + angle);
        return {
          type: 'circle',
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: '#E6EAF2',
            fill: 'transparent'
          },
          silent: true
        };
      },
      data: [0]
    },
    // 第4个弧 点-线-点
    {
      name: 'ring5', // 左上点
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95;
        let point = getCirlPoint(x0, y0, r, 188 + -angle);
        return {
          type: 'circle',
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: '#E6EAF2', //绿
            fill: 'transparent'
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: 'ring5', // 线
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        return {
          type: 'arc',
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95,
            startAngle: ((190 + -angle) * Math.PI) / 180,
            endAngle: ((260 + -angle) * Math.PI) / 180
          },
          style: {
            stroke: '#E6EAF2',
            fill: 'transparent',
            lineWidth: 1
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: 'ring5', // 上左点
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.95;
        let point = getCirlPoint(x0, y0, r, 262 + -angle);
        return {
          type: 'circle',
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: '#E6EAF2', //绿
            fill: 'transparent'
          },
          silent: true
        };
      },
      data: [0]
    }
  ]
};



onMounted(() => {
  const myCharts = echarts.init(chartRef.value)
  myCharts.setOption(option)
})
</script>

<style lang="scss" scoped>
.age-box {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
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
