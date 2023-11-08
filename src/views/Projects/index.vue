<template>
    <div class="projects-box">
        <h2>我的项目</h2>
        <div class="list">
            <ProjectCard v-for="item in projectList" :key="item.id" 
            :id="item.id" :project-name="item.projectName" :position="item.position"
            @get-list="getProjetcList"></ProjectCard>
            <EmptyCard @click="handleAddProject"></EmptyCard>
        </div>
        <el-dialog v-model="dialogTableVisible" title="添加项目" :before-close="handleBeforeClose" width="40%">
            
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="创建项目" name="create">
                    <el-form style="margin-top: 15px;">
                        <el-form-item label="项目名">
                            <el-input v-model="newProjectParams.projectName"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="加入项目" name="join">
                    <el-form style="margin-top: 15px;">
                        <el-form>
                            <el-form-item label="申请的项目ID">
                                <el-input v-model="joinProjectParams.projectId"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-tab-pane>
                
            </el-tabs>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="() => {dialogTableVisible = false;newProjectParams.projectName = ''}">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import EmptyCard from './components/EmptyCard.vue';
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue';
import api from '../../api';
const router = useRouter()
const projectList = ref([])
const dialogTableVisible = ref(false)
const activeName = ref('create')
const newProjectParams = reactive({
    projectName: '',
    position: 0
})
const joinProjectParams = reactive({
    projectId: ''
})
const getProjetcList = async () => {
    try {
        const res = await api.projectListRequest({})
        if (res.code === 200) {
            projectList.value = res.data
        }
    } catch {

    }
}

const handleAddProject = () => {
    dialogTableVisible.value = true
}

const handleBeforeClose = (done) => {
    newProjectParams.projectName = ''
    done()
}

const handleConfirm = async () => {
    if (activeName === 'create') {
        try {
            await api.addProjectRequest(newProjectParams)
        } catch {

        }
    } else {
        // 加入项目
        try {
            await api.applyUserRequest(joinProjectParams)
        } catch {

        }
    }
    dialogTableVisible.value = false
    getProjetcList()
}

onMounted(() => {
    getProjetcList()
})

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
