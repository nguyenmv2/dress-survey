<template>
  <div>
    <a href="#" @click="test">Test Function</a>
    {{ result }}
  </div>
</template>
<script>
import axios from "axios";
// import { injectStore } from "@/helpers/injectors";
import { ref } from "@vue/composition-api";

export default {
  setup() {
    const result = ref("{}");
    // const store = injectStore();
    // const user = store.getters.user;
    async function test() {
      // const res = await axios.post(
      //   "/.netlify/functions/uploader",
      //   { name: "test.jpg", type: "image/jpeg" },
      //   {
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + user.access_token
      //     }
      //   }
      // );
      const { data } = await axios.get("/.netlify/functions/get-images");
      result.value = data;
    }
    return {
      result,
      test
    };
  }
};
</script>
