<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-icon icon="mdi-rugby" />

        JAPAN Rugby Statistics - datairoro

      </v-app-bar-title>

    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>
