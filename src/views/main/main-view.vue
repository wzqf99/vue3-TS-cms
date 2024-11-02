<!--
 * @Author: yelan wzqf99@foxmail.com
 * @Date: 2024-10-21 08:51:49
 * @LastEditors: yelan wzqf99@foxmail.com
 * @LastEditTime: 2024-10-23 10:44:06
 * @FilePath: \vue3-ts-cms\src\views\main\main-view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="el-aside" :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold"></main-menu>
      </el-aside>
      <el-container class="container">
        <el-header height="48px">
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import mainHeader from '@/components/main-header/main-header.vue';
import mainMenu from '@/components/main-menu/mian-menu.vue';

// 处理main-header中折叠的变化
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #206175;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
