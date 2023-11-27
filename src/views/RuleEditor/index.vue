<template>
    <div class="rule-editor-page">
        <div class="re-left">
            <div class="re-left-header">
                <el-button icon="Check" @click="handleSave">保存</el-button>
                <el-button icon="CirclePlus" @click="handleAddIf">添加条件规则</el-button>
                <el-button icon="CirclePlus" @click="handleAddWhile">添加循环规则</el-button>
                <el-button icon="ScaleToOriginal" @click="handleShowRun">快速测试</el-button>
                <el-button icon="Plus" @click="handleAddTemplate">反诈事模版导入</el-button>
                <el-button icon="Operation" @click="handleDSL">DSL编辑器</el-button>
            </div>
            <div class="re-left-bodyer">
                <template v-if="editor.length === 0">
                    <el-empty description="规则为空" />
                </template>
                <template v-else-if="editor.length > 0 && editor[0].type === 'if'">
                    <RuleIf :rules="editor" @update-rule="handleUpdateRule"></RuleIf>
                </template>
                <template v-else-if="editor.length > 0 && editor[0].type === 'while'">
                    <RuleWhile :rules="editor"></RuleWhile>
                </template>
            </div>
        </div>
        <div class="re-right">
            <FileTrees :data="data" v-model:active-node="activeNode" @refreshFileTree="getFileTree"></FileTrees>
        </div>
        <el-dialog title="保存规则名为" width="30%" v-model="isShowDialog">
            <el-form>
                <el-form-item label="规则名">
                    <el-input v-model="ruleName" ></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isShowDialog = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirmSave">
                    确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog title="快速测试" width="40%" v-model="isShowRunDialog">
            <template v-if="consoleData.length === 0">
                
            </template>
            <template v-else>
                <h4 style="margin-bottom: 10px;">控制台</h4> 
                <el-row v-for="line in consoleData" :key="line" style="margin-bottom: 5px;">
                    <p>> {{ line }}</p>
                </el-row>
                <h4 style="margin-top: 10px;">决策报告<el-button link type="primary" style="margin-left: 10px;">下载报告</el-button></h4>
                <el-row style="margin-bottom: 5px;">
                    > { 
                </el-row> 
                <el-row style="margin-bottom: 5px;">
                    >     "ruleId": 7,
                </el-row> 
                <el-row style="margin-bottom: 5px;">
                    >     "evaluation_value": 0.2,
                </el-row> 
                <el-row style="margin-bottom: 5px;">
                    >     "log": "数据不通过规则校验 定性为可疑账户"
                </el-row>
                <el-row style="margin-bottom: 5px;">
                    > }
                </el-row>
            </template>
        </el-dialog>
        <el-dialog :title="'反诈事模版导入 更新于' + updateTime" widht="40%" v-model="isShowTemplate">
            <el-form>
                <el-form-item 
                v-for="item in showTemplate" 
                :label="item.label"
                :key="item.label">
                    <el-button @click="handleConfifmAddTemplate(0)" size="small">添加此模版</el-button>
                    <el-tag size="small" style="margin-left: 10px;" :type="item.robot ? 'success' : ''">{{ item.robot ? 'AI' : '人工' }}</el-tag>
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="item.from.join(' ')"
                        placement="top"
                    >
                        <el-button size="small" link type="primary" style="margin-left: 10px;">数据来源</el-button>
                    </el-tooltip>
                </el-form-item>
            </el-form>
        </el-dialog>
        <DSL ref="DSLRef" v-model:data="editor"></DSL>
        <el-dialog title="该模版参数已调整" v-model="tIsShow">
            <p>该模版参数 $varName: 22:00$ 于[11.26 08:23] 调整为 $varName: 21:00$ </p>
        </el-dialog>
    </div>
</template>

<script setup>
import FileTrees from "@/components/FileTree/index.vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import api from "../../api";
import { useStore } from "vuex";
import RuleIf from "./components/RuleIf.vue";
import RuleWhile from "./components/RuleWhile.vue";
import { parseStringToStructure, mapStructureToString } from '@/utils/rule.js'
import { ifItem, elseItem, whileItem } from "./components/init";
import { deepCopy } from "../../utils/deepCopy";
import templates from './components/template'
import DSL from "./components/DSL.vue";
import { getCurTime } from '@/utils/time.js'

const tIsShow = ref(false)
const data = ref([]);
const activeNode = ref({});
const store = useStore()
const projectId = store.state.project.projectId;
const editor = ref([])
const ruleName = ref('')
const isShowDialog = ref(false)
const isShowRunDialog = ref(false)
const ruleId = ref(0)
const consoleData = ref([])
const isShowTemplate = ref(false)
const DSLRef = ref()
const allTemplate = ref([
    {
        label: '凌晨转账或取款',
        robot: true,
        from: ['凌晨转账遭遇诈骗', '凌晨转账涉疑', '凌晨取款等'],
        index: 0,
    },
    {
        label: '与职业不符合的交易',
        robot: true,
        from: ['1', '2', '3'],
        index: 1,
    },
    {
        label: '与年龄不符合的交易',
        robot: true,
        from: ['1', '2', '3'],
        index: 2
    },
    {
        label: '快进快出，账上无余款',
        robot: false,
        from: ['1', '2', '3'],
        index: 3
    },
    {
        label: '涉案账户，警银联动',
        robot: false,
        from: ['1', '2', '3'],
        index: 4
    },
    {
        label: '进出的交易涉及到各大省市',
        robot: true,
        from: ['1', '2', '3'],
        index: 5
    },
    {
        label: '线上游戏、赌博等的返点返钱，不正当交易',
        robot: false,
        from: ['1', '2'],
        index: 6
    },
    {
        label: '上游账户不正常',
        robot: true,
        from: ['1', '2', '3'],
        index: 7
    },
    {
        label: '交易的对象涉及人数很多',
        robot: true,
        from: ['1', '2', '3'],
        index: 8
    },
    {
        label: '用途是退款',
        robot: true,
        from: ['1', '2', '3'],
        index: 9
    },
    {
        label: '长期不使用的账户突然有极小/极大的资金转入',
        robot: true,
        from: ['1', '2', '3'],
        index: 10,
    },
    {
        label: '交易金额很大',
        robot: true,
        from: ['1', '2', '3'],
        index: 11,
    },
    {
        label: '交易金额很小',
        robot: true,
        from: ['1', '2', '3'],
        index: 12,
    },
    {
        label: '交易金额很大，但交易对象是个人',
        robot: true,
        from: ['1', '2', '3'],
        index: 13,
    },
    {
        label: '交易金额很小，但交易对象是企业',
        robot: true,
        from: ['1', '2', '3'],
        index: 14,
    },
    {
        label: '交易金额很大，交易对象是企业',
        robot: true,
        from: ['1', '2', '3'],
        index: 15
    }
])
const showTemplate = ref([])
const updateTime = ref('')
let timer = null

const getRandomElements = (array, n) => {
    updateTime.value = getCurTime()
    const shuffledArray = array.slice(); // 复制数组以避免修改原数组
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, n);
}

const scheduleRandomExtraction = () => {
    showTemplate.value = getRandomElements(allTemplate.value, 7);
    showTemplate.value.splice(1, 0, allTemplate.value[0])
    timer = setInterval(() => {
    showTemplate.value = []
    showTemplate.value = getRandomElements(allTemplate.value, 7);
    showTemplate.value.splice(1, 0, allTemplate.value[0])
  }, 10000); // 10秒间隔
}

onMounted(() => {
    scheduleRandomExtraction()
})

onUnmounted(() => {
    clearInterval(timer)
})

const getEditorRuleContent = async () => {
    try {
        const res = await api.getAllRulesRequest({
            fileId: activeNode.value.id,
            fileType: 0,
        })
        if (res.code === 200) {
            editor.value = parseStringToStructure(res.data[0].rule)
            ruleId.value = res.data[0].id
            ruleName.value = res.data[0].ruleName
        }
    } catch {}
}

const handleAddIf = () => {
    editor.value = [deepCopy(ifItem), deepCopy(elseItem)]
}

const handleDSL = () => {
    DSLRef.value.handleShow(true)
}

watch(() => activeNode.value,
() => {
    if (activeNode.value && !activeNode.value.isFolder) {
        getEditorRuleContent()
    }
})

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

const handleSave = () => {
    isShowDialog.value = true
}

const handleUpdateRule = (newRule) => {
    editor.value.splice(1, 0, newRule)
    console.log(editor.value)
}

const handleConfirmSave = async () => {
    try {
        const res = await api.addRuleRequest({
            projectId,
            fileId: activeNode.value.id,
            ruleName: ruleName.value,
            rule: mapStructureToString(editor.value)
        })
        if (res.code == 200) {
            isShowDialog.value = false
            ruleName.value = ''
            getFileTree()
        }
    } catch {}
    
}

const handleShowRun = async () => {
    try {
        const res = await api.runProjectRequest({
            type: 0,
            id: ruleId.value
        })
        if (res.code == 200) {
            consoleData.value = res.data
        }
    } catch {}
    isShowRunDialog.value = true
}

const handleAddWhile = () => { 
    editor.value = [deepCopy(whileItem)]
}


const handleAddTemplate = () => {
    isShowTemplate.value = true
}

const handleConfifmAddTemplate = (index) => {
    editor.value = [deepCopy(templates[index])]
    isShowTemplate.value = false
    tIsShow.value = true
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
