<template>
    <div class="home-page">
        <div class="big-screen" ref="screenRef">
            <div class="b-header">
                <img src="../../assets/images/logo.png" alt="">
                <ul>
                    <li>首页</li>
                    <li>产品中心</li>
                    <li>历史版本</li>
                </ul>
            </div>
            <div class="b-title">
                <h1>MRule规则引擎</h1>
                <p>提供决策集、决策表多种类型的业务规则设计工具，从各个角度满足业务规则设计的需要。</p>
                <div class="b-container">
                    <button class="button" @click="goToLoginRegistration">在线体验</button>
                    <div class="b-icons">
                        <el-icon class="b-icon" style="--s:0s;"><ArrowRight /></el-icon>
                        <el-icon class="b-icon" style="--s:0.5s;"><ArrowRight /></el-icon>
                        <el-icon class="b-icon" style="--s:1s;"><ArrowRight /></el-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BIRDS from 'vanta/dist/vanta.birds.min'
import { onMounted, ref } from 'vue';

const screenRef = ref()
const vantaEffect = ref('')
onMounted(() => {
    vantaEffect.value = BIRDS({
        el: screenRef.value,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        birdSize: 0.50
    })
})


</script>

<style scoped lang="scss">
.home-page {
    height: 100%;
    width: 100%;
    .big-screen {
        height: 80vh;
        position: relative;
        .b-header {
            padding: 5px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
                height: 50px;
            }
            ul {
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 40px;
                margin-right: 30px;
                li {
                    list-style: none;
                    cursor: pointer;
                    position: relative;
                }
                li::after {
                    content: '';
                    position: absolute;
                    left: 0%;
                    top: 110%;
                    width: 0%;
                    height: 1px;
                    background-color: white;
                    transition: all 0.3s ;
                }
                li:hover::after {
                    width: 100%;
                }
            }
        }
        .b-title {
            position: absolute;
            top: 40%;
            color: white;
            transform: translateY(-50%);
            left: 5%;
            h1 {
                font-size: 3.2rem;
                margin-bottom: 25px;
            }
            p {
                font-size: 1.4rem;
                margin-left: 20px;
            }
            button {
                background: transparent;
                padding: 10px 20px;
                border: 1px solid white;
                color: white;
                font-size: 1.4rem;
                border-radius: 7px;
                cursor: pointer;
            }
            .b-container {
                margin-top: 25px;
                display: flex;
                gap: 10px;
                align-items: center;
                height: 100%;
                .b-icons {
                    font-size: 1.8rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .b-icon {
                        --s: 0s;
                        animation: show 0.4s infinite;
                        animation-delay: var(--s);
                    }
                }
                @keyframes show {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>
