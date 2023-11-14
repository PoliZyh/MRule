<template>
    <div class="rule-while-box">
        <template v-for="rule in rules">
            <div class="rule-while-row" v-if="rule.type === 'while'" :key="rule">
                <div class="rule-while-row-title">
                    <h4>循环</h4>
                    <template v-if="rule.conditions && rule.conditions.length > 0">
                        <p v-for="(ops, index) in rule.conditions">
                            <template v-if="ops.left && ops.left !== null">
                                <el-tag>
                                    {{ ops.left.varName }} {{ ops.operator }} {{ ops.right.varName }}
                                </el-tag>

                            </template>
                            <template v-else>
                                <el-tag>
                                    {{ ops.operator }} {{ ops.right.varName }}
                                </el-tag>

                            </template>
                        </p>
                    </template>
                    <el-button type="primary" link size="small" @click="addCondition(rule.conditions)">添加条件</el-button>
                </div>
                <div class="rule-while-row-bodyer">
                    <p class="tip">则执行</p>
                    <div class="so">
                        <template v-if="rule.body && rule.body.length > 0">
                            <div v-for="row in rule.body" :key="row" class="so-row">
                                <template v-if="row.type === 'print'">
                                    {{ 'console.log(' + row.received.varName + ');' }}
                                </template>
                                <template v-else-if="row.type === 'calculate'">
                                    {{ '' + row.received.varName + ' = '
                                        + row.calculate.left.varName + ' ' + row.calculate.operator + ' '
                                        + row.calculate.right.varName + ';'
                                    }}
                                </template>
                                <template v-else-if="row.type === 'while'">
                                    <RuleWhile :rules="[row]" style="margin-top: 10px;"></RuleWhile>
                                </template>
                                <template v-else-if="row.type === 'if' || row.type === 'else if' || row.type === 'else'">
                                    <RuleIf :rules="[row]" style="margin-top: 10px;" @update-rule="handleUpdate"></RuleIf>
                                </template>
                            </div>
                        </template>
                        <el-button @click="handleAddMethod(rule.body)" size="small" type="primary" link>添加动作</el-button>
                    </div>
                </div>
            </div>
        </template>
        <!-- dialog -->
    <el-dialog title="添加条件" v-model="showConditionDialog" width="40%">
            <el-form>
                <el-form-item label="左值">
                    <el-row style="width: 100%;" :gutter="20">
                        <el-col :span="12">
                            变量库
                        </el-col>
                        <el-col :span="12" v-if="conditionParams.left.libId">
                            变量名
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%;" :gutter="20">
                        <el-col :span="12" v-if="conditionParams.left">
                            <el-select :disabled="isInherit" @change="handleChangeLeft" v-model="conditionParams.left.libId"
                                class="m-2" placeholder="Select">
                                <el-option v-for="item in libOptions" :key="item.id" :label="item.fileName"
                                    :value="item.id" />
                            </el-select>
                        </el-col>
                        <template v-if="conditionParams.left.libId">
                            <el-col :span="12">
                                <el-select :disabled="isInherit" v-model="conditionParams.left.varName" class="m-2"
                                    placeholder="Select">
                                    <el-option v-for="item in varLeftOptions" :key="item.variableName"
                                        :label="item.variableName" :value="item.variableName" />
                                </el-select>
                            </el-col>
                        </template>
                        <el-checkbox v-model="isInherit">继承上一逻辑结果</el-checkbox>
                    </el-row>
                </el-form-item>

                <el-form-item label="操作">
                    <el-select v-model="conditionParams.operator" class="m-2" placeholder="Select">
                        <el-option v-for="item in opsOptions" :key="item.name" :label="item.name" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="右值">
                    <el-row style="width: 100%;" :gutter="20">
                        <el-col :span="12">
                            变量库
                        </el-col>
                        <el-col :span="12" v-if="conditionParams.right.libId">
                            变量名
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%;" :gutter="20">
                        <el-col :span="12">
                            <el-select @change="handleChangeRight" v-model="conditionParams.right.libId" class="m-2"
                                placeholder="Select">
                                <el-option v-for="item in libOptions" :key="item.id" :label="item.fileName"
                                    :value="item.id" />
                            </el-select>
                        </el-col>
                        <template v-if="conditionParams.right.libId">
                            <el-col :span="12">
                                <el-select v-model="conditionParams.right.varName" class="m-2" placeholder="Select">
                                    <el-option v-for="item in varRightOptions" :key="item.variableName"
                                        :label="item.variableName" :value="item.variableName" />
                                </el-select>
                            </el-col>
                        </template>

                    </el-row>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelAddCondition">取消添加</el-button>
                    <el-button type="primary" @click="confirmAddCondition">
                        确认添加
                    </el-button>
                </span>
            </template>
    </el-dialog>

    <el-dialog title="添加动作" v-model="showMethodDialog" width="40%">
            <el-form>
                <el-form-item label="动作类型">
                    <el-select placeholder="请选择动作类型" v-model="methodParams.type" @change="handleChangeType">
                        <el-option v-for="item in methodOptions" :key="item.name" :label="item.name"
                            :value="item.type"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="methodParams.type">
                    <el-form-item label="输出" v-if="methodParams.type === 'print'">
                        <el-row style="width: 100%;" :gutter="20">
                            <el-col :span="12">变量库</el-col>
                            <el-col :span="12" v-if="methodParams.received.libId">变量名</el-col>
                        </el-row>
                        <el-row style="width: 100%;" :gutter="20">
                            <el-col :span="12">
                                <el-select v-model="methodParams.received.libId" @change="handleChangePrint">
                                    <el-option v-for="item in libOptions" :key="item.id" :label="item.fileName"
                                        :value="item.id" />
                                </el-select>
                            </el-col>
                            <el-col :span="12" v-if="methodParams.received.libId">
                                <el-select v-model="methodParams.received.varName">
                                    <el-option v-for="item in methodPrintOptions" :key="item.variableName"
                                        :label="item.variableName" :value="item.variableName" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="计算" v-else-if="methodParams.type === 'calculate'">
                        <el-form style="width: 100%;">
                            <el-form-item label="赋值给">
                                <el-row style="width: 100%;" :gutter="20">
                                    <el-col :span="12">变量库</el-col>
                                    <el-col :span="12" v-if="methodParams.received.libId">变量名</el-col>
                                </el-row>
                                <el-row style="width: 100%;">
                                    <el-col :span="12">
                                        <el-select v-model="methodParams.received.libId" @change="handleChangePrint">
                                            <el-option v-for="item in libOptions" :key="item.id" :label="item.fileName"
                                                :value="item.id" />
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12" v-if="methodParams.received.libId">
                                        <el-select v-model="methodParams.received.varName">
                                            <el-option v-for="item in methodPrintOptions" :key="item.variableName"
                                                :label="item.variableName" :value="item.variableName" />
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="计算为">
                                <el-form style="width: 100%;">
                                    <el-form-item label="左值">
                                        <el-row style="width: 100%;" :gutter="20">
                                            <el-col :span="12">变量库</el-col>
                                            <el-col :span="12" v-if="methodParams.calculate.left.libId">变量名</el-col>
                                        </el-row>
                                        <el-row style="width: 100%;" :gutter="20">
                                            <el-col :span="12">
                                                <el-select v-model="methodParams.calculate.left.libId"
                                                    @change="handleChangeMethodLeft">
                                                    <el-option v-for="item in libOptions" :key="item.id"
                                                        :label="item.fileName" :value="item.id" />
                                                </el-select>
                                            </el-col>
                                            <el-col :span="12" v-if="methodParams.calculate.left.libId">
                                                <el-select v-model="methodParams.calculate.left.varName">
                                                    <el-option v-for="item in methodLeftOptions" :key="item.variableName"
                                                        :label="item.variableName" :value="item.variableName" />
                                                </el-select>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item label="运算" style="margin-top: 10px;">
                                        <el-select v-model="methodParams.calculate.operator">
                                            <el-option v-for="item in opsMethodOptions" :key="item.name" :label="item.name"
                                                :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="右值">
                                        <el-row style="width: 100%;" :gutter="20">
                                            <el-col :span="12">变量库</el-col>
                                            <el-col :span="12" v-if="methodParams.calculate.right.libId">变量名</el-col>
                                        </el-row>
                                        <el-row style="width: 100%;" :gutter="20">
                                            <el-col :span="12">
                                                <el-select v-model="methodParams.calculate.right.libId"
                                                    @change="handleChangeMethodRight">
                                                    <el-option v-for="item in libOptions" :key="item.id"
                                                        :label="item.fileName" :value="item.id" />
                                                </el-select>
                                            </el-col>
                                            <el-col :span="12" v-if="methodParams.calculate.right.libId">
                                                <el-select v-model="methodParams.calculate.right.varName">
                                                    <el-option v-for="item in methodRightOptions" :key="item.variableName"
                                                        :label="item.variableName" :value="item.variableName" />
                                                </el-select>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>
                        </el-form>
                    </el-form-item>
                    <el-form-item label="渲染分支" v-else-if="methodParams.type === 'while'">
                        添加嵌套WHILE
                    </el-form-item>
                </template>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelAddMethod">取消添加</el-button>
                    <el-button type="primary" @click="confirmAddMethod">
                        确认添加
                    </el-button>
                </span>
            </template>
    </el-dialog>
    </div>

    
</template>


<script setup>

import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import api from '../../../api';
import { extractObjects } from '@/utils/rule.js'
import { deepCopy } from '../../../utils/deepCopy';
import { whileItem, ifItem } from './init';
import RuleIf from './RuleIf.vue';

const showConditionDialog = ref(false)
const selectedConditions = ref([])
const conditionParams = ref({
    left: {
        varName: '',
        libId: ''
    },
    operator: '',
    right: {
        varName: '',
        libId: ''
    },
})
const selectedBody = ref([])
const libOptions = ref([])
const varLeftOptions = ref([])
const varRightOptions = ref([])
const opsOptions = ref([
    {
        name: '等于',
        value: '=='
    },
    {
        name: '大于',
        value: '>'
    },
    {
        name: '小于',
        value: '<'
    },
    {
        name: '大于等于',
        value: '>='
    },
    {
        name: '小于等于',
        value: '<='
    },
    {
        name: '不等于',
        value: '!='
    },
    {
        name: '并且',
        value: '&&'
    },
    {
        name: '或者',
        value: '||'
    },
    {
        name: '非',
        value: '!'
    }
])
const showMethodDialog = ref(false)
const opsMethodOptions = ref([
    {
        name: '加法',
        value: '+'
    },
    {
        name: '减法',
        value: '-'
    },
    {
        name: '乘法',
        value: '*'
    },
    {
        name: '除法',
        value: '/'
    }
])
const methodLeftOptions = ref([])
const methodRightOptions = ref([])
const methodPrintOptions = ref([])
const methodOptions = ref([
    {
        type: 'print',
        name: '输出',
    },
    {
        type: 'calculate',
        name: '计算',
    },
    {
        type: 'while',
        name: '循环规则'
    },
    {
        type: 'if',
        name: '条件规则'
    }
])
const methodParams = ref({
    type: '',
    received: {
        libId: '',
        varName: ''
    },
    calculate: {
        left: {},
        operator: "",
        right: {}
    }
})
const isInherit = ref(false)
const store = useStore()
const projectId = store.state.project.projectId

const props = defineProps({
    rules: {
        type: Array,
        default: () => ([])
    }
})

const addCondition = (conditions) => {
    clearOption()
    showConditionDialog.value = true
    selectedConditions.value = conditions
}

const clearOption = () => {
    conditionParams.value = {
        left: {
            varName: '',
            libId: ''
        },
        operator: '',
        right: {
            varName: '',
            libId: ''
        },
    }
    isInherit.value = false
}

const handleAddMethod = (body) => {
    clearMethod()
    showMethodDialog.value = true
    selectedBody.value = body
}

const handleChangeMethodLeft = async () => {
    try {
        const res = await api.getAllVariableRequest({
            fileId: methodParams.value.calculate.left.libId,
            fileType: "variable"
        })
        if (res.code === 200) {
            methodLeftOptions.value = res.data
        }
    } catch { }
}

const handleChangeMethodRight = async () => {
    try {
        const res = await api.getAllVariableRequest({
            fileId: methodParams.value.calculate.right.libId,
            fileType: "variable"
        })
        if (res.code === 200) {
            methodRightOptions.value = res.data
        }
    } catch { }
}

const confirmAddMethod = (e) => {
    e.stopPropagation()
    selectedBody.value.push(deepCopy(methodParams.value))
    showMethodDialog.value = false
}
const handleChangePrint = async () => {
    try {
        const res = await api.getAllVariableRequest({
            fileId: methodParams.value.received.libId,
            fileType: "variable"
        })
        if (res.code === 200) {
            methodPrintOptions.value = res.data
        }
    } catch { }
}

const clearMethod = () => {
    methodParams.value = {
        type: '',
        received: {
            libId: '',
            varName: ''
        },
        calculate: {
            left: {},
            operator: "",
            right: {}
        }
    }
    // selectedBody.value = null
}

const cancelAddMethod = () => {
    showMethodDialog.value = false
}
const handleChangeType = () => {
    if (methodParams.value.type === 'while') {
        methodParams.value = deepCopy(whileItem)
    } else if (methodParams.value.type === 'if') {
        methodParams.value = deepCopy(ifItem)
    } else {
        methodParams.value = {
            ...{
                type: '',
                received: {
                    libId: '',
                    varName: ''
                },
                calculate: {
                    left: {},
                    operator: "",
                    right: {}
                }
            },
            type: methodParams.value.type
        }
    }
}

const getFiles = async () => {
    try {
        const res = await api.getFileTreeRequest({
            projectId: projectId,
            type: 1
        })
        console.log(res)
        if (res.code == 200) {
            libOptions.value = extractObjects(res.data.data)
            
        }
    } catch {
     }
}

const handleChangeLeft = async () => {
    try {
        const res = await api.getAllVariableRequest({
            fileId: conditionParams.value.left.libId,
            fileType: "variable"
        })
        if (res.code === 200) {
            varLeftOptions.value = res.data
        }
    } catch { }
}
const handleChangeRight = async () => {
    try {
        const res = await api.getAllVariableRequest({
            fileId: conditionParams.value.right.libId,
            fileType: "variable"
        })
        if (res.code === 200) {
            varRightOptions.value = res.data
        }
    } catch { }
}

watch(() => isInherit.value,
    () => {
        if (isInherit.value) {
            conditionParams.value.left = {}
        } else {
            conditionParams.value.left = {
                varName: '',
                libId: ''
            }
        }
    })

const cancelAddCondition = () => {
    showConditionDialog.value = false
    clearOption()
}
const confirmAddCondition = () => {
    showConditionDialog.value = false
    selectedConditions.value.push({ ...conditionParams.value })
    clearOption()
}

const handleUpdate = (newRule) => {
    
    selectedBody.value.splice(1, 0, newRule)
    
}

onMounted(() => {
    getFiles()
})

</script>

<script>
export default {
    name: 'RuleWhile'
}
</script>

<style scoped lang="scss">
.rule-while-box {
    width: 100%;
    padding: 20px;
    border: 1px solid rgb(0, 174, 255);

    .rule-while-row {
        padding: 10px;

        .rule-while-row-title {
            display: flex;
            gap: 10px;
            align-items: center;
            border-bottom: 1px solid rgb(183, 183, 183);
            padding-bottom: 5px;
        }

        .rule-while-row-bodyer {
            padding-left: 10px;
            margin-top: 6px;

            .tip {
                font-size: 0.8rem;
                font-weight: 600;
            }

            .so {
                padding-left: 10px;
                margin-top: 5px;

            }
        }
    }
}
</style>