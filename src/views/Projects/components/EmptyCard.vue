<template>
    <div class="empty-card-box">
        <span class="add"></span>
        <span>添加团队</span>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.empty-card-box {
    width: 388px;
    height: 90px;
    background-color: white;
    margin: 10px;
    box-shadow: 0 0 4px 0 rgb(197 206 219 / 30%), 0 4px 8px 0 rgb(197 206 219 / 20%);
    padding: 30px;
    font-size: 1.1rem;
    font-weight: 600;
    color: grey;
    display: flex;
    align-items: center;
    transition: all 0.3s linear;
    cursor: pointer;
    .add {
        position: relative;
        width: 30px;
    }
    .add::after {
        content: '';
        position: absolute;
        height: 0.1px;
        width: 15px;
        border-bottom: 2px solid grey;
        scale: 0.9;

    }
    .add::before {
        content: '';
        position: absolute;
        height: 0.1px;
        width: 15px;
        border-bottom: 2px solid grey;
        rotate: 90deg;
        scale: 0.9;
    }
}
.empty-card-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 16px 10px rgb(228, 228, 228);
}
</style>
