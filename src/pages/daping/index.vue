<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header">123</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="aside">aside</div>
        </el-aside>
        <el-main>
          <div class="main">main</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.common-layout {
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;

  .aside {
    box-sizing: inherit;
    background-color: antiquewhite;
    height: calc(100vh - 100px);
  }
  .header {
    width: 100%;
    height: 100%;
    background-color: aqua;
    padding: 0;
  }

  .main {
    background-color: blue;
    height: calc(100vh - 100px);
  }
}
</style>
