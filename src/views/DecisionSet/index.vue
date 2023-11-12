<template>
    <div class="decision-set-page">
        <div class="ds-left">
            <template v-if="ruleSet.length > 0">
                <div class="ds-left-header">
                    <el-button>添加规则</el-button>
                </div>
            </template>
            <el-table :data="ruleSet" style="width: 100%;">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="ruleName" label="规则名" width="180" />
                <el-table-column prop="rule" label="规则字符串" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
        <div class="ds-right">
            <FileTree :data="data" v-model:active-node="activeNode" @refreshFileTree="getFileTree"></FileTree>
        </div>
    </div>
</template>


<script setup>
import FileTree from "@/components/FileTree/index.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import api from "@/api";

const store = useStore()
const projectId = store.state.project.projectId
const data = ref([])
const activeNode = ref()
const ruleSet = ref([])

watch(() => activeNode.value, () => {
    if (activeNode.value && !activeNode.value.isFolder) {
        getRuleSet()
    }
})

const getRuleSet = async () => {
    try {
        const res = await api.getAllRulesRequest({
            fileId: activeNode.value.id,
            fileType: 2
        })
        if (res.code == 200) {
            ruleSet.value = res.data
        }
    } catch {}
}

const getFileTree = async () => {
    try {
        const res = await api.getFileTreeRequest({
            projectId,
            type: 2
        })
        if (res.code === 200) {
            data.value = res.data.data
        }
    } catch { }
}

onMounted(() => {
    getFileTree()
})

</script>



<style scoped lang="scss">
.decision-set-page {
    width: 100%;
    height: 100%;
    display: flex;
    .ds-left {
        width: 75%;
        height: 100%;
        
        .ds-left-header {
            width: 100%;
            padding: 0px 10px 10px;
            border-bottom: 1px solid rgb(217, 217, 217);
        }
    }
    .ds-right {
        width: 25%;
        height: 100%;
        border-left: 1px solid rgb(217, 217, 217);
    }
}
</style>