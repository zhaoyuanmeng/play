<template>
  <div style="text-align: center" class="flex-column flex-y-center" v-if="tag">
    <wei-361
      :moveSpeed="moveSpeed"
      :autoSpeed="autoSpeed"
      :imgList="imgArr"
      :isDeep="isDeep"
      :isAuto="isAuto"
      @imgLoad="imgLoad"
      @change="rotaChange"
    >
    </wei-361>
    <div class="navBar">
      <button @click="isDeep = !isDeep">是否循环{{ isDeep }}</button>
      <button @click="isAuto = !isAuto">自动旋转</button>
      <div>自动旋转速度：<input type="number" v-model="autoSpeed" /></div>
      <div>滑动旋转速度：<input type="number" v-model="moveSpeed" /></div>
      <h2>当前帧数{{ nowRota }}</h2>
      <h2>加载进度：{{ loadVal }}</h2>
    </div>
  </div>
  <div @click="handel">设置开关</div>
</template>

<script>
export default {
  name: 'd360',
  data() {
    return {
      imgArr: [],
      isDeep: true,
      moveSpeed: 10,
      autoSpeed: 10,
      isAuto: false,
      nowRota: 0,
      loadVal: 0,
      tag: false,
    };
  },

  methods: {
    handel() {
      this.tag = !this.tag;
    },
    //旋转事件
    rotaChange(val) {
      this.nowRota = val;
    },
    //加载事件
    imgLoad(val) {
      this.loadVal = val;
    },
  },

  mounted() {
    setTimeout(async () => {
      let arr = [];
      for (let i = 0; i <= 30; i++) {
        arr.unshift(
          new URL(`../assets/bc/index_${i}.png`, import.meta.url).href,
        );
        console.log('aaaaaaaaa', arr);
      }
      this.imgArr = arr;
    }, 2000);
  },
};
</script>

<style lang="less" scoped>
.navBar {
  margin-top: 100px;
}
</style>
