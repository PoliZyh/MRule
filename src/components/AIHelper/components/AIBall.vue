<template>
    <div class="ai-ball-box" @click="handleClickOnAiBall">
        <div class="chat-box" v-if="props.isShowChat">
            <div class="chat">
                <div class="close-point" @click="handleCloseChat"></div>
                <div class="empty-list" v-if="chatList.length === 0">
                    <div class="empty-item">
                        如何使用MRule？
                    </div>
                    <div class="empty-item">
                        如何制作一个建议的规则?
                    </div>
                    <div class="empty-item">
                        ...?
                    </div>
                </div>
                <div class="chat-list" v-else>
                    <RChatListItem></RChatListItem>
                    <UChatListItem></UChatListItem>
                    <UChatListItem></UChatListItem>
                    <UChatListItem></UChatListItem>
                </div>
            </div>
            <div class="chat-input">
                <el-input 
                type="textarea" 
                v-model="chatTxt" 
                @click="handleInput" 
                ref="elInputRef"
                :autosize="{ minRows: 1, maxRows: 1}"
                style="width: 80%;"
                ></el-input>
                <el-button icon="Position" class="btn"></el-button>
            </div>
        </div>
        <div class="before-active" v-else>
            <svg t="1698154789193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5438"><path d="M554.666667 251.733333V341.333333h341.333333v426.666667H170.666667V341.333333h341.333333V251.733333c-25.6-8.533333-42.666667-34.133333-42.666667-59.733333 0-34.133333 29.866667-64 64-64s64 29.866667 64 64c0 29.866667-17.066667 51.2-42.666666 59.733333zM512 384H213.333333v341.333333h640V384h-341.333333z m-384 85.333333v213.333334H85.333333v-213.333334h42.666667z m853.333333 0v213.333334h-42.666666v-213.333334h42.666666zM384 597.333333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666666z m298.666667 0c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666666 42.666667-17.066667 42.666667-42.666666 42.666666z" fill="#409eff" p-id="5439"></path></svg>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import RChatListItem from './RChatListItem.vue'
import UChatListItem from './UChatListItem.vue'

let chatTxt = ref('')
const elInputRef = ref()
const chatList = ref([
    {
        type: 'r',
        msg: '你好呀'
    },
    {
        type: 'u',
        msg: 'hi'
    },
    {
        type: 'r',
        msg: 'hihi'
    }
])
// const chatList = ref([])

const props = defineProps({
    isShowChat: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:isShowChat'])

const handleCloseChat = () => {
    emits('update:isShowChat', false)
}

const handleClickOnAiBall = () => [
    elInputRef.value.blur()
]

const handleInput = (e) => {
    e.stopPropagation()
    elInputRef.value.focus()
}



</script>

<style scoped lang="scss">
.ai-ball-box {
    height: 40px;
    width: 40px;
    position: relative;
    left: 0;
    .before-active {
        height: 100%;
        width: 100%;
        display: flex;
        border-radius: 50%;
        outline: 5px solid rgba(64, 158, 255, 0.1);
        background-color: white;
        transition: all 0.3s;
        cursor: pointer;
        .icon {
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            padding: 10%;
            color: yellow;
        }
    }
    .before-active:hover {
        background-color: rgba(64, 158, 255, 0.1) !important;
        outline-color: rgb(110, 185, 255);
    }
    .chat-box {
        width: 300px;
        height: 400px;
        // background-color: rgba(255, 255, 255, 0.763);
        background-color: white;
        border-radius: 20px;
        border: 10px solid rgb(239, 239, 239);
        padding: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
        .chat {
            flex: 8;
            position: relative;
            padding-top: 25px;
            // padding-bottom: 40px;
            .close-point {
                position: absolute;
                left: 0;
                top: 0;
                width: 13px;
                height: 13px;
                background-color: red;
                border-radius: 50%;
                cursor: pointer;
            }
            .empty-list {
                height: 100%;
                width: 100%;
                padding-top: 60%;
                .empty-item {
                    width: 70%;
                    padding: 6px 15px;
                    background-color: white;
                    margin: 0 auto;
                    margin-bottom: 10px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    border: 1px solid rgb(227, 227, 227);
                    box-shadow: 0 0 5px 0px rgba(234, 234, 234, 0.873);
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .empty-item:hover {
                    box-shadow: 0 0 10px 0px rgba(203, 203, 203, 0.873);
                }
            }
            .chat-list {
                width: 100%;
                display: flex;
                height: 340px;
                flex-direction: column;
                gap: 10px;
                overflow: scroll;
                padding-bottom: 48px;
            }
        }
        .chat-input {
            position: absolute;
            z-index: 40;
            height: 50px;
            width: 100%;
            left: 0;
            bottom: -0px;
            padding: 0px 10px;
            display: flex;
            align-items: center;
            background-color: white;
            .btn {
                flex: 1;
            }
        }
        
    }
}
</style>