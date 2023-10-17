<template>
    <div class="menu-box">
        <div class="menu-header">
            <img src="../../../assets/images/logo.png" alt="">
        </div>
        <div class="menu-list">
            <div class="menu-item" 
            v-for="(item, index) in routeMap"
            :key="item.label"
            :class="{active: whichShow === index}"
            @click="handleRouter(item, index)">
                {{ item.label }}
                <div class="mask" :style="{width: whichShow === index ? '100%' : '0%'}"></div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
let whichShow = ref(0)

onMounted(() => {
    const path = route.fullPath
    const index = routeMap.findIndex((item) => item.routePath === path)
    if (index) {
        whichShow.value = index
    }
})
const routeMap = [
    {
        label: '我的项目',
        routePath: '/projects/project-list'
    },
    {
        label: '使用文档',
        routePath: '/projects/docs'
    }
]

const handleRouter = (routeItem, index) => {
    whichShow.value = index
    router.push(routeItem.routePath)
    
}


</script>



<style lang="scss">
.menu-box {
    width: $home-layout-menu-width;
    height: 100%;
    border-right: 1px solid $border-c-week-grey;
    .menu-header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to left, rgba(21, 157, 255, 0.526), white);
        img {
            width: 200px;
            height: 100px;
        }
    }
    .menu-list {
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-top: 40px;
        .menu-item {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            width: 80%;
            border-radius: 10px;
            color: black;
            position: relative;
            cursor: pointer;
            z-index: 1;
            transition: color 0.3s;
            .mask {
                position: absolute;
                background-color: rgb(21, 122, 255);
                top: 0;
                right: 0;
                width: 0%;
                bottom: 0;
                z-index: -1;
                border-radius: 10px;
                transition: width 0.3s;
            }
        }
        .active {
            color: white;
        }
        
    }
}
</style>