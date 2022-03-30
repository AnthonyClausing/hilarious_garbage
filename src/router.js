import Vue from "vue";
import Router from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import SinglePost from "./views/SinglePost.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user/:id",
      name: "user",
      component: AboutView,
    },
    {
      path: "/posts/:id",
      name: "single-post",
      component: SinglePost,
    },
  ],
});
