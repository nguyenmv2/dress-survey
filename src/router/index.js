import Vue from "vue";
import VueRouter from "vue-router";
import SurveyPage from "../views/SurveyPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "survey",
    component: SurveyPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
