<template>
    <div class="ai-ball-box">
        <div class="before-active">
            <svg t="1698154789193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5438"><path d="M554.666667 251.733333V341.333333h341.333333v426.666667H170.666667V341.333333h341.333333V251.733333c-25.6-8.533333-42.666667-34.133333-42.666667-59.733333 0-34.133333 29.866667-64 64-64s64 29.866667 64 64c0 29.866667-17.066667 51.2-42.666666 59.733333zM512 384H213.333333v341.333333h640V384h-341.333333z m-384 85.333333v213.333334H85.333333v-213.333334h42.666667z m853.333333 0v213.333334h-42.666666v-213.333334h42.666666zM384 597.333333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666666z m298.666667 0c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666666 42.666667-17.066667 42.666667-42.666666 42.666666z" fill="#409eff" p-id="5439"></path></svg>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.ai-ball-box {
    height: 40px;
    width: 40px;
    position: relative;
    left: 0;
    .before-active {
        height: 100%;
        width: 100%;
        display: flex;
        border-radius: 50%;
        outline: 5px solid rgba(64, 158, 255, 0.1);
        background-color: white;
        transition: all 0.3s;
        cursor: pointer;
        .icon {
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            padding: 10%;
            color: yellow;
        }
    }
    .before-active:hover {
        background-color: rgba(64, 158, 255, 0.1) !important;
        outline-color: rgb(110, 185, 255);
    }
}
</style>