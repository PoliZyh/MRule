<template>
    <div class="library-page">
        <div class="lp-left">
            <template v-if="activeNode && !activeNode.isFolder">
                <div class="ops-header">
                    <OperateHeader @updateLibrary="handleUpdateCurRow" @refresh="getVariables(parseInt(activeNode.id))"
                        :current-row="currentRow" @add-library="handleAddLibrary"></OperateHeader>
                </div>
                <div class="lp-table">
                    <el-table :data="tableData" highlight-current-row @current-change="handleCurrentChange">
                        <el-table-column prop="id" label="ID" width="60"></el-table-column>
                        <el-table-column prop="variableName" label="名称" width="143"></el-table-column>
                        <el-table-column prop="description" label="描述" width="260" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="variableType" label="数据类型" width="150"></el-table-column>
                        <el-table-column prop="value" label="默认值" width="190" show-overflow-tooltip></el-table-column>
                    </el-table>
                </div>
            </template>
            <template v-else>
                <el-empty description="请选中文件哦" />
            </template>
        </div>
        <div class="lp-right">
            <FileTress :data="data" v-model:active-node="activeNode" @refreshFileTree="getFileTree"></FileTress>
        </div>
        <el-dialog v-model="isShowDialog" title="新增" width="40%">
            <el-form label-width="70px" label-position="right">

                <el-form-item label="名称">
                    <el-input placeholder="请输入名称" v-model="dialogParams.variableName" style="width: 50%;"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="dialogParams.description" :autosize="{ minRows: 3 }" type="textarea"
                        placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item label="数据类型">
                    <el-select v-model="dialogParams.variableType" placeholder="请选择数据类型">
                        <el-option v-for="item in dataTypeSelection" :key="item.value" :label="item.type"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="默认值">
                    <el-input placeholder="请输入默认值" v-model="dialogParams.value" style="width: 50%;"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="hadnleCloseDialog">取消</el-button>
                    <el-button type="primary" @click="handleConfirmDialog">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>


<script setup>
import FileTress from '@/components/FileTree/index.vue'
import OperateHeader from './components/OperateHeader.vue';
import { nextTick, onMounted, ref, watch } from 'vue';
import api from '../../api';
import { useStore } from 'vuex';

const store = useStore()
const projectId = store.state.project.projectId

const activeNode = ref()

const dataTypeSelection = ref([
    {
        type: 'String',
        value: 0
    },
    {
        type: 'Integer',
        value: 1
    },
    {
        type: 'Char',
        value: 2
    },
    {
        type: 'Double',
        value: 3
    },
    {
        type: 'Boolean',
        value: 4
    },
    {
        type: 'Float',
        value: 5
    },
    {
        type: 'Map',
        value: 6
    }
])
const isShowDialog = ref(false)
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
const currentRow = ref()
const tableData = ref([])
const dialogParams = ref({
    description: '',
    value: '',
    variableName: '',
    variableType: ''
})

watch(
    () => activeNode.value,
    () => {
        if (activeNode.value && !activeNode.value.isFolder) {
            getVariables(parseInt(activeNode.value.id))
        }
    }
)

const handleCurrentChange = (row) => {
    currentRow.value = row
}

const handleAddLibrary = async () => {
    dialogParams.value = {
        description: '',
        value: '',
        variableName: '',
        variableType: ''
    }
    await nextTick()
    isShowDialog.value = true
}
const hadnleCloseDialog = () => {
    clearParams()
    isShowDialog.value = false
}
const handleConfirmDialog = async () => {
    if (dialogParams.value.id) {
        try {
            const res = await api.updateVariableRequest({
                ...dialogParams.value
            })
            if (res.code === 200) {
                getVariables(parseInt(activeNode.value.id))
            }
        } catch { }
    } else {
        const res = await api.addVariableRequest({
            fileId: activeNode.value.id,
            ...dialogParams.value
        })
        if (res.code == 200) {
            getVariables(parseInt(activeNode.value.id))
        }
    }
    clearParams()
    isShowDialog.value = false
}

const getFileTree = async () => {
    try {
        const res = await api.getFileTreeRequest({
            projectId,
            type: 1
        })
        if (res.code === 200) {
            data.value = res.data.data
        }
    } catch { }
}

const getVariables = async (fileId) => {
    try {
        const res = await api.getAllVariableRequest({
            fileId,
            fileType: 'variable'
        })
        if (res.code === 200) {
            tableData.value = res.data
            clearParams()
        }
    } catch { }
}

const clearParams = () => {
    dialogParams.value = {
        description: '', 
        value: '',
        variableName: '',
        variableType: '',
        id: ''
    }
}

const handleUpdateCurRow = () => {
    dialogParams.value = {
        ...currentRow.value
    }

    isShowDialog.value = true
}

onMounted(() => {
    getFileTree()
})
</script>



<style scoped lang="scss">
.library-page {
    width: 100%;
    height: 100%;
    display: flex;

    .lp-left {
        width: 75%;

        .ops-header {
            width: 98%;
        }

        .lp-table {
            width: 98%;
            margin-top: 10px;
            padding: 10px;
            background-color: white;
            box-shadow: 0 0 10px 0px rgb(222, 222, 222);
        }
    }

    .lp-right {
        width: 25%;
        border-left: 1px solid rgb(217, 217, 217);
    }
}
</style>