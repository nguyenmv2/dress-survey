import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/survey",
    name: "survey",
    component: () =>
      import(/* webpackChunkName: "survey" */ "../views/SurveyPage.vue")
  },
  {
    path: "/images",
    name: "images",
    component: () =>
      import(/* webpackChunkName: "images" */ "../views/Images.vue")
  },
  {
    path: "/uploader",
    name: "uploader",
    component: () =>
      import(/* webpackChunkName: "uploader" */ "../views/Uploader.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
