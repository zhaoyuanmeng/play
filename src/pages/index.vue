<template>
  <div id="H5Video">
    <div id="player" style="width: 400px; height: 400px"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

let player = ref({});

function createPlayer() {
  player.value = new window.JSPlugin({
    szId: 'player',
    szBasePath: './',
    iMaxSplit: 4,
    iCurrentSplit: 1,
    openDebug: true,
  });
}

function init() {
  // 设置播放容器的宽高并监听窗口大小变化
  window.addEventListener('resize', () => {
    player.value.JS_Resize();
  });
}

// 播放
function realplay() {
  let index = player.value.currentWindowIndex;
  let playURL = 'ws://203.110.222.92:559/openUrl/i1UQDFS';
  player.value.JS_Play(playURL, { playURL, mode: 1 }, index).then(
    () => {
      console.log('realplay success');
    },
    (e) => {
      console.error(e);
    },
  );
}

// init();

onMounted(() => {
  setTimeout(() => {
    createPlayer();
    realplay();
    init();
  }, 10);
});
</script>

<style></style>
