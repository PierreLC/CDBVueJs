<template>
  <v-expansion-panels class="elementPanel">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h4>{{computer.name}}</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ul>
          <li>{{ $t("COMMONS.INTRODUCED") }} {{computer.introduced}}</li>
          <li>{{ $t("COMMONS.DISCONTINUED") }} {{computer.discontinued}}</li>
          <li>{{ $t("COMMONS.COMPANY") }} {{computer.company.name}}</li>
        </ul>
        <div class="buttonContainer">
          <v-btn color="primary" @click="sheet = !sheet" class="bottomButton">{{ $t("DETAILS.EDIT") }}</v-btn>
          <v-dialog v-model="sheet">
            <v-sheet class="text-center">
              <EditComputer style="editelement" v-bind:computerToEdit="computer" @clickCloseEdit="emitCloseEdit"/>
            </v-sheet>
          </v-dialog>
          <v-btn color="error" class="bottomButton" @click="dialog = true">{{ $t("DETAILS.DELETE") }}</v-btn>
          <v-dialog v-model="dialog" max-width="300">
            <v-card>
              <v-card-title class="headline">{{ $t("DETAILS.DELETE-QUESTION") }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" @click="dialog = false">{{ $t("COMMONS.NO") }}</v-btn>

                <v-btn color="error" @click="deleteComputer(), dialog=false">{{ $t("COMMONS.YES") }}</v-btn>

              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import EditComputer from "./EditComputer";

export default {
  name: "ComputerDetails",
  data: () => ({
    sheet: false,
    dialog: false
  }),
  components: { EditComputer },
  props: { computer: Object },
  methods: {
    deleteComputer() {
      this.$emit('computerId', this.computer.id);
    },
    emitCloseEdit(value){
      this.sheet=value;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.elementPanel {
  margin-top: 1vh;
}

.buttonContainer {
  text-align: right;
}

.bottomButton {
  margin-right: 1%;
}
</style>
