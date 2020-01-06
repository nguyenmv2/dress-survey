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
export default {
  setup() {
    const images = [
      "https://assets.bluetagbridal.com/surveys/3-4-length.jpg",
      "https://assets.bluetagbridal.com/surveys/A-line-gradient.jpg",
      "https://assets.bluetagbridal.com/surveys/OMBRECOLOR.jpg",
      "https://assets.bluetagbridal.com/surveys/SATINBEADEDSKIRT.jpg",
      "https://assets.bluetagbridal.com/surveys/Vshape-illusion.jpg",
      "https://assets.bluetagbridal.com/surveys/aline-standard.jpg",
      "https://assets.bluetagbridal.com/surveys/ballgown-exaggerated.jpg",
      "https://assets.bluetagbridal.com/surveys/ballgown-standard.jpg",
      "https://assets.bluetagbridal.com/surveys/beaded-flower.jpg",
      "https://assets.bluetagbridal.com/surveys/beaded-sparkle-skirt.jpg",
      "https://assets.bluetagbridal.com/surveys/beadingbodice.jpg",
      "https://assets.bluetagbridal.com/surveys/black-dress.jpg",
      "https://assets.bluetagbridal.com/surveys/capslleeve.jpg",
      "https://assets.bluetagbridal.com/surveys/courttrain.jpg",
      "https://assets.bluetagbridal.com/surveys/detachable-train-chapel.jpg",
      "https://assets.bluetagbridal.com/surveys/ellbow.jpg",
      "https://assets.bluetagbridal.com/surveys/halter.jpg",
      "https://assets.bluetagbridal.com/surveys/highneck.jpg",
      "https://assets.bluetagbridal.com/surveys/illusion-neckline.jpg",
      "https://assets.bluetagbridal.com/surveys/illusionstraight.jpg",
      "https://assets.bluetagbridal.com/surveys/ivory.jpg",
      "https://assets.bluetagbridal.com/surveys/laceornot.jpg",
      "https://assets.bluetagbridal.com/surveys/linedback.jpg",
      "https://assets.bluetagbridal.com/surveys/mockneck.jpg",
      "https://assets.bluetagbridal.com/surveys/no-sleeve.jpg",
      "https://assets.bluetagbridal.com/surveys/offtheshoulder.jpg",
      "https://assets.bluetagbridal.com/surveys/othercolor.jpg",
      "https://assets.bluetagbridal.com/surveys/pinkdress.jpg",
      "https://assets.bluetagbridal.com/surveys/pocket.jpg",
      "https://assets.bluetagbridal.com/surveys/puffsleave.jpg",
      "https://assets.bluetagbridal.com/surveys/red-dress.jpg",
      "https://assets.bluetagbridal.com/surveys/sheath-alloverlace.jpg",
      "https://assets.bluetagbridal.com/surveys/sheath-nolace.jpg",
      "https://assets.bluetagbridal.com/surveys/sheath-standard.jpg",
      "https://assets.bluetagbridal.com/surveys/short-circle.jpg",
      "https://assets.bluetagbridal.com/surveys/shortsleeve-boatneck.jpg",
      "https://assets.bluetagbridal.com/surveys/shortsleeve.jpg",
      "https://assets.bluetagbridal.com/surveys/spaghettistrap.jpg",
      "https://assets.bluetagbridal.com/surveys/strapless.jpg",
      "https://assets.bluetagbridal.com/surveys/sweetheart.jpg",
      "https://assets.bluetagbridal.com/surveys/teadress.jpg",
      "https://assets.bluetagbridal.com/surveys/tiershort.jpg",
      "https://assets.bluetagbridal.com/surveys/tiertealength.jpg",
      "https://assets.bluetagbridal.com/surveys/unlined-back-no-sleeve.jpg"
    ];
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
