<template>
    <div class="operate-header-box">
        <el-button class="ops-h-item" @click="handleAddLibrary" icon="Plus">
            新增
        </el-button>
        <el-button class="ops-h-item" icon="Edit" @click="handleUpdateLibrar">
            编辑
        </el-button>
        <el-button class="ops-h-item" icon="Delete" @click="handleDeleteRow">
            删除
        </el-button>
    </div>
</template>

<script setup>
import api from '../../../api';
const emits = defineEmits(['addLibrary', 'refresh', 'updateLibrary'])
const props = defineProps({
    currentRow: {
        default: () => ({}),
        type: Object
    }
})

const handleAddLibrary = () => {
    emits('addLibrary')
}
const handleUpdateLibrar = () => {
    emits('updateLibrary')
}
const handleDeleteRow = async () => {
    if (!props.currentRow.id) {
        ElMessage.error('请选择要删除的变量')
        return
    }
    const res = await api.deleteVariableRequest({
        variableId: props.currentRow.id
    })
    if (res.code === 200) {
        emits('refresh')
    }
}

</script>


<style scoped lang="scss">
.operate-header-box {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid $border-c-week-grey;
    padding-bottom: 10px;
    position: relative;

}
</style>