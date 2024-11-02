/*
 * @Author: yelan wzqf99@foxmail.com
 * @Date: 2024-10-17 09:39:33
 * @LastEditors: yelan wzqf99@foxmail.com
 * @LastEditTime: 2024-10-21 12:16:25
 * @FilePath: \vue3-ts-cms\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

/* import ElementPlus from 'element-plus'*/
import 'element-plus/dist/index.css'

// 图标全局注册

const app = createApp(App)
/* app.use(ElementPlus) */
app.use(registerIcons)
app.use(router)
app.use(pinia).mount('#app')
