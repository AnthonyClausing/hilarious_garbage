import Vue from "vue";
import Vuex from "vuex";
import posts from "./store/posts";
import user from "./store/user";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    posts,
    user
  }
});
