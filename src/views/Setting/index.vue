<template>
    <div class="setting-page">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="用户审批" name="User">
                
            </el-tab-pane>
   
        </el-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const activeName = ref('User')
</script>

<style scoped lang="scss">
.setting-page {
    width: 100%;
    height: 100%;
}
</style>
