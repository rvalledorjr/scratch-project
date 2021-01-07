<template>
  <v-form ref="form">
    <v-container>
      <v-text-field
        label="First Name"
        v-model="l_user.firstName"
        required
        :rules="rules.firstName"
      ></v-text-field>
      <v-text-field
        label="Middle Name"
        v-model="l_user.middleName"
        required
        :rules="rules.middleName"
      ></v-text-field>
      <v-text-field
        label="Last Name"
        v-model="l_user.lastName"
        required
        :rules="rules.lastName"
      ></v-text-field>

      <v-row>
        <v-col xs="12" md="6">
          <v-text-field
            label="Extension Name"
            v-model="l_user.extensionName"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-text-field
        label="User Name"
        v-model="l_user.userName"
        required
        :rules="rules.userName"
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="l_user.password"
        required
        :rules="rules.password"
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="confirmPassword"
        required
        :rules="rules.confirmPassword"
      ></v-text-field>
      <v-row>
        <div class="mt-"></div>
      </v-row>
      <v-row justify="end">
        <v-btn color="primary" class="mt-10" @click.stop="save">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import { User } from "theta-core";
import Vue from "vue";

export default Vue.extend({
  props: {
    user: {
      default: () => new User(),
    },
    authValid: {
      default: true,
    },
  },

  data() {
    return {
      l_user: this.user,
      confirmPassword: "",
      rules: {
        firstName: [(v: any) => !!v || "First name is required."],
        middleName: [(v: any) => !!v || "Middle name is required."],
        lastName: [(v: any) => !!v || "Last name is required."],

        userName: [(v: any) => !!v || "User name is required."],
        password: [(v: any) => !!v || "Password is required."],
        confirmPassword: [
          (v: any) => !!v || "Please re-type your password.",
          (v: any) => v === this.user.password || "Passwords didn't match.",
        ],
      },
    };
  },

  methods: {
    save() {
      const valid = (this.$refs as any).form.validate();
      if (valid) {
        this.$emit("save", this.l_user);
      }
    },
  },
});
</script>
