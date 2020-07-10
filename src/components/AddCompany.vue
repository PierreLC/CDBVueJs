<template>
  <div>
    <v-card>
      <v-card-text>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="company name*" required hint="Apple" v-model="company.name"></v-text-field>
        </v-col>
      </v-card-text>

      <v-card-actions>
        <v-row justify="end">
          <v-btn color="blue darken-1" text @click="emitBoolClose">
            {{
            $t("DETAILS.CLOSE")
            }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="addCompany()">{{ $t("COMMONS.SAVE") }}</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { companyApi } from "../api/company_api";

export default {
  name: "AddCompany",

  data: () => ({
    company: {
      name: ""
    }
  }),
  props: {},
  methods: {
    emitBoolClose: function() {
      this.$emit("clickeModal", false);
    },
    addCompany() {
      companyApi.create(this.company).then(this.$emit("clickeModal", false));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
