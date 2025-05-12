<script setup lang="ts">
import { Viewer, BaseLayer } from 'larkexplorer-sdk-pro';
import * as Cesium from 'cesium';
import { nextTick, onMounted } from 'vue';
onMounted(() => {
  nextTick(() => {
    const viewer: Viewer = new Viewer('globe', {
      baseLayer: BaseLayer.DefaultSingleImg,
      fpsShow: true,
      mapboxController: true,
    });
    console.log(Cesium, viewer);
  });
});
</script>

<template>
  <div id="globe"></div>
</template>

<style scoped>
#globe {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
