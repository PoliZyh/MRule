<template>
    <div class="breadcrumb-box">
        <div class="breadcrumb-item" 
        v-for="item in store.getters['rule/historyRoutes']" 
        :class="{active: item.key === store.state.rule.activeKey}"
        @click="handleRouter(item)">
            <el-icon class="icon">
                <component :is="item.iconName"></component>
            </el-icon>
            {{ item.label }}
            <div class="del-mask" @click="handleDeleteRoute($event, item)"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

onMounted(() => {

})

const handleRouter = (routeItem) => {
    store.commit('rule/setActiveKey', routeItem.key)
    router.push(routeItem.routePath)
}

const handleDeleteRoute = (e, routeItem) => {
    e.stopPropagation()
    store.commit('rule/deleteHistoryKey', routeItem.key)
}
</script>

<style scoped lang="scss">
.breadcrumb-box {
    width: 100%;
    height: $rule-layout-breadcrumb-height;
    background-color: #f1f1f1;
    display: flex;
    padding-top: 2px;
    border-top: 1px solid #f1f1f1;
    .breadcrumb-item {
        padding: 4px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.9rem;
        cursor: pointer;
        padding-right: 25px;
        position: relative;
        .icon {
            margin-right: 8px;
        }
        .del-mask {
            position: absolute;
            right: 6%;
            top: 20%;
            width: 8px;
            height: 10px;
            background-color: transparent;
        }
    }
    .breadcrumb-item:hover::after {
        width: 8px;
        border-width: 0.5px;
    }
    .breadcrumb-item:hover::before {
        width: 8px;
        border-width: 0.5px;
    }
    .breadcrumb-item::after {
        content: '';
        width: 0px;
        border: 0px solid #737373;
        position: absolute;
        right: 6%;
        top: 33%;
        rotate: 45deg;
    }
    .breadcrumb-item::before {
        content: '';
        width: 0px;
        border: 0px solid #737373;
        position: absolute;
        right: 6%;
        top: 33%;
        rotate: -45deg;
    }
    .active {
        background-color: white;
    }

   
}
</style>
