<template>
    <div class="projects-box">
        <h2>我的项目</h2>
        <div class="list">
            <ProjectCard v-for="i in 5" :key="i"></ProjectCard>
            <EmptyCard @click="router.push('/rule/workstand')"></EmptyCard>
        </div>
    </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import EmptyCard from './components/EmptyCard.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<style scoped lang="scss">
.projects-box {
    height: 100%;
    width: 100%;
    padding: 3% 7%;
    .list {
        display: flex;
        width: 85%;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 15px auto;
    }
}
</style>
