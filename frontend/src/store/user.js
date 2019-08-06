import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
    loading: false,
    token: localStorage.getItem("token") || ""
  },
  actions: {
    login({ commit }, payload) {
      const requestBody = {
        query: `
        mutation {
          login(
            name: "${payload.name}",
            password: "${payload.password}"
          ) {
            token
            user {
              id
              name
            }
          }
        }`
      };
      commit("UPDATE_LOADING", true);
      axios
        .post("http://localhost:3000/graphql", requestBody)
        .then(res => {
          const userInfo = res.data.data.login.user;
          const token = res.data.data.login.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userInfo));
          axios.defaults.headers.common["Authorization"] = token;
          commit("AUTH_SUCCESS", userInfo, token);
          commit("UPDATE_LOADING", false);
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          commit("UPDATE_LOADING", false);
        });
    },
    signup({ commit }, payload) {
      const requestBody = {
        query: `
        mutation {
          signup(
            name: "${payload.name}",
            password: "${payload.password}",
            email: "${payload.email}"
          ) {
            token
            user {
              id
              name
            }
          }
        }`
      };
      commit("UPDATE_LOADING", true);
      axios
        .post("http://localhost:3000/graphql", requestBody)
        .then(res => {
          const userInfo = res.data.data.signup.user;
          const token = res.data.data.login.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userInfo));
          axios.defaults.headers.common["Authorization"] = token;
          commit("AUTH_SUCCESS", userInfo, token);
          commit("UPDATE_LOADING", false);
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          commit("UPDATE_LOADING", false);
        });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("LOG_OUT");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  mutations: {
    UPDATE_LOADING(state, bool) {
      state.loading = bool;
    },
    AUTH_SUCCESS(state, user, token) {
      state.user = user;
      state.token = token;
    },
    LOG_OUT(state) {
      state.token = "";
      state.user = null;
    }
  },
  getters: {
    isLoggedIn: state => !!state.token
  }
};
