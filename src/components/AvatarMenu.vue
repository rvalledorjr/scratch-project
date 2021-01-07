<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar size="40" color="black">
          <span class="white--text body-1">{{ user.firstNameInitial }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="viewProfile">
        <v-list-item-content>Profile</v-list-item-content>
      </v-list-item>
      <v-list-item @click.stop="exit">
        <v-list-item-content>Exit</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
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
  methods: {
    viewProfile() {
      this.$emit("viewProfile");
    },
    exit() {
      this.$emit("exit");
    }
  }
});
</script>
