<template>
  <div id="app">
    <input type="file" accept="image/*" @change="onChange" multiple />
    <div v-if="images.length > 0">
      <img v-for="(image, index) in images" :key="`img_${index}`" :src="image" alt="compressed-image-output" />
    </div>
  </div>
</template>

<script>
import { readAndCompressImage } from "browser-image-resizer";

export default {
  name: 'App',
  data() {
    return {
      images: [],
    }
  },
  methods: {
    async onChange(event) {
      let convertImages = Array.from(event.target.files)
        .map(file => this.readImageAndConvertToBase64(file))
      let images = await Promise.all(convertImages)
      this.images = images
    },
    async readImageAndConvertToBase64(file) {
      let image = await readAndCompressImage(file, { mimeType: 'image/png', debug: true } );
      let base64Image = await this.convertToBase64(image);
      return base64Image
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
