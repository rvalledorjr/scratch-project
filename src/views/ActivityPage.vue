<template>
  <v-sheet>
    <v-container>
      <v-row justify="center">
        <v-col :md="8">
          <v-btn color="primary" large rounded class="text-capitalize">
            <v-icon>mdi-plus</v-icon>
            Create Assessment
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col :md="8">
          <v-expansion-panels focusable hover popout>
            <ActivityExpPanel />
            <ActivityExpPanel />
            <ActivityExpPanel />
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import ActivityExpPanel from "../components/ActivityExpPanel.vue";
export default Vue.extend({
  components: {
    ActivityExpPanel,
  },
});
</script>
