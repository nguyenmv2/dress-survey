<template>
  <div>
    <div id="surveyContainer">
      <survey :survey="surveyModel"></survey>
    </div>
    <div>{{ surveyResult }}</div>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import surveyJSON from "@/helpers/survey.json";
import { ref } from "@vue/composition-api";

export default {
  name: "SurveyPage",
  components: {
    survey: SurveyVue.Survey
  },
  setup() {
    // eslint-disable-next-line
    const surveyModel = ref(new SurveyVue.Model(surveyJSON));
    const surveyResult = ref({});
    const css = {
      root: "sv_main sv_bootstrap_css bg-blue-light",
      body: "panel-body card-block mt-4",
      bodyEmpty: "panel-body card-block mt-4 sv_body_empty",
      footer: "panel-footer card-footer flex justify-around px-12",
      navigation: {
        start: "btn sv_start_btn blue-btn self-center"
      },
      question: {
        titleRequired: "py-8 font-serif font-semibold text-lg"
      },
      imagepicker: {
        itemInline: "sv_q_imagepicker_inline p-4",
        itemText: "sv_q_imgsel_text font-sans font-semibold"
      }
    };
    surveyModel.value.css = css;
    surveyModel.value.onComplete.add(result => {
      surveyResult.value = result.data;
    });

    return {
      surveyModel,
      surveyResult
    };
  }
};
</script>
<style>
.sv_q_imgsel_image {
  height: 300px !important;
  object-fit: cover !important;
  @apply mx-auto;
}
.sv_qstn .sv_q_imgsel label > div {
  @apply flex flex-col flex-grow border-4 border-blue-light relative;
  @apply p-0 !important;
}
.checked label > div {
  @apply border-2 border-blue !important;
}
.checked label > div::before {
  content: "";
  display: block;
  background-image: url("../assets/icons/check-mark.svg");
  background-size: 24px 24px;
  height: 24px;
  width: 30px;
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
}
.checked label > div::after {
  content: " ";
  display: block;
  background-image: linear-gradient(
    0deg,
    rgba(85, 110, 142, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.25;
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  @apply h-full w-full;
}
.btn {
  @apply px-8 py-2 bg-blue text-white font-sans rounded mb-10;
}
.btn:hover {
  @apply border border-blue bg-blue-light text-blue;
}
</style>
