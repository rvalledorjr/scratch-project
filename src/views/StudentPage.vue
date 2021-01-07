<template>
  <v-sheet>
    <v-container>
      <v-row justify="center">
        <v-col :md="8">
          <v-card elevation="0">
            <v-container>
              <v-row align="center">
                <v-col>
                  <span class="text-h4 font-weight-regular primary--text"
                    >Teacher</span
                  >
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col>
                  <v-divider color="blue"></v-divider>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col>
                  <v-list>
                    <v-list-item-group>
                      <PeopleListItem :people="user" />
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col>
                  <span class="text-h4 font-weight-regular primary--text"
                    >Students</span
                  >
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="1">
                  <v-btn
                    color="primary"
                    icon
                    class="text-capitalize"
                    @click="addStudent"
                  >
                    <v-icon>mdi-account-plus-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col>
                  <v-divider color="blue"></v-divider>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col>
                  <v-list>
                    <v-list-item-group>
                      <StudentListItem
                        v-for="(v, k) in selectedCourseClass.enrolledStudents"
                        :key="k"
                        :student="v"
                      />
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialogShown"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="pa-5">
        <StudentProfileForm @add-student="saveStudent" @cancel="cancel" />
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script lang="ts">
import { CourseClass, Student, User } from "theta-core";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import StudentListItem from "../components/StudentListItem.vue";
import PeopleListItem from "../components/PeopleListItem.vue";
import StudentProfileForm from "../components/StudentProfileForm.vue";
export default Vue.extend({
  components: {
    StudentListItem,
    StudentProfileForm,
    PeopleListItem,
  },

  data() {
    return {
      dialogShown: false,
    };
  },

  computed: {
    ...mapState({
      selectedCourseClass: (state: any) => {
        return state.courseClassStore.selectedCourseClass as CourseClass;
      },
      user: (state: any) => state.userStore.user as User,
    }),
  },

  methods: {
    ...mapActions("courseClassStore", ["saveClassUpdate"]),
    addStudent() {
      this.dialogShown = true;
    },
    saveStudent(student: Student) {
      this.selectedCourseClass.enrollStudent(student);
      this.saveClassUpdate(this.selectedCourseClass);
      this.dialogShown = false;
    },
    cancel() {
      this.dialogShown = false;
    },
  },
});
</script>
