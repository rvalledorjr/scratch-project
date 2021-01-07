<template>
  <v-list-item
    v-bind="$attrs"
    @click.stop="$emit('course-class-selected', courseClass)"
  >
    <v-list-item-avatar :color="randomColor">
      <span class="body-1 white--text mx-auto">{{
        courseClass.nameInitial
      }}</span>
    </v-list-item-avatar>
    <v-list-item-content>{{ courseClass.name }}</v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import { CourseClass } from "theta-core";
import { stringToHslColor } from "../utils";
export default Vue.extend({
  props: {
    courseClass: {
      default: () => new CourseClass(),
    },
  },
  computed: {
    randomColor() {
      return stringToHslColor(((this as any).courseClass as CourseClass).name);
    },
  },
});
</script>
