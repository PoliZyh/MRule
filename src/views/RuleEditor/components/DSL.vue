<template>
    <div class="dsl-box">
        <el-drawer 
        title="DSL可视化编辑器"
        direction="ltr"
        v-model="isShow">
            <json-editor-vue style="height: 100%;" v-model="internalValue" />
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

watch(internalValue.value,
() => {
    emits('update:data', internalValue.value)
})

const emits = defineEmits(['update:data'])

const handleShow = (state) => {
    isShow.value = state;
}


defineExpose({
    handleShow
})

</script>


<style scoped lang="scss">
.dsl-box {

}
</style>