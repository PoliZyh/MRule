<template>
    <div class="workstand-box">
        <div class="header">
            <div class="header-item">
                <Card>
                    <template v-slot:header>
                        <p class="item-p">
                            <span class="item-num">{{ workstandData.pkgNum }}</span>
                            知识包
                        </p>
                    </template>
                    <template v-slot:content>
                        <WaterBall :pkgNum="workstandData.pkgNum"></WaterBall>
                    </template>
                </Card>
            </div>
            <div class="header-item">
                <Card>
                    <template v-slot:header>
                        <p class="item-p">
                            <span class="item-num">
                                {{ workstandData.lastFourSubmissions ? workstandData.lastFourSubmissions.length : 0}}
                            </span>
                            规则文件
                        </p>
                    </template>
                    <template v-slot:content>
                        <SubmitList :info="workstandData.lastFourSubmissions"></SubmitList>
                    </template>
                </Card>
            </div>
            <div class="header-item">
                <Card>
                    <template v-slot:header>
                        <p class="item-p">
                            <span class="item-num">4</span>
                            批处理
                        </p>
                    </template>
                    <template v-slot:content>
                        <PictorialBar ></PictorialBar>
                    </template>
                </Card>
            </div>
        </div>
        <div class="bodyer">
            <div class="left">
                <Card>
                    <template v-slot:header>
                        <div class="left-header-box">
                            <div class="icon-box">
                                <el-icon size="25px" color="white"><TrophyBase /></el-icon>
                            </div>
                            <p>团队提交量</p>
                        </div>
                    </template>
                    <template v-slot:content>
                        <TeamSubmitList :info="workstandData.teamSubmissionVolume"></TeamSubmitList>
                    </template>
                </Card>
            </div>
            <div class="right">
                <Card>
                    <template v-slot:header>
                        <div class="left-header-box">
                            <div class="icon-box">
                                <el-icon size="25px" color="white"><Star /></el-icon>
                            </div>
                            <p>规则热度图</p>
                        </div>
                    </template>
                    <template v-slot:content>
                        <HeatMap></HeatMap>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
import Card from '@/components/Card/index.vue'
import WaterBall from './components/WaterBall.vue';
import SubmitList from './components/SubmitList.vue';
import PictorialBar from './components/PictorialBar.vue';
import TeamSubmitList from './components/TeamSubmitList.vue';
import HeatMap from './components/HeatMap.vue';
import { onMounted, ref } from 'vue';
import api from '../../api';
import { useStore } from 'vuex';

const workstandData = ref({})
const store = useStore()
const projectId = store.state.project.projectId

const getWorkstandData = async () => {
    try {
        const res = await api.getWorkplaceDataRequest({
            projectId: projectId
        })
        if (res.data.code === 200) {
            workstandData.value = res.data.data
        }
    } catch {}
}

onMounted(() => {
    getWorkstandData()
})

</script>

<style scoped lang="scss">
.workstand-box {
    width: 100%;
    height: 100%;
    .header {
        width: 100%;
        height: 250px;
        display: flex;
        gap: 10px;
        .header-item {
            flex: 1;
            .item-p {
                width: 100%;
                color: grey;
                font-size: 0.9rem;
                .item-num {
                    font-size: 1.6rem;
                    color: black;
                }
            }
           
        }
    }
    .bodyer {
        widows: 100%;
        height: 410px;
        display: flex;
        gap: 10px;
        margin-top: 20px;
        .left {
            flex: 2;
            height: 100%;
            .left-header-box {
                display: flex;
                align-items: center;
                gap: 20px;
                .icon-box {
                    padding: 10px;
                    background-color: rgb(65, 170, 255);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 7px;
                }
                p {
                    font-size: 1.2rem;
                }

            }
            
            
        }
        .right {
            flex: 1;
            height: 100%;
            .left-header-box {
                display: flex;
                align-items: center;
                gap: 20px;
                .icon-box {
                    padding: 10px;
                    background-color: orange;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 7px;
                }
                p {
                    font-size: 1.2rem;
                }

            }
        }
    }
}
</style>
