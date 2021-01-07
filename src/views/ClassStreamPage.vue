<template>
  <v-sheet class="d-flex align-center flex-column">
    <v-container>
      <v-row justify="center">
        <v-col :lg="9">
          <v-card>
            <v-img
              src="../assets/banner-1.jpg"
              height="200"
              class="white--text"
              gradient="to bottom, rgba(100,115,201,.33), rgba(25,32,72,.5)"
            >
              <v-card-title>
                <span class="text-h3">{{ selectedCourseClass.name }}</span>
              </v-card-title>
              <div class="tw--mt-6"></div>
              <v-card-subtitle>
                <span class="tw-text-xl tw-text-white">{{
                  selectedCourseClass.subject
                }}</span>
              </v-card-subtitle>
              <div class="tw--mt-6"></div>
              <v-card-subtitle>
                <span class="tw-text-xl tw-text-white">{{
                  selectedCourseClass.section
                }}</span>
              </v-card-subtitle>
              <div class="tw--mt-6"></div>
              <v-card-subtitle>
                <span class="white--text">
                  Class code: {{ selectedCourseClass.code }}
                  <v-dialog v-model="showQRDialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="white" v-on="on">
                        <v-icon>mdi-qrcode-scan</v-icon>
                      </v-btn>
                    </template>

                    <ClassCodeForm :code="selectedCourseClass.code" />
                  </v-dialog>
                </span>
              </v-card-subtitle>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        v-for="(activity, i) in activities"
        :key="i"
        dense
        justify="center"
      >
        <v-col :lg="9">
          <v-list>
            <StreamPost :people="activity" />
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import { CourseClass, User } from "theta-core";
import StreamPost from "../components/StreamPost.vue";
import ClassCodeForm from "../components/ClassCodeForm.vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: {
    StreamPost,
    ClassCodeForm,
  },
  data() {
    return {
      showQRDialog: false,
      serverInfo: null,
      activities: [
        new User({
          firstName: "asdf",
          middleName: "asdfads",
          lastName: "asdfadfs",
        }),
        new User({
          firstName: "asdf",
          middleName: "asdfads",
          lastName: "asdfadfs",
        }),
      ],

      user: new User(),
    };
  },
  computed: {
    ...mapState({
      selectedCourseClass: (state: any) =>
        state.courseClassStore.selectedCourseClass as CourseClass,
    }),
  },
  methods: {},
});
</script>

<style lang="sass" scoped></style>
