<template>
  <v-sheet class="pa-5">
    <v-tabs v-model="selectedTab" color="primary" grow>
      <v-tab class="text-capitalized">
        Class Info
      </v-tab>
      <v-tab class="text-capitalized">
        Class Info QR Code
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="selectedTab" class="mt-3">
      <v-tab-item>
        <v-card outlined class="pa-5" height="300">
          <v-container>
            <v-row>
              <v-text-field
                v-model="serverAddress"
                class="text-h4"
                height="50"
                label="Server address"
                readonly
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="code"
                class="text-h4 red--text"
                height="50"
                label="Class code"
                readonly
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card outlined class="pa-5" height="300">
          QR
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    serverAddress: {
      default: "http://localhost:5984",
    },
    code: {
      default: "xxxx",
    },
  },
  data() {
    return { selectedTab: null };
  },
});
</script>
