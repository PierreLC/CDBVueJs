<template>
  <div>
    <Header />
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
