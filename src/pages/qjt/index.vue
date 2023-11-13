<template>
  <div class="container">
    <!-- 场景导航 -->
    <NavList />
    <!-- 工具 -->
    <Tools />
    <!-- 场景视图 -->
    <div id="pano"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import NavList from './compontes/NavList.vue';
import Tools from './compontes/Tools.vue';

// 数据区域

// 方法
function init(params) {}

// 生命周期
onMounted(() => {});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
#pano {
  width: 100%;
  height: 100%;
}
</style>
