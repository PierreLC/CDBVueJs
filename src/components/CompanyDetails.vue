<template>
  <v-expansion-panels class="elementPanel">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h4>{{company.name}}</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="buttonContainer">
          <v-btn color="error" class="bottomButton" @click="dialog = true">{{ $t("DETAILS.DELETE") }}</v-btn>
          <v-dialog v-model="dialog" max-width="300">
            <v-card>
              <v-card-title class="headline">{{ $t("DETAILS.DELETE-QUESTION-COMPANY") }}</v-card-title>
              <v-card-actions>
                <v-btn color="error" @click="deleteCompany">{{ $t("COMMONS.YES") }}</v-btn>
                <v-btn color="primary" @click="dialog = false">{{ $t("COMMONS.NO") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "CompanyDetails",
  data: () => ({
    dialog: false
  }),
  props: { company: Object },
  methods: {
    deleteCompany() {
      //TODO Call API
      this.dialog = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttonContainer {
  text-align: right;
}

.bottomButton {
  margin-right: 1%;
}
</style>
