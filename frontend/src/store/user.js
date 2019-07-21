import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    error: null,
    loading: false
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
          commit("SET_USER", userInfo);
          commit("UPDATE_LOADING", false);
        })
        .catch(err => {
          console.log(err);
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
          commit("SET_USER", userInfo);
          commit("UPDATE_LOADING", false);
        })
        .catch(err => {
          console.log(err);
          commit("UPDATE_LOADING", false);
        });
    }
  },
  mutations: {
    UPDATE_LOADING(state, bool) {
      state.loading = bool;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  }
};
