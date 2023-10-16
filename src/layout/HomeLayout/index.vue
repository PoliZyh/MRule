<template>
    <div class="user-layout">
        <div class="left">
            <Menu></Menu>
        </div>
        <div class="right">
            <div class="header">
                <Header></Header>
            </div>
            <div class="bodyer">
                <Main></Main>
            </div>
        </div>
    </div>
</template>

<script setup>
import Menu from './components/Menu.vue'
import Header from './components/Header.vue';
import Main from './components/Main.vue';
</script>

<style scoped lang="scss">
.user-layout {
    height: 100vh;
    width: 100vw;
    display: flex;
    .left {
        width: $home-layout-menu-width;
        height: 100%;
    }
    .right {
        height: 100%;
        width: calc(100vw - $home-layout-menu-width);
        .header {
            width: 100%;
            height: $home-layout-header-height;
        }
        .bodyer {
            width: 100%;
            height: calc(100vh - $home-layout-header-height);
        }
    }
}
</style>
