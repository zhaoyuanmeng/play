<template>
  <div ref="pannellumViewer"></div>
</template>

<script>
import 'pannellum/build/pannellum.css';
import pannellum from 'pannellum';
import VuePannellum from 'vue-pannellum';

export default {
  components: {
    VuePannellum,
  },
  mounted() {
    this.viewer = pannellum.viewer(this.$refs.pannellumViewer, {
      type: 'equirectangular',
      panorama: './test.png',
      autoLoad: true,
      showControls: false,
      hotSpots: [
        {
          pitch: 14.1,
          yaw: -11.4,
          type: 'scene',
          text: '第一个场景',
          sceneId: 'scene2',
        },
        {
          pitch: -10.8,
          yaw: 222.6,
          type: 'scene',
          text: '第二个场景',
          sceneId: 'scene3',
        },
      ],
    });
  },
};
</script>
