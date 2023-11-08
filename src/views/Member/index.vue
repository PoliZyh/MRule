<template>
    <div class="member-box">
        <div class="m-ops">
            <el-card class="m-card">
                <div class="m-con">
                    <h4>成员：{{ tableData.length }}</h4>
                    <div class="m-row">
                        <el-input style="width: 60%;"></el-input>
                        <div class="m-btn">
                            <el-button type="primary">搜索</el-button>
                            <el-button>重置</el-button>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card style="margin-top: 20px;">
                <div class="mm-card">
                    <div class="m-list">
                        <div class="mt-titles mt">
                            <div class="mt-c" :style="{'--f': 1}">ID</div>
                            <div class="mt-c" :style="{'--f': 3}">用户</div>
                            <div class="mt-c" :style="{'--f': 3}">岗位</div>
                            <div class="mt-c" :style="{'--f': 3}">加入日期</div>
                            <div class="mt-c" :style="{'--f': 2}">操作</div>
                        </div>
                        <div class="mt-body mt">
                            <div class="mt-b-r" v-for="i in tableData">
                                <div class="mt-c" :style="{'--f': 1}">{{i.userId}}</div>
                                <div class="mt-c" :style="{'--f': 3}">
                                    <img src="../../assets/images/user.jpeg" alt="">
                                    <span>{{ i.username }}</span>
                                </div>
                                <div class="mt-c" :style="{'--f': 3}">{{ i.position }}</div>
                                <div class="mt-c" :style="{'--f': 3}">{{ i.joinTime }}</div>
                                <div class="mt-c" :style="{'--f': 2}">
                                    <el-button size="small" type="danger" @click="handleDeleteUser(i.userId)">删除</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-footer">

                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import api from '../../api';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const tableData = ref([])
const store = useStore()
const projectId = store.state.project.projectId

const getTableData = async () => {
    try {
        const res = await api.getProjectMemberListRequest({
            projectId: projectId
        })
        tableData.value = res.data
    } catch {
    }
}

const handleDeleteUser = async (userId) => {
    try {
        const res = await api.deleteProjectMemberRequest({
            projectId: projectId,
            userId: userId
        })
        if (res.code === 200) {
            await getTableData()
        }
    } catch {}
}

onMounted(() => {
    getTableData()
})

</script>

<style scoped lang="scss">
.member-box {
    height: 100%;
    width: 100%;

    .m-ops {
        width: 100%;

        .m-card {
            width: 100%;

            .m-con {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .m-row {
                    width: 40%;
                    display: flex;
                    align-items: center;

                    .m-btn {
                        margin-left: 15px;
                    }
                }
            }

        }

        .mm-card {
            display: flex;
            flex-direction: column;
            height: 560px;

            .m-list {
                height: 93%;
                width: 100%;

                .mt {
                    width: 100%;

                    .mt-c {
                        --f: 1;
                        flex: var(--f);
                        text-align: center;
                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }
                }

                .mt-titles {
                    width: 100%;
                    display: flex;
                    background-color: rgba(238, 238, 238, 0.432);
                    border-radius: 7px;
                    flex-direction: row;
                    padding: 10px 15px;
                    margin-bottom: 13px;
                    .mt-c {
                        font-weight: 700;
                        font-size: 0.9rem;
                    }
                }
                .mt-body {
                    display: flex;
                    gap: 15px;
                    padding: 10px 15px;
                    flex-direction: column;
                    .mt-b-r {
                        display: flex;
                        padding: 7px 4px;
                        border: 1px solid rgb(233, 233, 233);
                        background-color: white;
                        border-radius: 10px;
                        box-shadow: 0 0 10px 3px rgb(243, 243, 243);
                        // transform: perspective(0px) translateZ(0px);
                        transition: all 0.4s linear;
                        .mt-c {
                            font-size: 0.8rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 5px;
                            
                        }
                    }
                    .mt-b-r:hover {
                        background-color: rgb(29, 108, 255);
                        color: white;
                        box-shadow: 0 0 10px 3px rgb(186, 186, 186);
                        transform: perspective(700px) translateZ(20px);
                    }
                }
            }
        }

        .m-footer {
            height: 7%;
        }
    }

}</style>
