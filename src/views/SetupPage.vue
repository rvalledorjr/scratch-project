<template>
  <v-container>
    <v-row justify="center" fill-height>
      <v-card width="450" class="mt-10 pa-5">
        <SetupForm :user="user" @save="save" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { User } from "theta-core";
import Vue from "vue";
import { mapActions } from "vuex";
import SetupForm from "../components/SetupForm.vue";
export default Vue.extend({
  components: {
    SetupForm,
  },

  data() {
    return {
      user: new User(),
    };
  },

  methods: {
    ...mapActions("userStore", ["register"]),
    async save(user: User) {
      await this.register(user);
      this.$router.push("/home/classes");
    },
  },
});
</script>

<style></style>
