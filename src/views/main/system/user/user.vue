<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()
// 查询处理函数
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
// 重置处理函数
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
// 新增数据
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
// 修改数据
function handleEditClick(itemData: any) {
  console.log(itemData)
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
