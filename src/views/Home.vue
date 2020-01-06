<template>
  <div>
    <div id="surveyContainer"><survey :survey="surveyModel"></survey></div>
    <div>{{ surveyResult }}</div>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import surveyJSON from "@/helpers/survey.json";
import { ref } from "@vue/composition-api";

export default {
  name: "Home",
  components: {
    survey: SurveyVue.Survey
  },
  setup() {
    // eslint-disable-next-line
    const surveyModel = ref(new SurveyVue.Model(surveyJSON));
    const surveyResult = ref({});

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
