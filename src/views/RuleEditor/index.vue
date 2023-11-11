<template>
    <div class="rule-editor-page">
        <div class="re-left">
            <div class="re-left-header">
                <el-button icon="Check">保存</el-button>
                <el-button icon="CirclePlus">添加规则</el-button>
                <el-button icon="CirclePlus">添加循环规则</el-button>
                <el-button icon="ScaleToOriginal">快速测试</el-button>
            </div>
            <div class="re-left-bodyer">
                <RuleIf :rules="editor"></RuleIf>
            </div>
        </div>
        <div class="re-right">
            <FileTrees :data="data" v-model:active-node="activeNode" @refreshFileTree="getFileTree"></FileTrees>
        </div>
    </div>
</template>

<script setup>
import FileTrees from "@/components/FileTree/index.vue";
import { onMounted, ref } from "vue";
import api from "../../api";
import { useStore } from "vuex";
import RuleIf from "./components/RuleIf.vue";
import RuleWhile from "./components/RuleWhile.vue";


const data = ref([]);
const activeNode = ref({});
const store = useStore()
const projectId = store.state.project.projectId;
const editor = ref(
    [
        {
            type: "if",
            conditions: [
                {
                    left: {
                        libId: 1,
                        varName: "a"
                    },
                    operator: ">",
                    right: {
                        libId: 2,
                        varName: "b"
                    }
                }
            ],
            body: [

            ]
        },
        {
            type: "else if",
            conditions: [],
            body: []
        },
        {
            type: "else",
            body: []
        }
    ]
)

const getEditorRuleContent = async () => {
    try {
        const res = api.getAllRulesRequest({
            fileId: activeNode.value.id,
            fileType: 0,
        })
        if (res.code === 200) {
            // editor.value = res.data[0].rule
        }
    } catch {}
}

const getFileTree = async () => {
    try {
        const res = await api.getFileTreeRequest({
            projectId,
            type: 0
        })
        if (res.code === 200) {
            data.value = res.data.data
        }
    } catch { }
}

onMounted(() => {
    getFileTree()
})
</script>

<style scoped lang="scss">
.rule-editor-page {
    width: 100%;
    height: 100%;
    display: flex;
    .re-left {
        width: 75%;
        padding-right: 20px;
        .re-left-header {
            border-bottom: 1px solid rgb(198, 198, 198);
            padding-bottom: 10px;
        }
        .re-left-bodyer {
            padding: 10px;
        }
    }
    .re-right {
        width: 25%;
        border-left: 1px solid rgb(217, 217, 217);
    }
}
</style>
