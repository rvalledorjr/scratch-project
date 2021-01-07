<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon large v-on="on" v-bind="attrs">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group>
        <v-list-item @click="emitEvent('createClass')">
          <v-list-item-content>
            Create a class
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="emitEvent('joinClass')">
          <v-list-item-content>
            Join a class
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    emitEvent(eventName: string) {
      this.$emit(eventName);
    },
  },
});
</script>
