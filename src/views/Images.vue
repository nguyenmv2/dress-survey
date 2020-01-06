<template>
  <div class="about">
    <h1>This is an about page modified</h1>
    <div class="uploader">
      <form id="fileForm" @submit.prevent="upload">
        <input id="files" type="file" multiple @change="onFileSelect" />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
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
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="deleteImg(image)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount, computed } from "@vue/composition-api";
import axios from "axios";
import { injectStore } from "@/helpers/injectors";

export default {
  name: "Images",
  setup() {
    const store = injectStore();
    const user = computed(() => store.getters.user);
    const images = ref([]);
    const files = ref([]);
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

    function presignedPut(name, type) {
      return axios.post(
        "/.netlify/functions/uploader",
        { name, type },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.value.access_token
          }
        }
      );
    }

    function onFileSelect(ev) {
      files.value = ev.target.files;
    }

    async function upload() {
      let promises = [];
      for (let i = 0; i < files.value.length; i++) {
        const file = files.value[i];
        promises.push(
          new Promise(resolve => {
            presignedPut(file.name, file.type).then(({ data }) => {
              const { uploadURL } = data;
              axios
                .put(uploadURL, file, {
                  headers: { "Content-Type": file.type }
                })
                .then(() => {
                  resolve();
                });
            });
          })
        );
      }
      await Promise.all(promises);
      fetchImages();
      document.getElementById("fileForm").reset();
    }

    async function deleteImg(img) {
      if (!window.confirm("Are you sure?")) return;
      const imgName = `public${new URL(img).pathname}`;
      // eslint-disable-next-line
      await axios.delete(
        "/.netlify/functions/delete-image", {
        data: { name: imgName },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.value.access_token
        }
      });
      fetchImages();
    }

    return {
      images,
      files,
      user,
      toFilename,
      upload,
      onFileSelect,
      deleteImg
    };
  }
};
</script>
