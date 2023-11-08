<template>
    <div class="water-ball-box">
        <div class="charts" ref="waterBallRef">

        </div>
    </div>
</template>


<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const props = defineProps({
  pkgNum: Number
})

const waterBallRef = ref()
const pn = ref(0)
const mc = ref()
watch(
  () => props.pkgNum,
  () => {
    pn.value = props.pkgNum
    option.value.series[0].label.normal.formatter = `${pn.value} \n \nPKG`
    setMyOption(mc.value)
  }
)

const option = ref({
        series: [
          {
            type: "liquidFill",
            radius: "75%",
            center: ["50%", "45%"],
            data: [0.5, 0.5, 0.5], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "rgb(255,0,255,0.1)",
            },
            label: {
              normal: {
                formatter: `${pn.value} \n \nPKG`,
                textStyle: {
                  fontSize: 25,
                  color: "#fff",
                },
              },
            },
            outline: {
              show: false,
            },
          },
          {
            type: "pie",
            center: ["50%", "45%"],
            radius: ["80%", "82%"],
            hoverAnimation: false,
            data: [
              {
                name: "",
                value: 500,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: "#009cff",
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: "#009cff",
                  },
                },
              },
              {
                //画中间的图标
                name: "",
                value: 4,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: "#ffffff",
                  normal: {
                    color: "#009cff",
                    borderColor: "#009cff",
                    borderWidth: 10,
                    // borderRadius: '100%'
                  },
                },
                label: {
                  borderRadius: "100%",
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: "#009cff",
                  },
                },
              },
              {
                // 解决圆点过大后续部分显示明显的问题
                name: "",
                value: 4,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: "#009cff",
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: "#009cff",
                  },
                },
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: 88,
                itemStyle: {
                  color: "rgba(9,59,118,0.95)",
                },
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: "rgba(255,255,255,0)",
                  },
                },
              },
            ],
          },
        ],
});

const setMyOption = (echart) => {
  echart.setOption(option.value, true)
}

onMounted(() => {
  const echart = echarts.init(waterBallRef.value)
  mc.value = echart
  setMyOption(echart)
})

</script>


<style scoped lang="scss">
.water-ball-box {
    height: 200px;
    width: 340px;
    .charts {
        height: 100%;
        width: 100%;
    }
}
</style>