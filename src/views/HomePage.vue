<template>
  <v-sheet>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon
        @click.stop="drawerVisible = !drawerVisible"
      ></v-app-bar-nav-icon>
      <v-toolbar-title grow>
        {{ selectedClassName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div>
        <router-view name="tabNavBar"></router-view>
      </div>

      <v-spacer></v-spacer>
      <router-view
        name="addClassBtn"
        @createClass="addNewClass"
        @joinClass="joinClass"
      ></router-view>
      <AvatarMenu :user="user" @exit="exit" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawerVisible" app temporary>
      <SideNavigationBar
        :user="user"
        :courseClasses="activeCourseClasses"
        @classes-clicked="goToClassesSubPage"
        @course-class-selected="goToClassPage"
      />
    </v-navigation-drawer>
    <router-view />
    <router-view name="classesPage" @addNewClass="addNewClass"></router-view>

    <v-dialog
      v-model="showClassInfoDialog"
      width="500px"
      transition="dialog-transition"
    >
      <ClassInfoView
        @classCreated="addNewClassCreated"
        @cancel="cancelCreateCourseClass"
      ></ClassInfoView>
    </v-dialog>
    <v-dialog
      v-model="showJoinClassDialog"
      width="500px"
      transition="dialog-transition"
    >
      <JoinClassForm
        :connected="connected"
        @connect="startJoinClass"
        @cancel="cancelJoinClass"
      />
    </v-dialog>
  </v-sheet>
</template>

<script lang="ts">
import { CourseClass, Teacher, User } from "theta-core";
import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import AvatarMenu from "../components/AvatarMenu.vue";
import SideNavigationBar from "../components/SideNavigationBar.vue";
import ClassInfoView from "../components/ClassInfoView.vue";
import JoinClassForm from "../components/JoinClassForm.vue";
export default Vue.extend({
  components: {
    AvatarMenu,
    SideNavigationBar,
    ClassInfoView,
    JoinClassForm,
  },

  data() {
    return {
      connected: false,
      showClassInfoDialog: false,
      showJoinClassDialog: false,
      drawerVisible: false,
    };
  },

  computed: {
    ...mapState("userStore", ["user"]),
    ...mapState({
      courseClasses: (state: any) => {
        return state.courseClassStore.courseClasses as CourseClass[];
      },
      courseClassSelected: (state: any) => {
        return state.courseClassStore.selectedCourseClass as CourseClass;
      },
      selectedClassName() {
        const cc = this.courseClassSelected;
        return cc ? cc.name : "";
      },
    }),
    ...mapGetters("courseClassStore", ["activeCourseClasses"]),
  },

  methods: {
    ...mapActions(["resetStore"]),
    ...mapActions("courseClassStore", ["addClass", "selectClass"]),
    ...mapMutations("courseClassStore", ["selectClass"]),
    addNewClass() {
      this.showClassInfoDialog = true;
    },
    joinClass() {
      this.showJoinClassDialog = true;
      this.connected = false;
    },
    startJoinClass() {
      this.connected = true;
    },
    cancelCreateCourseClass() {
      this.showClassInfoDialog = false;
    },
    cancelJoinClass() {
      this.showJoinClassDialog = false;
    },
    async addNewClassCreated(courseClass: CourseClass) {
      courseClass.teacher = new Teacher(this.user);
      await this.addClass(courseClass);
      this.showClassInfoDialog = false;
    },
    goToClassesSubPage() {
      this.selectClass(null);
      this.$router.push("/home/classes");
    },
    goToClassPage(courseClass: CourseClass) {
      this.selectClass(courseClass);
      this.$router.push("/home/stream");
    },
    exit() {
      this.resetStore();
      this.$router.push("/login");
    },
  },
});
</script>
