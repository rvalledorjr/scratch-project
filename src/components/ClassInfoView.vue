<template>
  <v-card v-bind="$attrs">
    <v-card-title primary-title>Create a new class</v-card-title>
    <v-container>
      <v-form ref="form">
        <v-container>
          <v-text-field
            v-model="name"
            label="Class Name"
            :rules="rule.name"
            required
          ></v-text-field>
          <v-text-field v-model="section" label="Section"></v-text-field>
          <v-text-field v-model="subject" label="Subject"></v-text-field>
          <v-text-field v-model="room" label="Room"></v-text-field>
          <v-row justify="end">
            <v-btn color="primary" text class="mt-5" @click.stop="cancel"
              >Cancel</v-btn
            >
            <v-btn
              v-show="typeCreate"
              color="primary"
              text
              class="ml-1 mt-5"
              @click.stop="createClass"
              >Create</v-btn
            >
            <v-btn
              v-show="typeUpdate"
              color="primary"
              text
              class="ml-1 mt-5"
              @click.stop="updateClass"
              >Update</v-btn
            >
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { CourseClass } from "theta-core";

const mode = {
  create: "create",
  update: "update",
};

const eventType = {
  syncCourseClass: "update:courseClass",
  classCreated: "classCreated",
  classUpdated: "classUpdated",
  cancel: "cancel",
};

export default Vue.extend({
  props: {
    courseClass: { default: () => new CourseClass() },
    mode: { default: () => mode.create },
  },
  data() {
    return {
      name: this.courseClass.name,
      section: (this as any).courseClass.section,
      subject: (this as any).courseClass.subject,
      room: (this as any).courseClass.room,
      rule: {
        name: [(v: any) => !!v || "Class name is required."],
      },
    };
  },
  watch: {
    courseClass(newVal, oldVal) {
      if (oldVal === newVal) return;

      (this as any).name = newVal.name;
      (this as any).section = newVal.section;
      (this as any).subject = newVal.subject;
      (this as any).room = newVal.room;
    },
  },
  computed: {
    typeCreate() {
      return (this as any).mode === mode.create;
    },
    typeUpdate() {
      return (this as any).mode === mode.update;
    },
  },
  methods: {
    createClass() {
      const valid = ((this as any).$refs.form as any).validate();
      if (valid) {
        const courseClass = new CourseClass();
        courseClass.name = (this as any).name;
        courseClass.section = (this as any).section;
        courseClass.subject = (this as any).subject;
        courseClass.room = (this as any).room;

        this.$emit(eventType.syncCourseClass, courseClass);
        this.$emit(eventType.classCreated, courseClass);

        (this.$refs.form as any).reset();
      }
    },
    updateClass() {
      const valid = (this.$refs.form as any).validate();
      if (valid) {
        (this as any).courseClass.name = (this as any).name;
        (this as any).courseClass.section = (this as any).section;
        (this as any).courseClass.subject = (this as any).subject;
        (this as any).courseClass.room = (this as any).room;
        this.$emit(eventType.classUpdated);
      }
    },
    cancel() {
      this.$emit(eventType.cancel);
      (this.$refs as any).form.reset();
    },
  },
});
</script>
