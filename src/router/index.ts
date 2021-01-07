import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SetupPage from "../views/SetupPage.vue";
import HomePage from "../views/HomePage.vue";
import ActivityPage from "../views/ActivityPage.vue";
import StudentPage from "../views/StudentPage.vue";
import ClassesPage from "../views/ClassesPage.vue";
import TabNavBar from "../components/TabNavBar.vue";
import AddClassBtn from "../components/AddClassMenu.vue";
import ClassStreamPage from "../views/ClassStreamPage.vue";
import { VTabs } from "vuetify/lib";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: SetupPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/setup",
    component: SetupPage,
  },

  {
    path: "/home",
    component: HomePage,
    children: [
      {
        path: "classes",
        components: {
          classesPage: ClassesPage,
          tabNavBar: VTabs,
          addClassBtn: AddClassBtn,
        },
      },
      {
        path: "stream",
        components: { default: ClassStreamPage, tabNavBar: TabNavBar },
      },
      {
        path: "activities",
        components: { default: ActivityPage, tabNavBar: TabNavBar },
      },
      {
        path: "students",
        components: { default: StudentPage, tabNavBar: TabNavBar },
      },
      {
        path: "grades",
        components: { default: StudentPage, tabNavBar: TabNavBar },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const user = (store.state as any).userStore.user;
  const loginPath = to.path === "/login";
  const setupPath = to.path === "/setup";
  const loginOrSetupPath = loginPath || setupPath;
  if (user && !loginOrSetupPath) {
    next();
  } else if (loginOrSetupPath) {
    next();
  } else {
    next("/login");
  }
});

export default router;
