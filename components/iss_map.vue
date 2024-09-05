<script setup>
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const config = useRuntimeConfig()
const mapbox_access_token = ref(config.public.mapbox_access_token)
const marker = ref([0, 0, null])
const sun_windows = ref([])
const updateWait = config.public.update_wait

const getIssPosition = async () => {
  try {
    const response = await axios.get(config.public.iss_position_url);
    const { latitude, longitude , timestamp} = response.data;
    return [longitude, latitude, timestamp];
  } catch (error) {
    console.error('Error getting iss position:', error);
    return [0, 0, null]
  }
};

const getDaylightTimeWindows = async () => {
  try {
    const response = await axios.get(config.public.iss_sun_url);
    return response.data;
  } catch (error) {
    console.error('Error getting daylight time windows:', error);
    return []
  }
};

const updateMarker = async () => {
  marker.value = await getIssPosition()
  sun_windows.value = await getDaylightTimeWindows()
}


onMounted(async () => {
  updateMarker()
  setInterval(updateMarker, updateWait);
});

onBeforeUnmount(() => {
  clearInterval(updateMarker);
});

</script>


<template>
    <div class="h-screen overflow-y-auto max-w-md mx-auto bg-transparent/50 rounded-md" style="z-index: 2; position: absolute; top: 0; left: 0;">
      <div class="bg-transparent text-white">
        <div class="flex justify-center items-center">
          <img src="../static/images/sun.png" alt="Sun" class="w-8 h-8">
        </div>
        <h2 class="text-2xl font-bold mb-4 text-center">Daylight Windows</h2>
      </div>
      <ul>
        <li v-for="(window, index) in sun_windows" :key="index" class="mb-4 p-4 text-white bg-transparent rounded-md">
          <span class="font-semibold">Start Time:</span>
          <span class="ml-2">{{ window.start_time ? window.start_time : 'Not specified' }}</span>
          <br>
          <span class="font-semibold">End Time:</span>
          <span class="ml-2">{{ window.end_time ? window.end_time : 'Not specified' }}</span>
        </li>
      </ul>
    </div>
    <div class="h-screen">
      <MapboxMap style="z-index: 1; position: absolute; top: 0; left: 0; height: 100vh; width: 100%; " :access-token=mapbox_access_token
        map-style="mapbox://styles/mapbox/streets-v11" @mb-created="(mapInstance) => map = mapInstance" :center="marker"
        :zoom="1">
        <MapboxMarker :lng-lat="marker" popup>
          <template v-slot:popup>
            <h2>Latitude: {{ marker[1] }}</h2>
            <h2>Longitude: {{ marker[0] }}</h2>
            <h2>Timestamp: {{marker[2]}}</h2>
          </template>
          <p class="custom-marker"><img src="../static/images/space-station.png" alt="Space Station"
              class="w-8 h-8"></p>
        </MapboxMarker>
      </MapboxMap>
    </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background-color: black;

}
</style>