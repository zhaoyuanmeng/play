<template>
  <div class="body">
    <div class="container">
      <!-- 弄个两行五列 -->
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>

      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
      <div class="item">
        <img src=".././assets/a1.png" alt="" />
        <p class="txt">供热可视化</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style>
* {
  margin: 0;
  padding: 0;
}
.body {
  width: 100vw;
  height: 100vh;
  position: relative;
  min-height: 100vh;
  background: url('.././assets/bc.png') center no-repeat;
  background-size: 100%;
}

.container {
  display: grid;
  width: 1200px;
  /* background-color: rgb(192, 113, 9); */
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 60px;
  /* 垂直水平居中 */
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.item {
  width: 200px;
  height: 200px;
  /* background-color: aqua; */
}
.txt {
  color: #fff;
  font-size: 25px;
  margin-left: 40px;
  margin-top: 10px;
}
</style>
