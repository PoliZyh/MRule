<template>
    <div class="file-tree-box">
        <h4>文件树</h4>
        <template v-if="props.data.length> 0">
            <Nodes :nodes-data="props.data" @change-active-node="handleChangeActiveNode" :active-node="props.activeNode"></Nodes>
        </template>
    </div>
</template>


<script setup>
import Nodes from './components/Nodes.vue';

const props = defineProps(['data', 'activeNode'])

const emits = defineEmits(['update:activeNode'])

const handleChangeActiveNode = (newNode) => {
    emits('update:activeNode', newNode)
}

</script>


<style scoped lang="scss">
.file-tree-box {
    height: 100%;
    width: 100%;
    padding: 10px;
    overflow: scroll;
}
</style>