<template>
    <div class="rule-layout">
        <div class="left">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="container">
                <div class="header">
                    <Breadcrumb></Breadcrumb>
                </div>
                <div class="main">
                    <Main></Main>
                </div>
            </div>
        </div>
        <AIHelper />
    </div>
</template>

<script setup>
import Menu from './components/Menu.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Main from './components/Main.vue'
import AIHelper from '@/components/AIHelper/index.vue'
</script>

<style scoped lang="scss">
.rule-layout {
    width: 100vw;
    height: 100vh;
    background-color: rgba(234, 234, 234, 0.781);
    display: flex;
    .left {
        width: $rule-layout-menu-width;
        height: 100%;
    }
    .right {
        width: calc(100vw - $rule-layout-menu-width);
        height: 100%;
        padding: 20px;
        .container {
            width: 100%;
            height: 100%;
            background-color: white;
            border-radius: 10px;
            .header {
                height: $rule-layout-breadcrumb-height;
                width: 100%;
            }
            .main {
                width: 100%;
                height: calc(100% - $rule-layout-breadcrumb-height);
            }
        }
    }
}
</style>
