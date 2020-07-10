<template>
  <div>
    <Header />
    <v-spacer style="margin-top: 10vh;"></v-spacer>
    <ListElements />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ListElements from "@/components/ListElements.vue";

export default {
  name: "Dashboard",
  components: { Header, ListElements }
};
</script>
