import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自定义样式
import '@/styles/index.scss'



const app = createApp(App)

app.use(router).use(store)

app.mount('#app')
