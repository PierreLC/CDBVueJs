<template>
  <div>
    <Header />
    <Registration />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Registration from '@/components/login-signin/Registration.vue';

export default {
  name: "Authentication",
  components: { Header, Registration },
};
</script>