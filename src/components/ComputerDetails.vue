<template>
  <v-expansion-panels class="elementPanel">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h4>{{computer.name}}</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <ul>
          <li>Introduced : {{computer.introduced}}</li>
          <li>Discontinued : {{computer.discontinued}}</li>
          <li>Company : {{computer.company.name}}</li>
        </ul>
        <div class="buttonContainer">
          <v-btn color="primary" @click="sheet = !sheet" class="bottomButton">Modifier</v-btn>
          <v-bottom-sheet v-model="sheet">
            <v-sheet class="text-center" height="200px">
              <v-btn color="red" @click="sheet = !sheet">Close</v-btn>
              <EditElement style="editelement" />
            </v-sheet>
          </v-bottom-sheet>
          <v-btn color="error" class="bottomButton" @click="dialog = true">Supprimer</v-btn>
          <v-dialog v-model="dialog" max-width="300">
            <v-card>
              <v-card-title class="headline">Voulez vous supprimer cet ordinateur ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="error" @click="deleteComputer()">Oui</v-btn>

                <v-btn color="primary" @click="dialog = false">Non</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import EditElement from "./EditElement";
import { computerApi } from "../api/computer_api";

export default {
  name: "ComputerDetails",
  data: () => ({
    sheet: false,
    dialog: false
  }),
  components: { EditElement },
  props: { computer: Object },
  methods: {
    deleteComputer() {
      computerApi.deleteComputer(this.computer.id);
      // this.dialog = false;
    },
    editComputer() {
      //TODO Call API
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
