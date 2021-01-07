<template>
  <v-sheet>
    <v-container>
      <v-row>
        <UserProfileForm
          :user="user"
          @save="registerUser"
          @cancel="reEmitCancel"
        />
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import UserProfileForm from "../components/UserProfileForm.vue";
import { User } from "theta-core";
export default Vue.extend({
  components: {
    UserProfileForm,
  },

  data() {
    return {
      user: new User(),
    };
  },

  methods: {
    registerUser() {},
    reEmitCancel() {
      this.$emit("cancel");
    },
  },
});
</script>
