<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <input type="file" accept="image/*" @change="onChange" />
    <img :src="image" alt="compressed-image-output" />
  </div>
</template>

<script>
import { readAndCompressImage } from "browser-image-resizer";

export default {
  name: 'App',
  data () {
    return {
      image: null
    }
  },
  methods: {
    onChange (e) {
      console.log(e)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
