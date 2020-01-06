<template>
  <div class="about">
    <h1>This is an about page modified</h1>
    <div class="flex flex-1 flex-wrap">
      <div
        v-for="(image, idx) in images"
        :key="idx"
        class="w-1/4 p-3 flex flex-col"
      >
        <img :src="image" alt="" />
        <span class="text-underline">{{ toFilename(image) }}</span>
        <button
          v-clipboard:copy="image"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy Image Link
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount } from "@vue/composition-api";
import axios from "axios";

export default {
  name: "Images",
  setup() {
    const images = ref([]);
    async function fetchImages() {
      const { data } = await axios.get("/.netlify/functions/get-images");
      images.value = data;
    }
    onBeforeMount(() => {
      fetchImages();
    });

    function toFilename(image) {
      return image.substr(image.lastIndexOf("/") + 1);
    }
    return {
      images,
      toFilename
    };
  }
};
</script>
