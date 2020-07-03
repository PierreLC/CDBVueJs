<template>
  <v-app>
    <div>
      <router-link to="/">Dashboard</router-link>|
      <router-link to="/Authentication">Authentication</router-link>
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
</style>
