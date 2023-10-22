<template>
    <div class="file-tree-box" ref="nodesRef" @click="handleClickFileTree">
        <h4>文件树</h4>
        <template v-if="props.data.length> 0">
            <Nodes  :nodes-data="props.data" @change-active-node="handleChangeActiveNode" :active-node="props.activeNode"></Nodes>
        </template>

        <TreeContextMenu v-model:isShow="isShowContextMenu" :pos="pos" :active-node="props.activeNode"></TreeContextMenu>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import Nodes from './components/Nodes.vue';
import TreeContextMenu from './components/TreeContextMenu.vue';

const props = defineProps(['data', 'activeNode'])
const emits = defineEmits(['update:activeNode'])
const isShowContextMenu = ref(false)
const nodesRef = ref()
const pos = ref({
    left: 0,
    top: 0
})

const handleChangeActiveNode = (newNode) => {
    isShowContextMenu.value = false
    emits('update:activeNode', newNode)
}

const handleClickFileTree = () => {
    isShowContextMenu.value = false
    emits('update:activeNode', '')
}

onMounted(() => {
  
    nodesRef.value.oncontextmenu = (event) => {
        event.preventDefault()
        isShowContextMenu.value = true
        pos.value.left = event.clientX - nodesRef.value.offsetLeft
        pos.value.top = event.clientY - nodesRef.value.offsetTop
    }
})

</script>


<style scoped lang="scss">
.file-tree-box {
    height: 100%;
    width: 100%;
    padding: 10px;
    overflow: scroll;
    position: relative;
}
</style>