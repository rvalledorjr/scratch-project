<template>
  <v-list subheader>
    <v-list-item @click="$emit('classes-clicked')">
      <v-list-item-avatar>
        <v-icon size="30" v-text="'mdi-home'">home</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>Classes</v-list-item-content>
    </v-list-item>
    <v-list-item @click="select">
      <v-list-item-avatar>
        <v-icon size="30" v-text="'mdi-file-question'"></v-icon>
      </v-list-item-avatar>
      <v-list-item-content>Assessment Materials</v-list-item-content>
    </v-list-item>

    <v-divider v-show="teachingClassesPresent"></v-divider>
    <v-subheader v-show="teachingClassesPresent">Teaching</v-subheader>
    <CourseClassItem
      v-for="(courseClass, i) in teachingClasses"
      :key="`teaching-${i}`"
      :courseClass="courseClass"
      v-on:course-class-selected="$emit('course-class-selected', courseClass)"
    ></CourseClassItem>

    <v-divider v-show="enrolledClassesPresent"></v-divider>
    <v-subheader v-show="enrolledClassesPresent">Enrolled</v-subheader>
    <CourseClassItem
      v-for="(courseClass, i) in enrolledClasses"
      :key="`enrolled-${i}`"
      :courseClass="courseClass"
      v-on:course-class-selected="$emit('course-class-selected', courseClass)"
    ></CourseClassItem>

    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon>mdi-archive-arrow-down</v-icon>
      </v-list-item-avatar>
      <v-list-item-content> Archived Classes </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import CourseClassItem from "../components/CourseClassItem.vue";
import { CourseClass, Teacher, User } from "theta-core";

export default Vue.extend({
  components: {
    CourseClassItem,
  },
  props: {
    user: { default: () => new User() },
    courseClasses: { default: () => [] as CourseClass[] },
  },
  computed: {
    teachingClassesPresent(): boolean {
      return this.teachingClasses.length > 0;
    },
    teachingClasses(): CourseClass[] {
      const user = this.user;
      return (this.courseClasses as CourseClass[]).filter((c) =>
        c.hasTeacher(user)
      );
    },
    enrolledClassesPresent(): boolean {
      return this.enrolledClasses.length > 0;
    },
    enrolledClasses(): CourseClass[] {
      const user = this.user;
      return (this.courseClasses as CourseClass[]).filter((c) =>
        c.hasStudentEnrolled(user)
      );
    },
  },
  methods: {
    select() {},
  },
});
</script>

<style lang="scss" scoped></style>
