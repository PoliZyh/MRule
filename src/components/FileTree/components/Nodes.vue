<template>
    <!--  -->
    <template v-if="nodesData.length > 0">
        <div class="tree-row" 
        v-for="item in nodesData" 
        :key="item.name" 
        @click="handleActive(item, _, $event)"
        >
            <div class="tree-detial">
                <el-icon 
                v-if="item.type === 'folder'" 
                class="folder-open"
                :class="{'tree-active': item === props.activeNode}">
                    <component 
                    :is="item.hasOpen ? 'ArrowDown' : 'ArrowRight'"
                    @click="handleOpenFolder(item)"></component>
                </el-icon>
                <el-icon 
                style="margin-left: 5px;"
                :class="{'tree-active': item === props.activeNode}">
                    <component :is="item.type === 'folder' ? 'Folder' : 'Document'"></component>
                </el-icon>
                <span 
                style="margin-left: 7px;"
                :class="{'tree-active': item === props.activeNode}"
                >{{ item.name }}</span>
            </div>
            <template v-if="item.children && item.children.length > 0 && item.hasOpen">
                <Nodes :nodes-data="item.children" @change-active-node="handleActive" :active-node="props.activeNode"></Nodes>
            </template>
        </div>
    </template>
</template>


<script setup>

const props = defineProps(['nodesData', 'activeNode'])
const emits = defineEmits(['changeActiveNode'])



const handleOpenFolder = (item) => {
    if (item.hasOpen === 'undefined') {
        item.hasOpen = true
    }else {
        item.hasOpen = !item.hasOpen
    }
}

const handleActive = (item, isFirst = true, e) => {
    if (e) {
        e.stopPropagation()
    }
    emits('changeActiveNode', item, false)
    if (item.type === 'folder' && isFirst) {
        handleOpenFolder(item)
    }
}





</script>


<script>
export default {
    name: 'Nodes'
}
</script>



<style scoped lang="scss">
.tree-row {
    padding: 7px 10px 0px 15px;
    cursor: pointer;
    .tree-detial {
        display: flex;
        align-items: center;
        .folder-open {
            height: 100%;
        }
        .folder-open:hover {
            background-color: rgba(234, 234, 234, 0.686);
        }
    }
}

.tree-active {
    color: $theme-c-blue;
}
</style>