<template>
    <div class="tree-context-menu-box" v-show="isShow" :style="style">
        <div class="ctx-item" @click="handleCreateFolder($event, '文件夹')" v-show="activeNode.isFolder || activeNode === ''">新建文件夹</div>
        <div class="ctx-item" @click="handleCreateFile($event, '文件')" v-show="activeNode.isFolder || activeNode === ''">新建文件</div>
        <div class="ctx-item" @click="handleDelete()" v-show="activeNode">删除</div>
    </div>
    <el-dialog v-model="isShowDialog" :title="'创建' + dialogTitle">
        <el-form>
            <el-form-item :label="'请输入' + dialogTitle + '名'">
                <el-input v-model="inputName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import api from '../../../api';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const props = defineProps({
    isShow: {
        default: false,
        type: Boolean
    },
    pos: {
        default: () => {},
    },
    activeNode: {
        default: () => ({ 
        })
    }
})
const emits = defineEmits(['update:isShow', 'refreshTree'])
const dialogTitle = ref('')
const isShowDialog = ref(false)
const inputName = ref('')
const isFolder = ref(0)
const store = useStore()
const projectId = store.state.project.projectId
const route = useRoute()

const style = computed(() => {
    return {
        left: props.pos.left + 'px',
        top: props.pos.top + 'px'
    }
})

const handleCreateFolder = (e, title) => {
    e.stopPropagation()
    dialogTitle.value = title
    isShowDialog.value = true
    isFolder.value = 1
}

const handleCreateFile = (e, title) => {
    e.stopPropagation()
    dialogTitle.value = title
    isShowDialog.value = true
    isFolder.value = 0
}

const handleDelete = async () => {
    if (!props.activeNode.id) {
        return
    }
    try {
        const res = await api.deleteVariableLibraryRequest({
            fileId: props.activeNode.id
        })
        if (res.code === 200) {
            emits('refreshTree')
        }
    } catch {} 
    
}

const handleCancel = () => {
    isShowDialog.value = false
}

const handleConfirm = async () => {
    
    const fileTypeMap = {
        '/rule/rule-editor': 0,
        '/rule/library': 1,
        '/rule/decision-set': 2
    }
    console.log(props)
    try {
        const res = await api.createFileRequest({
            fileName: inputName.value,
            fileTypeMap: fileTypeMap[route.fullPath],
            isFolder: isFolder.value,
            parentId: props.activeNode.id,
            projectId
        })
        if (res.code === 200) {
            emits('refreshTree')
        }
    } catch {}
    isShowDialog.value = false
}

</script>


<style scoped lang="scss">
.tree-context-menu-box {
    position: absolute;
    background-color: white;
    box-shadow: 0 0 5px 0px rgb(220, 220, 220);

    .ctx-item {
        width: 100%;
        padding: 7px 10px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        font-size: 0.8rem;
    }
    .ctx-item:hover {
        opacity: 0.5;
    }
}
</style>


<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>