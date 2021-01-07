<template>
  <v-card outlined rounded>
    <v-list-item>
      <v-list-item-avatar color="primary">
        <v-icon dark>mdi-clipboard-text</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <span class="text-h7 font-weight-regular"> {{ people.fullName }} </span>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group>
              <v-list-item>
                View Profile
              </v-list-item>
              <v-list-item>
                Remove
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Student } from "theta-core";
export default Vue.extend({
  props: {
    people: {
      default: () => {
        return {
          firstNameInitial: "",
          fullName: "",
        };
      },
    },
  },
});
</script>
