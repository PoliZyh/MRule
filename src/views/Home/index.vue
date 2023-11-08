<template>
    <div class="home-page">
        <div class="big-screen" ref="screenRef">
            <div class="b-header">
                <img src="../../assets/images/logo.png" alt="">
                <ul>
                    <li>首页</li>
                    <li @click="router.push('/big-screen')">数据大屏</li>
                    <li>产品中心</li>
                    <li>历史版本</li>
                </ul>
            </div>
            <div class="b-title">
                <h1>MRule规则引擎</h1>
                <p>提供决策集、决策表多种类型的业务规则设计工具，从各个角度满足业务规则设计的需要。</p>
                <div class="b-container">
                    <button class="button" @click="handleLogin">在线体验</button>
                    <div class="b-icons">
                        <el-icon class="b-icon" style="--s:0s;"><ArrowRight /></el-icon>
                        <el-icon class="b-icon" style="--s:0.5s;"><ArrowRight /></el-icon>
                        <el-icon class="b-icon" style="--s:1s;"><ArrowRight /></el-icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="scroll-screen project-center" ref="scrollScreenProjectCenterRef">
            <div class="sticky-screen">
                <div class="b-s-title">
                    <h4>产品中心</h4>
                </div>
                <div class="b-cards">
                    <div class="b-card card1">
                        <div class="img-box"></div>
                        <p>文字</p>
                    </div>
                    <div class="b-card card2">
                        <div class="img-box"></div>
                        <p>文字</p>
                    </div>
                    <div class="b-card card3">
                        <div class="img-box"></div>
                        <p>文字</p>
                    </div>
                    <div class="b-card card4">
                        <div class="img-box"></div>
                        <p>文字</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BIRDS from 'vanta/dist/vanta.birds.min'
import lax from 'lax.js'
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const screenRef = ref()
const vantaEffect = ref('')
const scrollScreenProjectCenterRef = ref()
const router = useRouter()

const handleLogin = () => {
    router.push({
        name: 'Login'
    })
}

onBeforeUnmount(() => {
    if(vantaEffect.value) {
        vantaEffect.value.destroy()
    }
})

onMounted(() => {
    // 大屏
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
    // lax
    const projectCenterToTop = scrollScreenProjectCenterRef.value.getBoundingClientRect().top
    lax.init();
    lax.addDriver('scrollY', function () {
        return window.scrollY;
    })

    lax.addElements('.card1', {
        scrollY: {
            opacity: [
                [projectCenterToTop - 300, projectCenterToTop],
                [0, 1]
            ],
            translateY: [
                [projectCenterToTop - 300, projectCenterToTop],
                [100, 0]
            ],
        }
    })
    lax.addElements('.card2', {
        scrollY: {
            opacity: [
                [projectCenterToTop - 200, projectCenterToTop + 100],
                [0, 1]
            ],
            translateY: [
                [projectCenterToTop - 200, projectCenterToTop + 100],
                [100, 0]
            ]
        }
    })
    lax.addElements('.card3', {
        scrollY: {
            opacity: [
                [projectCenterToTop - 100, projectCenterToTop + 200],
                [0, 1]
            ],
            translateY: [
                [projectCenterToTop - 100, projectCenterToTop + 200],
                [100, 0]
            ]
        }
    })
    lax.addElements('.card4', {
        scrollY: {
            opacity: [
                [projectCenterToTop, projectCenterToTop + 300],
                [0, 1]
            ],
            translateY: [
                [projectCenterToTop, projectCenterToTop + 300],
                [100, 0]
            ]
        }
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
    .scroll-screen {
        height: 300vh;
        .sticky-screen {
            height: 100vh;
            position: sticky;
            padding: 50px 20px;
            top: 0;
            .b-s-title {
                width: 100%;
                font-size: 1.6rem;
                position: relative;
                display: flex;
                justify-content: center;
                h4 {
                    width: fit-content;
                    text-align: center;
                    position: relative;
                }
                h4::after {
                    content: '';
                    position: absolute;
                    top: 110%;
                    left: 0;
                    height: 4px;
                    width: 100%;
                    border-radius: 3px;
                    background-color: $theme-c-blue;
                }
            }
            .b-cards {
                margin-top: 120px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .b-card {
                    width: 300px;
                    height: 400px;
                    border-radius: 15px;
                    border: 1px solid rgb(239, 239, 239);
                    box-shadow: 0 0 20px 0px rgb(223, 223, 223);
                    padding: 15px;
                    opacity: 0;
                    .img-box {
                        width: 100%;
                        height: 40%;
                        background-color: rgb(193, 193, 193);
                        border-radius: 10px;
                    }
                    p {
                        margin-top: 15px;
                    }
                }
            }
        }
     

    }
    .project-center {
        height: 200vh !important;
    }
}
</style>
