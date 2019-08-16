import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import SinglePost from "./views/SinglePost.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/user/:id",
      name: "user",
      component: About
    },
    {
      path: "/posts/:id",
      name: "single-post",
      component: SinglePost
    }
  ]
});
