<template>
  <div id="app">
    <input type="file" accept="image/*" @change="onChange" />
    <img v-if="image" :src="image" alt="compressed-image-output" />
  </div>
</template>

<script>
import { readAndCompressImage } from "browser-image-resizer";

export default {
  name: 'App',
  data() {
    return {
      image: null,
    }
  },
  methods: {
    async onChange(event) {
      let image = await readAndCompressImage(event.target.files[0]);
      let base64Image = await this.convertToBase64(image);
      this.image = base64Image;
    },
    convertToBase64(imageBlob) {
      return new Promise((resolve) => {
        var reader = new FileReader()
        reader.onload = function() {
          resolve(reader.result)
        }
        reader.readAsDataURL(imageBlob)
      })
    },
  },
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
