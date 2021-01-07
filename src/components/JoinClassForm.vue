<template>
  <v-sheet class="pa-5">
    <v-tabs v-model="selectedTab" color="primary" grow>
      <v-tab class="text-capitalized">
        Connect manually
      </v-tab>
      <v-tab class="text-capitalized">
        Connect through QR
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="selectedTab" class="mt-3">
      <v-tab-item>
        <v-card outlined class="pa-5" height="300">
          <v-container>
            <v-row>
              <v-text-field
                label="Enter server IP address"
                placeholder="(ex: 192.168.1.2)"
                :disabled="disabled"
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                label="Enter class code"
                :disabled="disabled"
                outlined
              ></v-text-field>
            </v-row>
            <v-row justify="end" class="mt-10">
              <v-btn color="primary" class="" text @click="cancel"
                >Cancel</v-btn
              >
              <v-btn color="primary" text :loading="connected" @click="connect"
                >Connect</v-btn
              >
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
    connected: {
      default: false,
    },
  },
  data() {
    return { selectedTab: null };
  },
  computed: {
    disabled(): boolean {
      return this.connected;
    },
  },
  methods: {
    connect() {
      this.$emit("connect");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
});
</script>
