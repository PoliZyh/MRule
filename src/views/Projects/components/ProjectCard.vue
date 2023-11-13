<template>
    <div class="project-card-box" @click="handleRoute">
        <span>{{ projectName }}</span>
        <span class="tag">
            {{ position === 1 ? '队长' : '队员'}}
        </span>
        <span class="del" @click="handleDelete"></span>
    </div>
</template>

<script setup>
// 0队长 1队员
import api from '../../../api';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const props = defineProps({
    id: Number,
    projectName: String,
    position: Number
})
const emit = defineEmits(['getList'])

const handleDelete = async () => {
    await api.deleteProjectRequest({
        id: props.id
    });
    emit('getList')
}
const handleRoute = () => {
    router.push({
        name: 'Rule',
        params: {
            projectId: props.id
        }
    })
    store.commit('project/setProjectId', props.id)
}
</script>

<style scoped lang="scss">
.project-card-box {
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
    .tag {
        padding: 3px 12px;
        font-size: 0.8rem;
        background-color: orange;
        color: white;
        border-radius: 3px;
        font-weight: 400;
        margin-left: 5px;
    }
    .del {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        position: relative;
        cursor: pointer;
    }
    .del::after {
        content: '';
        position: absolute;
        rotate: 45deg;
        width: 20px;
        border-bottom: 2px solid grey;
        height: 0.1px;
        scale: 0.8;
    }
    .del::before {
        content: '';
        position: absolute;
        // transform: translateX(1px);
        rotate: -45deg;
        width: 20px;
        border-top: 2px solid grey;
        height: 0.1px;
        scale: 0.8;
    }
}
.project-card-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 16px 10px rgb(228, 228, 228);
}
</style>
