<template>
  <v-expansion-panel>
    <v-expansion-panel-header disable-icon-rotate>
      <v-row align="baseline">
        <v-avatar color="primary" size="40">
          <v-icon dark>mdi-clipboard-text</v-icon>
        </v-avatar>
        <span class="ml-5 text-subtitle-1 font-weight-medium"
          >Activity Title</span
        >
        <span class="ml-auto mr-5">Posted on Dec. 3, 2020</span>
      </v-row>
      <template v-slot:actions>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon>
              <v-icon dark v-on="on">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group>
              <v-list-item>Edit</v-list-item>
              <v-list-item>Delete</v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="mx-n6">
      <v-row class="mx-5">
        <v-col cols="auto" class="flex-grow-1"><span>No due date</span></v-col>
        <v-divider class="my-5" vertical></v-divider>
        <v-col cols="2">
          <a @click.stop="">
            <div class="text-h3">0</div>
            <div class="subtitle-1">Turned-in</div>
          </a>
        </v-col>
        <v-divider class="my-5" vertical></v-divider>
        <v-col cols="2">
          <a @click.stop="">
            <div class="text-h3">0</div>
            <div class="subtitle-1">Assigned</div>
          </a>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mx-5 mt-3">
        <v-btn color="primary" rounded text elevation="0">
          <span class="text-capitalize">View Assessment</span>
        </v-btn>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped></style>
