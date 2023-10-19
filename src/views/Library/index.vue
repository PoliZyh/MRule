<template>
    <div class="library-page">
        <div class="lp-left"></div>
        <div class="lp-right">
            <FileTress :data="data" v-model:active-node="activeNode"></FileTress>
        </div>
    </div>
</template>


<script setup>
import FileTress from '@/components/FileTree/index.vue'
import { ref } from 'vue';

const activeNode = ref()
const data = ref([
    {
        id: 1,
        type: 'folder',
        name: '文件夹1',
        children: [
            {
                id: 2,
                type: 'folder',
                name: '文件夹2',
                children: [
                    {
                        id: 3,
                        type: 'file',
                        name: '变量1'
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        type: 'folder',
        name: '文件夹3',
        children: [
            {
                id: 5,
                type: 'file',
                name: '变量2'
            }
        ]
    },
    {
        id: 6,
        type: 'file',
        name: '文件1'
    }
])
</script>



<style scoped lang="scss">
.library-page {
    width: 100%;
    height: 100%;
    display: flex;
    .lp-left {
        width: 75%;
    }
    .lp-right {
        width: 25%;
        border-left: 1px solid rgb(217, 217, 217);
    }
}
</style>