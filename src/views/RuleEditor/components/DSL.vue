<template>
    <div class="dsl-box">
        <el-drawer title="DSL可视化编辑器" direction="ltr" v-model="isShow">
            <el-button @click="handleOp">优化参数</el-button>
            <json-editor-vue style="height: 90%;margin-top: 10px;" v-model="internalValue" />
        </el-drawer>
    </div>
</template>


<script setup>
import { onMounted, ref, watch } from 'vue';
import JsonEditorVue from 'json-editor-vue3'
const isShow = ref(false)

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
})
watch(() => props.data,
    () => {
        internalValue.value = props.data
    })
const internalValue = ref([])

watch(() => internalValue.value,
    () => {

        emits('update:data', internalValue.value)
    })

const emits = defineEmits(['update:data'])

const handleShow = (state) => {
    isShow.value = state;
}

const handleOp = () => {
    internalValue.value = [
        {
            type: "if",
            conditions: [
                {
                    left: {
                        varName: 'time',
                        libId: 1
                    },
                    operator: ">=",
                    right: {
                        varName: '今日 21:58',
                        libId: 1
                    }
                },
                {
                    left: {},
                    operator: "&&",
                    right: {}
                },
                {
                    left: {
                        varName: 'time',
                        libId: 1
                    },
                    operator: "<",
                    right: {
                        varName: '次日 05:02',
                        libId: 1
                    }
                }
            ],
            body: [
                {
                    type: 'print',
                    received: {
                        libId: 1,
                        varName: '"可疑账户"'
                    },
                    calculate: {
                        left: {},
                        operator: "",
                        right: {}
                    }
                }
            ]
        }
    ]
}

defineExpose({
    handleShow
})

</script>


<style scoped lang="scss">
.dsl-box {}
</style>