<template>
    <div class="project-dynamics-page">
        <h4>项目动态</h4>
        <div class="p-timer">
            <el-date-picker
                v-model="selectTime"
                type="date"
                placeholder="Select date and time"
            />
            <el-button style="margin-left: 10px;">重置</el-button>
        </div>
        <Timeline :data="historys"></Timeline>
    </div>
</template>

<script setup>
import Timeline from '@/components/Timeline/index.vue'
import { onMounted, ref } from 'vue';
import api from '../../api';
import { useStore } from 'vuex';

const store = useStore()
const selectTime = ref('')
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
const projectId = store.state.project.projectId
const historys = ref([])
const getStatusList = async () => {
    try {
        const res = await api.getProjectDynamicRequest({
            projectId: projectId
        })
        console.log(res)
        historys.value = res.data
        historys.value = Object.keys(historys.value).map(date => ({
            date: date,
            more: historys.value[date].map(item => ({
                user: item.username,
                detail: item.event,
                time: item.time.split(' ')[1]
            }))
        }));
    } catch {}
}


onMounted(() => {
    getStatusList()
})
</script>

<style scoped lang="scss">
.project-dynamics-page {
    width: 100%;
    height: 100%;
    h4 {
        margin-bottom: 20px;
    }
    .p-timer {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
    }
}
</style>
