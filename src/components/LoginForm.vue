<template>
  <v-form ref="form">
    <v-container>
      <v-text-field
        label="User Name"
        v-model="l_userName"
        required
        :rules="l_rules.userName"
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="l_password"
        required
        :rules="l_rules.password"
      ></v-text-field>
      <v-row>
        <v-col>
          <p v-show="!authValid" class="red--text">
            Invalid username or password.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <div class="mt-"></div>
      </v-row>
      <v-row justify="end">
        <v-btn color="primary" @click.stop="login">Login</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    userName: { default: "" },
    password: { default: "" },
    authValid: { default: true },
    rules: {
      default: () => ({
        userName: [(v: any) => !!v || "User name is required."],
        password: [(v: any) => !!v || "Password is required."],
      }),
    },
  },

  data() {
    return {
      l_userName: this.userName,
      l_password: this.password,
      l_rules: this.rules,
    };
  },

  methods: {
    login() {
      const valid = (this.$refs as any).form.validate();
      if (valid) {
        this.$emit("login", {
          userName: this.l_userName,
          password: this.l_password,
        });
      }
    },
  },
});
</script>
