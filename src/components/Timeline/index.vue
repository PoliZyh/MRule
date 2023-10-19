<template>
    <div class="timeline-box">
        

        <el-collapse>
            <el-collapse-item v-for="item in props.data" :key="item.date" :name="item.date">
                <template #title>
                    <h4 class="date">{{ item.date }}</h4>
                </template>
                <el-timeline>
                    <el-timeline-item :timestamp="det.time" placement="top" v-for="det in item.more" :key="det.time">
                        <el-card>
                            <h4>{{ det.detail }}</h4>
                            <p>{{ det.user }} committed {{ item.date }} {{ det.time }}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>



<script setup>


const props = defineProps({
    data: {
        default: () => []
    }
})

</script>


<style scoped lang="scss">
.timeline-box {
    .date {
        background-color: rgba(228, 228, 228, 0.641);
        padding: 0px 10px;
        width: fit-content;
        border-radius: 4px;
    }
}
</style>


<style lang="scss">
.timeline-box {
    .el-collapse-item__header {
        height: 60px;
        padding-left: 10px;
        padding: 10px;
        background-color: #f7f8fa;
        border: none;
    }
    .el-collapse-item__content {
        padding: 20px;
    }
}

</style>