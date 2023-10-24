<template>
    <div class="operate-header-box">
        <el-button class="ops-h-item" @click="handleAddLibrary"><el-icon style="margin-right: 5px;"><Plus /></el-icon>新增</el-button>
        <el-button class="ops-h-item"><el-icon style="margin-right: 5px;"><Edit /></el-icon>编辑</el-button>
        <el-button class="ops-h-item"><el-icon style="margin-right: 5px;"><Delete /></el-icon>删除</el-button>
    </div>
</template>

<script setup>
const emits = defineEmits(['addLibrary'])


const handleAddLibrary = () => {
    emits('addLibrary')
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