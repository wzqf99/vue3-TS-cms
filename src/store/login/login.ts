/*
 * @Author: yelan wzqf99@foxmail.com
 * @Date: 2024-10-22 09:20:29
 * @LastEditors: yelan wzqf99@foxmail.com
 * @LastEditTime: 2024-10-28 16:40:09
 * @FilePath: \vue3-ts-cms\src\store\login\login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/views/login/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import type { RouteRecordRaw } from 'vue-router'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 指定返回值的类型
  state: (): ILoginState => ({
    // 先从本地拿 没有则设为空
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  getters: {},
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token
      // 本地缓存token
      localCache.setCache('token', this.token)

      //  2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3.获取用户菜单
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 5.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重要: 获取登录用户的所有按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 6.跳转到main
      router.push('/main')

      // 刷新时加载数据、
    },

    // 刷新时加载数据并动态添加路由
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.获取按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions
        console.log(permissions, '@@@@@@@@')

        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
