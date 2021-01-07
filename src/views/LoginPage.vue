<template>
  <v-container>
    <v-row justify="center" fill-height>
      <v-card width="430" class="mt-15 pa-5">
        <LoginForm
          :userName="userName"
          :password="password"
          :rules="rules"
          :authValid="authValid"
          @login="attemptLogin"
        />
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "theta-core";
import { mapActions, mapMutations } from "vuex";
import LoginForm from "../components/LoginForm.vue";
export default Vue.extend({
  components: {
    LoginForm,
  },

  data() {
    return {
      userName: "",
      password: "",
      authValid: true,
      rules: {
        userName: [(v: string) => !!v || "This field is required."],
        password: [(v: string) => !!v || "This field is required."],
      },
    };
  },

  methods: {
    ...mapActions(["loadStore"]),
    ...mapActions("userStore", ["login"]),
    async attemptLogin(auth: { userName: string; password: string }) {
      try {
        await this.login(new User(auth));
        this.authValid = true;
        this.loadStore();
        this.$router.push("/home/classes");
      } catch (error) {
        this.authValid = false;
      }
    },
  },
});
</script>

<style></style>
