import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "./modules/user";
import { courseClassStore } from "./modules/course-class";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async loadStore(state: { dispatch: Function }) {
      const { dispatch } = state;
      await dispatch("courseClassStore/loadStore");
    },
    resetStore(state: { commit: Function }) {
      const { commit } = state;

      commit("courseClassStore/resetStore");
      commit("userStore/resetStore");
    },
  },
  modules: {
    userStore,
    courseClassStore,
  },
});
