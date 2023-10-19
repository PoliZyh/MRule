<template>
    <div class="rule-status-page">
        <el-card>
            <h4>规则状态 <span style="color: grey;font-size: 0.7rem;">双击编辑规则</span></h4>
        </el-card>
        <el-card style="margin-top: 20px;height: 610px;">
            <el-table :data="tableData" style="width: 100%;height: 500px;">
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column prop="user" label="用户" width="130" />
                <el-table-column prop="ruleSet" label="所属规则集" width="230" show-overflow-tooltip />
                <el-table-column prop="ruleName" label="规则名" width="180" />
                <el-table-column prop="createTime" label="创建时间" width="145" />
                <el-table-column prop="updateTime" label="更新时间" width="145" />
                <el-table-column label="操作" width="180">
                    <template #="{ row }">
                        <el-button size="small">启用</el-button>
                        <el-button size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="rs-footer">
                <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                :small="true"
                layout=" prev, pager, next, jumper, ->, total, sizes"
                :total="400"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                />
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const pageNo = ref(1)
const pageSize = ref(10)

const tableData = ref([
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        user: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
])
</script>

<style scoped lang="scss">
.rule-status-page {
    width: 100%;
    height: 100%;
    .rs-footer {
        height: 110px;
        padding: 20px;
    }
}
</style>
