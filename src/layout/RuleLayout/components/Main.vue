<template>
    <div class="main-box">
        <RouterView #="{ Component }">
            <Transition name="fade">
                <component :is="Component"></component>
            </Transition>
        </RouterView>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.main-box {
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: scroll;
    background-color: #f7f8fa;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
