import axios from "axios";
import Vue from "vue";
import { CourseClass, User } from "theta-core";
import { database, query as q } from "../../pouchdb";
import host from "../../host";

export const courseClassStore = {
  namespaced: true,

  state: {
    courseClasses: [] as CourseClass[],
    selectedCourseClass: null,
  },

  getters: {
    activeCourseClasses: (state: { courseClasses: CourseClass[] }) => {
      const { courseClasses } = state;

      return courseClasses.filter((c) => !c.archived);
    },
  },

  mutations: {
    addClass(state: { courseClasses: CourseClass[] }, classes: CourseClass[]) {
      const { courseClasses } = state;
      courseClasses.push(...classes);
    },
    selectClass(state: { courseClass: CourseClass }, select: CourseClass) {
      Vue.set(state, "selectedCourseClass", select);
    },

    resetStore(state: any) {
      Vue.set(state, "courseClasses", [] as CourseClass[]);
      Vue.set(state, "selectedCourseClass", null);
    },
  },

  actions: {
    async addClass(ctx: { commit: Function }, courseClass: CourseClass) {
      const { commit } = ctx;

      const res = await database.put(courseClass);
      courseClass._rev = res.rev;

      commit("addClass", [courseClass]);
    },
    async saveClassUpdate(ctx: { commit: Function }, courseClass: CourseClass) {
      const res = await database.put(courseClass);
      courseClass._rev = res.rev;
    },
    async loadStore(ctx: { commit: Function }) {
      const { commit } = ctx;
      const res = await database.find(q.courseClasses());

      const classes = res.docs.map((c) => new CourseClass(c));
      commit("addClass", classes);
    },
  },
};
