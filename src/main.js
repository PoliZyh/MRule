import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "jsoneditor";

// 自定义样式
import '@/styles/index.scss'

// 渲染markdown https://ckang1229.gitee.io/vue-markdown-editor/zh/examples/preview-demo.html#%E5%BC%95%E5%85%A5
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}




app.use(router).use(store).use(VMdPreview)

app.mount('#app')
