<template>
  <div>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        label="company name*"
        required
        hint="Apple"
        v-model="company.name"
      ></v-text-field>
    </v-col>
    <div class="rightButtons">
    <v-btn color="blue darken-1" text @click="emitBoolClose">{{
      $t("DETAILS.CLOSE")
    }}</v-btn>
    <v-btn color="blue darken-1" text @click="addCompany()">
      {{ $t("DETAILS.EDIT") }}
    </v-btn>
    </div>
  </div>
</template>

<script>
import { companyApi } from "../api/company_api";

export default {
  name: "AddCompany",

  data: () => ({
    company: {
      name: "",
    },
  }),
  props: {},
  methods: {
    emitBoolClose: function() {
      this.$emit("clickeModal", false);
    },
    addCompany() {
      companyApi.create(this.company);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
</style>
