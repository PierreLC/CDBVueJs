<template>
  <div>
    <v-card class="searchCard">
      <v-row justify="center" align="center" class="rowTopElements">
        <v-select
          :items="dropdown_category"
          item-value="id"
          item-text="name"
          filled
          label="Catégories"
          @change="changecategorie($event)"
          v-model="category"
          class="topcardElements"
        ></v-select>
        <v-text-field
          v-if="category !== '1'"
          v-model="elementSearch.search"
          @keydown.enter="search"
          label="Recherche"
          clearable
        ></v-text-field>
        <v-select
          v-if="category !== '1'"
          :items="dropdown_numberelement"
          filled
          label="Nombre d'éléments"
          v-model="elementSearch.taillePage"
          class="topcardElements"
        ></v-select>
      </v-row>
      <v-row justify="center" align="center" v-if="category === '0'">
        <v-chip-group active-class="primary--text" v-model="elementSearch.order">
          <v-chip value="name">Nom</v-chip>
          <v-chip value="introduced">Date de mise en service</v-chip>
          <v-chip value="discontinued">Date de fin de serivce</v-chip>
          <v-chip value="company">Société</v-chip>
        </v-chip-group>
      </v-row>
      <div class>
        <v-btn color="primary" @click="search" class="searchButton">Rechercher</v-btn>
      </div>
    </v-card>

    <v-pagination
      v-model="elementSearch.pageIterator"
      :length="numberPage"
      @input="search()"
      v-if="numberPage && isUrlInclude('/computers') && category === '0'"
    ></v-pagination>

    <div v-if="responceStatus === 200" class="elementsPanel">
      <div v-if="isUrlInclude('/computers')">
        <ComputerDetails v-for="(element, i) in elements" :key="i" v-bind:computer="element" />
      </div>
      <div v-else-if="isUrlInclude('/companies')">
        <CompanyDetails v-for="(element, i) in elements" :key="i" v-bind:company="element" />
      </div>
      <div v-else>Error Nothing Found</div>
    </div>
    <div v-else-if="searching" class="spinner">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-alert v-else-if="errorAlert === true" type="error" class="alert">{{messageError}}</v-alert>
    <v-alert v-else-if="alert === true" type="warning" class="alert">Recherche invalide</v-alert>
  </div>
</template>

<script>
import ComputerDetails from "./ComputerDetails";
import CompanyDetails from "./CompanyDetails";
import { computerApi } from "../api/computer_api.js";
import { companyApi } from "../api/company_api.js";

export default {
  name: "ListElements",
  data: () => ({
    elements: Object,
    category: "",
    responceStatus: "",
    responceUrl: "",
    searching: false,
    alert: false,
    errorAlert: false,
    messageError: "",
    numberElement: 100,
    elementSearch: {
      pageIterator: 1,
      taillePage: "",
      search: "",
      order: ""
    },
    dropdown_category: [
      { id: "0", name: "Ordinateur" },
      { id: "1", name: "Société" }
    ],
    dropdown_numberelement: ["10", "50", "100"]
  }),
  components: { ComputerDetails, CompanyDetails },
  props: {},
  methods: {
    search() {
      this.searching = true;
      this.alert = false;
      this.errorAlert = true;
      if (this.category == "0") {
        this.searchComputer();
      } else if (this.category == "1") {
        this.searchCompany();
      } else {
        this.alert = true;
        this.searching = false;
      }
    },
    searchComputer() {
      var token = sessionStorage.getItem("token");
      console.info(this.elementSearch);

      computerApi
        .findAll(token, this.elementSearch)
        .then(responce => {
          this.elements = responce.data;
          this.responceStatus = responce.status;
          this.responceUrl = responce.config.url;
        })
        .catch(error => {
          this.messageError = error;
          this.errorAlert = true;
          this.searching = false;
        });
    },
    searchCompany() {
      var token = sessionStorage.getItem("token");
      companyApi
        .findAll(token)
        .then(responce => {
          this.elements = responce.data;
          this.responceStatus = responce.status;
          this.responceUrl = responce.config.url;
        })
        .catch(error => {
          this.messageError = error;
          this.errorAlert = true;
          this.searching = false;
        });
    },
    changecategorie(event) {
      this.alert = false;
      this.category = event;
      this.sortelement = "";
    },
    isUrlInclude(element) {
      return this.responceUrl.includes(element);
    },
    DefaultPage() {
      this.actualPage = 0;
    }
  },
  computed: {
    numberPage() {
      if (this.elementSearch.taillePage && this.numberElement) {
        return this.numberElement / this.elementSearch.taillePage;
      } else {
        this.DefaultPage();

        return 0;
      }
    }
  },
  mounted() {}
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
  margin: 1vh;
}

.searchButton {
  top: 2.5vh;
}

.spinner {
  text-align: center;
  margin-top: 5%;
}

.alert {
  margin: 5%;
}
</style>
