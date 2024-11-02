<!--
 * @Author: yelan wzqf99@foxmail.com
 * @Date: 2024-10-22 16:37:31
 * @LastEditors: yelan wzqf99@foxmail.com
 * @LastEditTime: 2024-10-23 10:42:07
 * @FilePath: \vue3-ts-cms\src\components\main-menu\mian-menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">通用后台管理系统</h2>
    </div>
    <!-- 2.menu -->
    <div class="menu">
      <el-menu :default-active="defaultActive" :collapse="isFold" text-color="#b7bdc3" active-text-color="#fff"
        background-color="#001529">
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Setting, ShoppingBag } from '@element-plus/icons-vue';
import useLoginStore from '@/store/login/login';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { mapPathToMenu } from '@/utils/map-menus';

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})


// 菜单是根据userMenus渲染出来的
// 路由也是根据userMenus中所包含的路由信息渲染出来的
// 1.获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 2.监听item的点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}

// 3.ElMenu的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }


  .menu {
    height: 100%;
    background-color: #206175;
  }

  .el-menu {
    border-right: none;
    user-select: none;
    background-color: #206175;
  }

  .el-sub-menu {


    .el-menu-item {
      padding-left: 50px !important;
      background-color: #2E8E9A;
      color: #08383c;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #4a6fbd;
    }
  }
}
</style>
