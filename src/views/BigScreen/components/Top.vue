<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="handleGoHome">首页</span>
    </div>
    <div class="center">
      <div class="title">MRule可视化大屏</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment'

const router = useRouter()
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timer = ref(0)

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer.value)
})

const handleGoHome = () => {
  router.push({
    name: 'Home',
  })
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1.5;
    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url('../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 34px;
    }
  }
  .right {
    flex: 1.5;
    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 150px;
      height: 40px;
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: cover;
      float: left;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }
    .time {
      color: #29fcff;
      font-size: 20px;
      margin-right: 15px;
    }
  }
}
</style>
