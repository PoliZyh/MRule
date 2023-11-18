<template>
    <div class="u-chat-list-item">
        <div class="left">
            <p>我该如何编辑规则？</p>
        </div>
        <div class="right">
            <div class="icon-box">
                <img src="../../../assets/images/user.jpeg" alt="">
            </div>
            
        </div>
    </div>
</template>


<script setup>

</script>


<style scoped lang="scss">
.u-chat-list-item {
    width: 100%;
    display: flex;
    .left {
        flex: 1;
        padding: 5px 10px;
        margin-left: 10px;
        background-color: #409eff;
        border-radius: 10px;
        p {
            width: 180px;
            color: white;
            overflow-wrap: break-word;
            word-wrap: break-word;
        }
    }
    .right {
        .icon-box {
            padding: 5px;
            border-radius: 50%;
            height: 40px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }
    }
}
</style>