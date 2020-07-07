<template>
  <div>
    <v-card class="searchCard">
      <v-row justify="center" align="center" class="rowTopElements">
        <v-select
          :items="dropdown_category"
          filled
          label="Catégories"
          @change="changecategorie($event)"
          v-model="category"
          class="topcardElements"
        ></v-select>
        <v-text-field v-model="searchfilter" label="Recherche" clearable class="searchBar"></v-text-field>
        <v-select
          :items="dropdown_numberelement"
          filled
          label="Nombre d'éléments"
          v-model="numberelement"
          class="topcardElements"
        ></v-select>
      </v-row>
      <v-row justify="center" align="center" v-if="category === 'Ordinateur'">
        <v-chip-group active-class="primary--text" v-model="sortelement">
          <v-chip>Nom</v-chip>
          <v-chip>Date de mise en service</v-chip>
          <v-chip>Date de fin de serivce</v-chip>
          <v-chip>Société</v-chip>
        </v-chip-group>
      </v-row>
      <v-row justify="center" align="center" v-if="category === 'Société'">
        <v-chip-group active-class="primary--text" v-model="sortelement">
          <v-chip>Nom</v-chip>
        </v-chip-group>
      </v-row>
      <div class>
        <v-btn color="primary" @click="search" class="searchButton">Rechercher</v-btn>
      </div>
    </v-card>

    <div v-for="(element, i) in lister" :key="i" class="elementsPanel">
      <div v-for="(elem, o) in element" :key="o">
        <ComputerDetails
          v-if="responceStatus === '200' && responceUrl === '\\computer'"
          v-bind:computer="elem"
        />
        <CompanyDetails
          v-else-if="responceStatus === '200' && responceUrl === '\\company'"
          v-bind:company="elem"
        />
        <div v-else>Error</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as data from "../MOCK/mockComputer";
import ComputerDetails from "./ComputerDetails";
import CompanyDetails from "./CompanyDetails";

export default {
  name: "ListElements",
  data: () => ({
    elements: Object,
    category: "",
    searchfilter: "",
    numberelement: "",
    sortelement: "",
    responceStatus: "200",
    responceUrl: "\\computer",
    dropdown_category: ["Ordinateur", "Société"],
    dropdown_numberelement: ["10", "50", "100"]
  }),
  components: { ComputerDetails, CompanyDetails },
  props: {},
  methods: {
    search() {
      //TODO Call API
    },
    changecategorie(event) {
      this.category = event;
      this.sortelement = "";
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
  text-align: center;
}

.rowTopElements {
  margin: 0 3px;
  padding-top: 3px;
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

.topcardElements {
  width: 18.6vw;
}

.searchBar {
  margin: 1vh;
}

.searchButton {
  top: 2.5vh;
}
</style>
