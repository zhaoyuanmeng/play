<template>
  <div id="map" class="maps"></div>
</template>
<script setup>
import mapboxgl from 'mapbox-gl';
var map = new mapboxgl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      'raster-tiles': {
        attribution: attribution,
        type: 'raster',
        tiles: [
          "https://www.cim.xaxcsz.com:31846/iserver/services/map-china400/rest/maps/China/zxyTileImage.png?z={z}&x={x}&y={y}'",
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  },
  center: [120.143, 30.236], // starting position
  zoom: 3, // starting zoom
});


{
  name,
  pid,
  children:[
    {
      id,
      name,
      pid,
      children:[
        {

        }
  ]
    }
  ]
}
</script>

<style scoped lang="scss">
.maps {
  width: 600px;
  height: 600px;
}
</style>
