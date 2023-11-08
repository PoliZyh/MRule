<template>
    <div class="submit-list-box">
        <div class="list-title">
            <div class="icon"></div>
            近四次提交
        </div>
        <div class="lists">
            <div class="list-item" v-for="(item, index) in props.info" :key="item.username" ref="listItemsRef" :style="{'--t': index/5 + 's'}">
                <div class="reac" :style="{'--i': index / 15}"></div>
                <span class="name">{{ item.username }}&nbsp;</span>
                <span class="time">{{ `(${item.time})` }}</span>
            </div>
            
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps({
    info: {
        type: Array,
        default: () => []
    }
})
const submitList = ref([
    {
        name: 'conn',
        time: '2023-10-15',
        userAccount: '272798802'
    },
    {
        name: 'conn',
        time: '2023-10-15',
        userAccount: '272798802'
    },
    {
        name: 'conn',
        time: '2023-10-15',
        userAccount: '272798802'
    },
    {
        name: 'conn',
        time: '2023-10-15',
        userAccount: '272798802'
    }
])

const listItemsRef = ref([])

onMounted(() => {
    // listItemsRef.value.forEach(element => {
    //     element.style.opacity = '1'
    //     element.style.transform = 'translateX(0%)'
    // });
})

</script>


<style scoped lang="scss">
.submit-list-box {
    height: 200px;
    width: 340px;
    padding: 20px;
    .list-title {
        position: relative;
        .icon {
            position: absolute;
            height: 100%;
            width: 3px;
            left: -10px;
            border-radius: 5px;
            background-color: $theme-c-blue;
        }
    }
    .lists {
        width: 100%;
        display: flex;
        flex-direction: column;
        .list-item {
            --t: 1s;
            margin-top: 10px;
            width: 100%;
            position: relative;
            padding: 0px 15px;
            gap: 5px;
            transform: translateX(50%);
            // transition: all 0.5s linear;
            opacity: 0;
            animation: show-item 0.5s forwards ease-in-out;
            animation-delay: var(--t);
            .reac {
                --i: 0.3;
                position: absolute;
                width: 10px;
                height: 10px;
                left: -10px;
                border-radius: 3px;
                top: 50%;
                transform: translateY(-50%);
                background-color: hsl(calc(var(--i) * 360), 100%, 50%);
            }
            .time {
                color: grey;
            }
        }
        @keyframes show-item {
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    }
}
</style>