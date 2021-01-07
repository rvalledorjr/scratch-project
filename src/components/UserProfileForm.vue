<template>
  <v-form ref="form" class>
    <v-container>
      <h1 class="headline mb-8">Setup your basic info</h1>
      <v-text-field
        v-model="localUser.firstName"
        label="First Name"
        :rules="rule.firstName"
        required
      ></v-text-field>
      <v-text-field
        v-model="localUser.middleName"
        label="Middle Name"
        :rules="rule.middleName"
        required
      ></v-text-field>
      <v-text-field v-model="localUser.lastName" label="Last Name" :rules="rule.lastName" required></v-text-field>
      <v-text-field v-model="localUser.extensionName" label="Extension Name"></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :rules="rule.password"
        required
      ></v-text-field>
      <v-text-field
        v-model="retypePassword"
        label="Retype Password"
        type="password"
        :rules="rule.retypePassword"
        required
      ></v-text-field>
      <v-row class="mt-5 justify-end">
        <v-btn color="grey lighten-2" tile depressed class @click.stop="cancel">Cancel</v-btn>
        <v-btn color="primary" tile depressed class="ml-5" @click.stop="save">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "theta-core";
export default Vue.extend({
  props: {
    user: {
      default: () => new User()
    }
  },
  data() {
    return {
      localUser: new User(),
      password: "",
      retypePassword: "",
      rule: {
        firstName: [(v: any) => !!v || "First name is required. "],
        lastName: [(v: any) => !!v || "Last name is required. "],
        middleName: [(v: any) => !!v || "Middle name is required. "],
        password: [(v: any) => !!v || "Password is required. "],
        retypePassword: [
          (v: any) => !!v || "Password is required. ",
          (v: any) => v === this.$props.user.password || "Password must match."
        ]
      }
    };
  },
  watch: {
    user: {
      handler(nv, ov) {
        if (nv === ov) return;

        (this.localUser as User).updateState(nv);
      },
      immediate: true
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save", this.localUser);
    }
  }
});
</script>
