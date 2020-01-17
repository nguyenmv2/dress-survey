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
      container: "sv_container",
      header: "panel-heading card-header",
      body: "panel-body card-block mt-4",
      bodyEmpty: "panel-body card-block mt-4 sv_body_empty",
      footer: "panel-footer card-footer",
      title: "",
      description: "",
      navigationButton: "",
      completedPage: "",
      navigation: {
        complete: "btn sv_complete_btn",
        prev: "btn sv_prev_btn",
        next: "btn sv_next_btn",
        start: "btn sv_start_btn"
      },
      progress: "progress center-block mx-auto mb-4",
      progressBar: "progress-bar",
      progressTextUnderBar: "sv-hidden",
      page: {
        root: "",
        title: "",
        description: ""
      },
      pageTitle: "",
      pageDescription: "small",
      row: "sv_row",
      question: {
        mainRoot: "sv_qstn",
        flowRoot: "sv_q_flow sv_qstn",
        header: "1",
        headerLeft: "title-left",
        content: "2",
        contentLeft: "content-left",
        titleLeftRoot: "sv_qstn_left",
        title: "3",
        number: "sv_q_num",
        description: "small",
        descriptionUnderInput: "small",
        requiredText: "sv_q_required_text",
        comment: "form-control",
        required: "4",
        titleRequired: "py-8 font-sans font-semibold",
        hasError: "has-error",
        indent: 20,
        formGroup: "form-group"
      },
      error: {
        root: "alert alert-danger",
        icon: "glyphicon glyphicon-exclamation-sign",
        item: "",
        locationTop: "sv_qstn_error_top",
        locationBottom: "sv_qstn_error_bottom"
      },
      imagepicker: {
        root: "sv_imgsel",
        item: "sv_q_imgsel",
        itemChecked: "checked",
        itemInline: "sv_q_imagepicker_inline p-4",
        label: "sv_q_imgsel_label",
        itemControl: "sv_q_imgsel_control_item",
        image: "sv_q_imgsel_image",
        itemText: "sv_q_imgsel_text",
        clearButton: "sv_q_radiogroup_clear"
      },
      window: {
        root: "modal-content",
        body: "modal-body",
        header: {
          root: "modal-header panel-title",
          title: "pull-left",
          button: "glyphicon pull-right",
          buttonExpanded: "glyphicon pull-right glyphicon-chevron-up",
          buttonCollapsed: "glyphicon pull-right glyphicon-chevron-down"
        }
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
</style>
