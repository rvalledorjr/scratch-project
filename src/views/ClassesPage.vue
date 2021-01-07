<template>
  <v-sheet>
    <v-container fluid>
      <v-row>
        <ClassCard
          v-for="(v, k) in activeCourseClasses"
          :key="k"
          :courseClass="v"
          class="ml-5 mb-5"
          width="300"
          height="250"
          @course-class-selected="selectCourseClass"
          @archive="archiveClass"
        />
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { CourseClass, User } from "theta-core";
import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import ClassCard from "../components/ClassCard.vue";
import AvatarMenu from "../components/AvatarMenu.vue";
export default Vue.extend({
  components: {
    ClassCard,
    AvatarMenu,
  },
  data() {
    return { drawerVisible: false, user: new User() };
  },
  computed: {
    ...mapGetters("courseClassStore", ["activeCourseClasses"]),
  },
  methods: {
    ...mapMutations("courseClassStore", ["selectClass"]),
    ...mapActions("courseClassStore", ["saveClassUpdate"]),
    selectCourseClass(courseClass: CourseClass) {
      this.selectClass(courseClass);
      this.$router.push("/home/stream");
    },
    archiveClass(courseClass: CourseClass) {
      this.saveClassUpdate(courseClass);
    },
  },
});
</script>
