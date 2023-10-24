<template>
    <div class="menu-box">
        <div class="top">
            <img src="../../../assets/images/user.jpeg" alt="">
            <div class="user">
                <span>Ethan</span>
                <span>工程师 队长</span>
            </div>
        </div>
        <div class="m-menu-list">
            <div class="m-menu-group" v-for="(group, index) in routeMap" :key="index">
                <div class="m-menu-item" v-for="menuItem in group" 
                @click="handleRouter(menuItem)"
                :key="menuItem.key" 
                :class="{active: store.state.rule.activeKey===menuItem.key}">
                    <el-icon class="icon">
                        <component :is="menuItem.iconName"></component>
                    </el-icon>
                    <span>
                        {{ menuItem.label }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()
const routeMap = store.state.rule.ruleRoutesMap

onMounted(() => {
    const curRoute = route.fullPath
    store.commit('rule/initActiveKey', curRoute)
})


const handleRouter = (menuItem) => {
    store.commit('rule/setActiveKey', menuItem.key)
    const routeItem = store.getters['rule/activeRouteItem']
    router.push({
        path: routeItem.routePath
    })
}

</script>

<style scoped lang="scss">
.menu-box {
    height: 100%;
    width: $rule-layout-menu-width;
    padding: 40px 10px;
    
    
    .top {
        display: flex;
        gap: 12px;
        width: 100%;
        padding: 15px 5px;
        border-bottom: 1px solid rgb(214, 214, 214);
        border-top: 1px solid rgb(214, 214, 214);
        img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            transition: all 0.2s linear;
        }
        img:hover {
            rotate: 360deg;
            scale: 1.1;
        }
        .user {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            width: 100%;
            gap: 3px;
            span {
                font-size: 0.8rem;
                font-weight: 400;
                color: grey;
            }
            span:first-child {
                font-size: 1.2rem;
                font-weight: 500;
                color: black;
            }
        }
        .user::after {
            content: '';
            position: absolute;
            right: 0;
            color: white;
            background-color: red;
            top: 10%;
            bottom: 10%;
            display: flex;
            align-items: center;
            padding: 0px 0px;
            transition: all 0.3s;
            border-radius: 5px;
            cursor: pointer;
        }
        .user:hover::after {
            content: 'Out';
            padding: 0px 20px;
        }
        
    }
    .m-menu-list {
        margin-top: 10px;
        .m-menu-group {
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-bottom: 1px solid rgb(214, 214, 214);
            .m-menu-item {
                width: 100%;
                padding: 10px 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 1rem;
                color: grey;
                border-radius: 8px;
                transition: all 0.3s;
                span {
                    margin-left: 15px;
                }
            }
            .m-menu-item:hover {
                opacity: 0.7;
                background-color: rgba(232, 232, 232, 0.718);
            }
            .active {
                background-color: $theme-bc-blue !important;
                color: $theme-c-blue;
            }
            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                svg {
                    margin-top: -2px;
                }
            }
        }
    }
}
</style>
