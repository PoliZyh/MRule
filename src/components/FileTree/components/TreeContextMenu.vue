<template>
    <div class="tree-context-menu-box" v-show="isShow" :style="style">
        <div class="ctx-item" @click="handleCreateFolder('文件夹')" v-show="activeNode.type === 'folder' || !activeNode">新建文件夹</div>
        <div class="ctx-item" @click="handleCreateFile('文件')" v-show="activeNode.type === 'folder' || !activeNode">新建文件</div>
        <div class="ctx-item" @click="handleDelete()" >删除</div>
    </div>
    <el-dialog v-model="isShowDialog" :title="'创建' + dialogTitle">
        <el-form>
            <el-form-item :label="'请输入' + dialogTitle + '名'">
                <el-input v-model="inputName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import api from '../../../api';

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

const style = computed(() => {
    return {
        left: props.pos.left + 'px',
        top: props.pos.top + 'px'
    }
})

const handleCreateFolder = (title) => {
    dialogTitle.value = title
    isShowDialog.value = true
}

const handleCreateFile = (title) => {
    dialogTitle.value = title
    isShowDialog.value = true
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