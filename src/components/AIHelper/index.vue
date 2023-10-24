<template>
    <Teleport to="body">
        <div class="ai-helper-box" @mousedown="handleMouseDown" draggable="true"
            :style="{ left: pos.left + 'px', top: pos.top + 'px' }">
            <AIBall></AIBall>
        </div>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import AIBall from './components/AIBall.vue';


const pos = ref({
    left: 1300,
    top: 10
});

const handleMouseDown = (e) => {
    e.preventDefault();
    const oldX = e.clientX;
    const oldY = e.clientY;
    const { left, top } = pos.value;
    const move = (moveEvent) => {
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        pos.value.left = curX - oldX + left;
        pos.value.top = curY - oldY + top;
        console.log(pos.value.left);
    };
    const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
};
</script>

<style scoped lang="scss">
.ai-helper-box {
    position: fixed;
    z-index: 100;
}
</style>
