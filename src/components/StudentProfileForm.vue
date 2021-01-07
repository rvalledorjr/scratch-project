<template>
  <v-form>
    <v-container>
      <v-row dense>
        <v-col
          ><v-text-field
            v-model="lstudent.schoolId"
            label="School ID"
          ></v-text-field
        ></v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            v-model="lstudent.firstName"
            label="First Name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            v-model="lstudent.middleName"
            label="Middle Name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-text-field
            v-model="lstudent.lastName"
            label="Last Name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :md="6">
          <v-text-field
            v-model="lstudent.extensionName"
            label="Extension Name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-btn color="grey" text tile @click="cancel">Cancel</v-btn>
        <v-btn color="primary" text tile @click="addStudent">Add</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Student } from "theta-core";
import Vue from "vue";
export default Vue.extend({
  props: {
    student: {
      default: () => {
        return new Student();
      },
    },
  },

  data() {
    return {
      lstudent: this.student,
    };
  },

  methods: {
    addStudent() {
      this.$emit("add-student", this.lstudent);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
});
</script>
