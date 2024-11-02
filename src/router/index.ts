/*
 * @Author: yelan wzqf99@foxmail.com
 * @Date: 2024-10-21 08:35:08
 * @LastEditors: yelan wzqf99@foxmail.com
 * @LastEditTime: 2024-10-21 08:39:09
 * @FilePath: \vue3-ts-cms\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createWebHashHistory, createRouter } from 'vue-router'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
const routes = [
  { path: '/', redirect: '/main' },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main-view.vue')
  },
  { path: '/login', component: () => import('../views/login/login-view.vue') },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) {
    return 'login'
  }

  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})
export default router
