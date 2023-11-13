<template>
  <div>
    <!-- 组件1 -->
    <data1 :data="mockData" @update="handelUpdate"></data1>
    <!-- 组件2 -->
    <data2></data2>
    <!-- 组件3 -->
    <data3></data3>
  </div>
</template>

<script setup>

let mockData = ref()

// 更新操作
function handelUpdate(params) {}
</script>
