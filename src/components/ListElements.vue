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
        <v-text-field v-model="computerSeach.search" @keydown.enter="search" label="Recherche" clearable class="searchBar"></v-text-field>
        <v-select
          :items="dropdown_numberelement"
          filled
          label="Nombre d'éléments"
          v-model="computerSeach.taillePage"
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
    <div v-if="responceStatus === 200" class="elementsPanel">
      <div v-if="isUrlInclude('/computers')">
        <ComputerDetails v-for="(element, i) in elements" :key="i" v-bind:computer="element" />
      </div>
      <div v-else-if="isUrlInclude('/companies')">
        <CompanyDetails v-for="(element, i) in elements" :key="i" v-bind:company="element" />
      </div>
      <div v-else>Error Nothing Found</div>
    </div>
    <div v-else class="spinner">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import ComputerDetails from "./ComputerDetails";
import CompanyDetails from "./CompanyDetails";
import { computerApi } from "../api/computer_api.js";
//import { companyApi } from "../api/company_api.js";

export default {
  name: "ListElements",
  data: () => ({
    elements: Object,
    category: "",
    sortelement: "",
    responceStatus: "",
    responceUrl: "",
    computerSeach: {
      pageIterator: "",
      taillePage: "",
      search: "",
      order: ""
    },
    dropdown_category: ["Ordinateur", "Société"],
    dropdown_numberelement: ["10", "50", "100"]
  }),
  components: { ComputerDetails, CompanyDetails },
  props: {},
  methods: {
    search() {
      if(this.category == 'Ordinateur') {
      this.searchComputer();
      } else if (this.category == 'Société') {
        this.searchCompany();
      } else {
        //Error
      }
    },
    searchComputer() {
      var token = sessionStorage.getItem("token");
      computerApi.findAll(token, this.computerSeach).then(responce => {
        this.elements = responce.data;
        this.responceStatus = responce.status;
        this.responceUrl = responce.config.url;
      });
    },
    searchCompany() {},
    changecategorie(event) {
      this.category = event;
      this.sortelement = "";
    },
    isUrlInclude(element) {
      return this.responceUrl.includes(element);
    },
  },
  computed: {},
  mounted() {
    this.search();
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

.spinner {
  text-align: center;
  margin-top: 5%;
}
</style>
