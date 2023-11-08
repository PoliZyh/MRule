<template>
    <div class="rule-status-page">
        <el-card>
            <h4>规则状态 <span style="color: grey;font-size: 0.7rem;">双击编辑规则</span></h4>
        </el-card>
        <el-card style="margin-top: 20px;height: 610px;">
            <el-table :data="tableData" style="width: 100%;height: 500px;">
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column prop="username" label="用户" width="130" />
                <el-table-column prop="ruleSet" label="所属规则集" width="230" show-overflow-tooltip />
                <el-table-column prop="ruleName" label="规则名" width="180" />
                <el-table-column prop="createTime" label="创建时间" width="145" />
                <el-table-column prop="updateTime" label="更新时间" width="145" />
                <el-table-column label="操作" width="220" fixed="right">
                    <template #="{ row }">
                        <el-button 
                        size="small"
                        @click="changeRuleStatus(row.ruleId, row.status === 0 ? 1 : 0)">{{ row.status === 0 ? '已禁用' : '启用中' }}</el-button>
                        <el-button size="small" @click="handleViewHistory(row.ruleId)">历史</el-button>
                        <el-button size="small" @click="handleDeleteRule(row.ruleId)">删除</el-button>
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
        <el-dialog v-model="dialogTableVisible" title="状态历史记录">
            <el-table :data="historyTableData">
                <el-table-column prop="username" label="用户名" width="205" />
                <el-table-column prop="time" label="修改时间" width="245" />
                <el-table-column prop="event" label="修改事件" width="245" />
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../../api';
import { useStore } from 'vuex';
import { addRuleHistory } from '@/utils/rule'
import { getCurTime } from '@/utils/time'

const pageNo = ref(1)
const pageSize = ref(10)
const store = useStore()
const projectId = store.state.project.projectId
const dialogTableVisible = ref(false)

const tableData = ref([
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
    {
        username: 'Ethan',
        ruleSet: '反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈、反诈',
        ruleName: '我的第一个规则',
        createTime: '2023-07-23',
        updateTime: '2023-09-23'
    },
])
const historyTableData = ref([])

const getTableData = async () => {
    try {
        const res = await api.getRuleStatusListRequest({
            projectId: projectId
        })
        if (res.code === 200) {
            tableData.value = res.data
            tableData.value.ruleSet.join("、")
        } else {
            Elmessage.error('获取状态失败')
        }
    } catch {}
}

const changeRuleStatus = async (ruleId, status) => {
    try {
        const res = await api.changeRuleStatusRequest({
            projectId: projectId,
            ruleId,
            status
        })
        if (res.code === 200) {
            await getTableData()
            const userInfo = await api.getUserInfoRequest()
            addRuleHistory(projectId, ruleId, userInfo.data.userAccount, getCurTime(), status ===0 ? '禁用了状态' : '启用状态')
        }
    } catch {}
}

const handleViewHistory = async (ruleId) => {
    try {
        const res = await api.getAllRuleHistoryRequest({
            projectId: projectId,
            ruleId
        })
        if (res.code === 200) {
            historyTableData.value = res.data
        }
    } catch {}
    dialogTableVisible.value = true
}

const handleDeleteRule = async (ruleId) => {
    try {
        const res = await api.deleteRuleRequest({
            projectId: projectId,
            ruleId
        })
        if (res.code === 200) {
            getTableData()
        }
    } catch {}
}

onMounted(() => {
    getTableData()
})

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
