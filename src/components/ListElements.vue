<template>
  <div>
    <v-card class="searchCard">
       <v-row justify="center" align="center">
        <v-select :items="dropdown_categories" filled label="Catégories" dense v-model="categories"></v-select>
        <v-text-field v-model="searchfilter" label="Recherche" clearable dense></v-text-field>
        <v-select :items="dropdown_numberelement" filled label="Nombre d'éléments" dense></v-select>
      </v-row>
      <v-row justify="center" align="center" v-if="categories = 'Ordinateur'">
          <v-chip draggable>Nom</v-chip>
          <v-chip draggable>Date de mise en service</v-chip>
          <v-chip draggable>Date de fin de serivce</v-chip>
          <v-chip draggable>Société</v-chip>
        </v-row>
        <v-row justify="center" align="center" v-if="categories = 'Société'">
          <v-chip draggable>Nom</v-chip>
        </v-row>
      <v-btn color="primary" @click="search">Rechercher</v-btn>
    </v-card>
    <div v-for="(element, i) in lister" :key="i" class="elementsPanel">
      <div v-for="(elem, o) in element" :key="o">
        <v-expansion-panels class="elementPanel">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h4>{{elem.name}}</h4>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul v-if="elem.introduced">
                <li>Introduced : {{elem.introduced}}</li>
                <li>Discontinued : {{elem.discontinued}}</li>
                <li>Company : {{elem.company.name}}</li>
              </ul>
              <v-btn color="primary" @click="sheet = !sheet">Edit</v-btn>
              <v-bottom-sheet v-model="sheet">
                <v-sheet class="text-center" height="200px">
                  <v-btn color="red" @click="sheet = !sheet">Close</v-btn>
                  <EditElement style="editelement" />
                  <!--TODO Commande pour installation du front-->
                </v-sheet>
              </v-bottom-sheet>
              <v-btn color="error">Delete</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import * as data from "../MOCK/mockComputer";
import EditElement from "./EditElement";

export default {
  name: "ListElements",
  data: () => ({
    sheet: false,
    elements: Object,
    dropdown_categories: ["Ordinateur" ,"Société"],
    dropdown_numberelement: ["10", "50", "100"],
    searchfilter: "",
    categories: "",
    numberelement: "",
  }),
  components: { EditElement },
  props: {},
  methods: {
    search() {
    }
  },
  computed: {
    lister() {
      return data;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchCard {
  margin: 4vh 15vw;
}

.elementsPanel {
  margin: 0 20vw;
}

.elementPanel {
  margin-top: 1vh;
}

.editelement {
  margin-bottom: 3vw;
}
</style>
