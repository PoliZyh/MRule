<template>
    <div class="decision-set-page">
        <div class="ds-left">
            <div class="ds-left-header">
                <el-button @click="handleAddRule">添加规则</el-button>
                <el-button @click="handleRun">运行规则集</el-button>
            </div>
            <el-table :data="ruleSet" style="width: 100%;">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="ruleName" label="规则名" width="180" />
                <el-table-column prop="rule" label="规则字符串" show-overflow-tooltip></el-table-column>
                <el-table-column label="决策流">
                    <template #="{row}">
                        <el-radio-group v-model="row.execute" class="ml-4">
                            <el-radio label="parallel" size="large">并行</el-radio>
                            <el-radio label="serial" size="large">串行</el-radio>
                        </el-radio-group>
                    </template>
                    
                </el-table-column>
            </el-table>
        </div>
        <div class="ds-right">
            <FileTree :data="data" v-model:active-node="activeNode" @refreshFileTree="getFileTree"></FileTree>
        </div>
        <el-dialog title="添加规则" width="40%" v-model="isShowAddDiaolog">
            <el-form>
                <el-form-item label="规则文件">
                    <el-select v-model="selectedFieId">
                        <el-option v-for="rule in rules"
                        :key="rule.id"
                        :label="rule.fileName"
                        :value="rule.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleConcelAdd">取消添加</el-button>
                    <el-button type="primary" @click="handleConfirmAddRule">
                    确认添加
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog title="快速测试" width="40%" v-model="isShowRunDialog">
            <template v-if="consoleData.length === 0">
                
            </template>
            <template v-else>
                <h4 style="margin-bottom: 10px;">控制台</h4>
                <el-row v-for="line in consoleData" :key="line" style="margin-bottom: 5px;">
                    <p>> {{ line }}</p>
                </el-row>
            </template>
        </el-dialog>
    </div>
</template>


<script setup>
import FileTree from "@/components/FileTree/index.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import api from "@/api";
import { extractObjects } from '@/utils/rule.js'

const store = useStore()
const projectId = store.state.project.projectId
const data = ref([])
const activeNode = ref()
const ruleSet = ref([])
const rules  = ref([])
const isShowAddDiaolog = ref(false)
const selectedFieId = ref()
const isShowRunDialog = ref(false)
const consoleData = ref([])

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

const getRules = async () => {
    try {
        const res = await api.getFileTreeRequest({
            projectId,
            type: 0
        })
        if (res.code == 200) {
            rules.value = extractObjects(res.data.data)
        }
    } catch {}
}

const getRuleId = async () => {
    try {
        const res = await api.getAllRulesRequest({
            fileId: selectedFieId.value,
            fileType: 0
        })
        if (res.code == 200) {
            return res.data[0].id
        }
    } catch {}
}

const handleAddRule = async () => {
    isShowAddDiaolog.value = true
}

const handleConfirmAddRule = async () => {
    const rule = await getRuleId()
    try {
        const res = await api.addRuleToSetRequest({
            ruleId: rule,
            fileId: activeNode.value.id,
        })
        if (res.code == 200) {
            isShowAddDiaolog.value = false
        }
    } catch {}
}
const handleConcelAdd = () => {
    isShowAddDiaolog.value = false
}

const handleRun = async () => {
    try {
        const res = await api.runProjectRequest({
            type: 1,
            id: activeNode.value.id
        })
        if (res.code == 200) {
            consoleData.value = res.data
        }
    } catch {}
    isShowRunDialog.value = true
}

onMounted(() => {
    getFileTree()
    getRules()
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