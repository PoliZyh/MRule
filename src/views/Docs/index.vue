<template>
    <div class="help-doc-box">
        <div class="doc-list">
            <div class="doc-kind" v-for="item in docData" :key="item.title">
                <span class="kind-title">{{ item.title }}</span>
                <div class="doc-child"
                v-for="child in item.children"
                :key="child.title">
                    <span
                    :style="{'color': activeTitle === child.title ? 'var(--title-c-normal-blue' : ''}"
                    @click="handleClickTitle(child)">
                        {{ child.title }}
                    </span>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="md-show">
                <v-md-preview :text="activeContent" height="380px" style="width: 100%;"></v-md-preview>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

import DocWelcome from './docs/doc_welcome.md?raw'
import DocDSL from './docs/doc_dsl.md?raw'
import { useRoute, useRouter } from 'vue-router';

const docData = reactive([
    {
        title: '介绍',
        children: [
            {
                title: '欢迎',
                content: DocWelcome
            },
            {
                title: '开发人员',
                content: ''
            }
        ]
    },
    {
        title: '快速开始',
        children: [
            {
                title: '规则设计',
                content: ''
            },
            {
                title: 'DSL编辑',
                content: DocDSL
            },
            {
                title: '规则部署',
                content: ''
            }
        ]
    },
    {
        title: '接口文档',
        children: [
            {
                title: '规则接口规范',
                content: ''
            },
            {
                title: '规则集接口规范',
                content: ''
            },
            {
                title: '自定义接口',
                content: ''
            }
        ]
    }
])

const activeTitle = ref('')
const activeContent = ref('')
const router = useRouter()
const route = useRoute()

onMounted(() => {
    if (Object.keys(route.query).length > 0) {
        const query = route.query
        docData.forEach(item => {
            const filterItem = item.children.find(child => child.title === query.title)
            if (filterItem) {
                activeTitle.value = filterItem.title
                activeContent.value = filterItem.content
            }
        })
    } else {
        handleClickTitle(docData[0].children[0])
    }
})

const handleClickTitle = (child) => {
    activeTitle.value = child.title
    activeContent.value = child.content
    router.push({
        query: {
            title: child.title
        }
    })

}
</script>

<style scoped lang="scss">
.help-doc-box {
    --title-c-normal-blue: #409EFF;
    --border-c-week: #e5e5e5a7;
    --title-c-normal-blue: #409EFF;
    display: flex;
    height: 100%;
    background-color: white;
    flex: 1;
    border-left: 1px solid var(--border-c-week);
    width: 100%;
    .doc-list {
        width: 20%;
        height: 100%;
        padding: 40px 0px 0px 40px;
        display: flex;
        flex-direction: column;
        gap: 40px;
        font-size: 0.9rem;
        border-right: 1px solid var(--border-c-week);
        .doc-kind {
            .kind-title {
                font-weight: 600;
            }
            .doc-child {
                padding-left: 15px;
                span {
                    cursor: pointer;
                    color: grey;
                    transition: color .1s;
                }
                span:hover {
                    color: var(--title-c-normal-blue);
                }
            }
        }
        span {
            line-height: 30px;
        }
    }
    .content {
        width: 80%;
        flex: 1;
        white-space: normal;
        overflow: auto;
        .md-show {
            width: 100%;
            white-space: normal;
        }
    }
}
</style>

<style lang="scss">
.help-doc-box {
    .content {
        p {
            white-space: normal;
            line-height: 30px;
            text-indent: 2em;
        }
    }
}
</style>