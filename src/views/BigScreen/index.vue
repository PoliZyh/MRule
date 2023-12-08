<template>
  <div class="container">
    <!-- 内容区 -->
    <div class="screen" ref="screenRef">
      <!-- 顶部 -->
      <Top></Top>

      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Work class="age"></Work>
          <Sex class="sex"></Sex>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <AgeAll class="age-all"></AgeAll>
          <DayUse class="day-use"></DayUse>
          <Source class="other"></Source>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Top from './components/Top.vue'
import Work from './components/Work.vue'
import Tourist from './components/Tourist.vue'
import Sex from './components/Sex.vue'
import Map from './components/Map.vue'
import Line from './components/Line.vue'
import AgeAll from './components/AgeAll.vue'
import DayUse from './components/DayUse.vue'
import Source from './components/Source.vue'

const screenRef = ref()

onMounted(() => {
  screenRef.value.style.setProperty(
    'transform',
    `scale(${getScale()}) translate(-50%, -50%)`,
  )
})

// 大屏锁放的比例
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const hh = window.innerHeight / h
  return ww < hh ? ww : hh
}

// 监听适口变化
window.onresize = () => {
  screenRef.value.style.setProperty(
    'transform',
    `scale(${getScale()}) translate(-50%, -50%)`,
  )
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-image: url('./images/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;

    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .age-all {
          margin-top: 10px;
          flex: 1.2;
        }
        .other {
          flex: 1;
        }
        .day-use {
          flex: 1;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>
