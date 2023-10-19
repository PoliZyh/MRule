<template>
    <div class="project-dynamics-page">
        <h4>项目动态</h4>
        <Timeline :data="data"></Timeline>
    </div>
</template>

<script setup>
import Timeline from '@/components/Timeline/index.vue'
import { ref } from 'vue';

const data = ref([
    {
        date: '2023-10-15',
        more: [
            {
                user: 'Ethan',
                detail: '保存变量库文件[conn]',
                time: '18:35'
            },
            {
                user: 'Ethan',
                detail: '保存变量库文件[conn]',
                time: '18:35'
            }
        ]
        
    },
    {
        date: '2023-10-16',
        more: [
            {
                user: 'Ethan',
                detail: '保存变量库文件[conn]',
                time: '18:35'
            },
            {
                user: 'Ethan',
                detail: '保存变量库文件[conn]',
                time: '18:35'
            }
        ]
        
    }
])
</script>

<style scoped lang="scss">
.project-dynamics-page {
    width: 100%;
    height: 100%;
    h4 {
        margin-bottom: 20px;
    }
}
</style>
