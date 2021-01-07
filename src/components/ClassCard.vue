<template>
  <v-card
    v-bind="$attrs"
    class="d-flex flex-column"
    :height="desktopDevice ? 280 : 'auto'"
    elevation-2
  >
    <v-img
      :src="require('@/assets/banner-1.jpg')"
      max-height="130px"
      gradient="to bottom, rgba(100,115,201,.33), rgba(25,32,72,.5)"
    >
      <v-card-title class="d-flex align-start mb-3">
        <a
          class="course-class-name white--text headline mr-auto"
          @click.prevent.stop="$emit('course-class-selected', courseClass)"
          >{{ courseClass.name }}</a
        >
        <v-menu offset-y>
          <template dark v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="white">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="changeBannerPicture">
              <v-list-item-subtitle>Change Banner Picture</v-list-item-subtitle>
            </v-list-item>
            <v-list-item @click="editClassInfo">
              <v-list-item-subtitle>Edit Class Info</v-list-item-subtitle>
            </v-list-item>
            <v-list-item @click="archive">
              <v-list-item-subtitle>Archive</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-subtitle class="body-2">
        <div class="white--text">{{ courseClass.subject }}</div>
        <div class="white--text">{{ courseClass.section }}</div>
        <div v-if="hasEnrolledStudents" class="white--text">
          {{ courseClass.enrolledStudents.length }} students
        </div>
      </v-card-subtitle>
    </v-img>
    <v-card-text v-show="desktopDevice"></v-card-text>
    <v-divider v-show="desktopDevice" class="mt-auto"></v-divider>
    <v-card-actions v-show="desktopDevice" class="align-self-end">
      <v-btn text>
        <v-icon v-text="'mdi-trending-up'"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { CourseClass } from "theta-core";
export default Vue.extend({
  props: {
    courseClass: {
      default() {
        return new CourseClass();
      },
    },
  },
  computed: {
    hasEnrolledStudents() {
      const courseClass = (this as any).courseClass as CourseClass;
      return courseClass.enrolledStudents.length > 0;
    },
    desktopDevice() {
      return (this as any).$vuetify.breakpoint.name !== "xs";
    },
  },
  methods: {
    changeBannerPicture() {
      this.$emit("changeBannerPicture");
    },
    editClassInfo() {
      this.$emit("editClassInfo", (this as any).courseClass);
    },
    archive() {
      ((this as any).courseClass as CourseClass).archived = true;
      this.$emit("archive", (this as any).courseClass);
    },
  },
});
</script>

<style lang="scss" scoped>
.course-class-name:hover {
  text-decoration: underline;
  // background-color: rgba(16, 31, 117, 0.822)
}
</style>
