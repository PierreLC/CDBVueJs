<template>
  <div>
    <Header />
    <Connection />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Connection from '@/components/login-signin/Connection.vue';

export default {
  name: "Authentication",
  components: { Header, Connection },
};
</script>