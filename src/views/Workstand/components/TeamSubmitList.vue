<template>
    <div class="team-submit-list">
        <div class="t-content" >
            <div class="t-item" 
            v-for="(i, index) in 15" 
            :key="i" 
            @click="handleSelect(index)" 
            :class="{'active-border': index === activeKey}">
                <div class="t-sum" 
                :style="{'--h': i/15*90 + '%'}"
                :class="{active: index === activeKey}"></div>
                <div class="t-name">{{ 'Ethan' }}</div>
            </div>
        </div>
    </div>
</template>


<script setup>

import { ref } from 'vue';

const activeKey = ref(0)

const handleSelect = (index) => {
    activeKey.value = index
}

</script>


<style scoped lang="scss">
.team-submit-list {
    width: 710px;
    height: 340px;
    padding: 20px;
    .t-content {
        height: 100%;
        width: 100%;
        display: flex;
        gap: 20px;
        flex-wrap: nowrap;
        align-items: center;
        overflow-x: scroll;
        transform: translateY(-10px);
        .t-item {
            min-width: 50px;
            height: 70%;
            background-color: rgba(64, 158, 255, 0.1) !important;
            border-radius: 17px;
            padding: 10px 5px;
            position: relative;
            .t-sum {
                --h: 0%;
                height: 0%;
                width: calc(100% - 10px);
                background-color: rgba(50, 153, 255, 0.7);
                position: absolute;
                bottom: 10px;
                border-radius: 10px;
                animation: t-show 1s forwards;
                @keyframes t-show {
                    to {
                        height: var(--h);
                    }
                }
            }
            .t-name {
                position: absolute;
                top: 110%;
                font-size: 0.8rem;
                color: grey;
                white-space: nowrap;
                width: 35px;
                overflow: hidden;
            }
            .active {
                background-color: rgb(50, 153, 255) !important;
            }
        }
        .active-border {
            border: 1px solid #40a0ff88 !important;
        }
    }
}
</style>