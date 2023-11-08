<template>
    <div class="setting-page">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="用户审批" name="User">
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>头像</th>
                                <th>用户名</th>
                                <th>申请时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in applyList" :key="item.applyId">
                                <td><img src="../../assets/images/user.jpeg" alt="Avatar 1"></td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.time }}</td>
                                <td>
                                    <!-- 0 同意 1 拒绝 -->
                                    <el-button type="success" round @click="handler(0, item.applyId)">同意</el-button>
                                    <el-button type="danger" round @click="handler(1, item.applyId)">拒绝</el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import api from '../../api';
import { useStore } from 'vuex';

const store = useStore();
const activeName = ref('User');
const applyList = ref([])
const projectId = store.state.project.projectId

const getApplyList = async () => {
    try {
        const res = await api.getUserApplyListRequest({
            projectId: projectId
        })
        if(res.code == 200) {
            applyList.value = res.data
        }
    } catch { }
}

const handler = async (isApply, applyId) => {
    try {
        const res = await api.agreeOrRefuseUserRequest({
            projectId: projectId,
            isApply,
            applyId
        })
    } catch {}
}

onMounted(() => {
    getApplyList()
})

</script>
  
<style scoped lang="scss">
.setting-page {
    width: 100%;
    height: 100%;

    .table-container {
        margin: 20px;
        border: 1px solid #ccc;

        table {
            width: 100%;
            border-collapse: collapse;

            th,
            td {
                padding: 10px;
                text-align: center;
                transition: background-color 0.3s;
            }

            th {
                background-color: #a8b8db;
            }

            img {
                max-width: 50px;
                max-height: 50px;
                border-radius: 50%;
            }

            /* 鼠标悬停时的效果 */
            tr:hover {
                background-color: #f0f0f0;
                cursor: pointer;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                /* 添加阴影效果 */
                transition: background-color 0.3s, box-shadow 0.3s;
                /* 添加过渡效果 */
            }
        }
    }
}
</style>
  
