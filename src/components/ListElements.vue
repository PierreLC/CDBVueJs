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
      <div>
        <v-btn
          v-if="responceStatus !== ''"
          color="primary"
          @click="search"
          class="searchButton"
        >Rechercher ({{numberElement}} Resultats)</v-btn>
        <v-btn v-else color="primary" @click="search" class="searchButton">Rechercher</v-btn>
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
        <div v-for="(element, i) in elements" :key="i">
          <v-row justify="center" align="center" class="checkboxRow">
            <v-checkbox v-model="multiDelete" :value="element.id" v-if="isDeleteRequired"></v-checkbox>
            <ComputerDetails v-bind:computer="element" @clickRefresh="search"/>
          </v-row>
        </div>
      </div>
      <div v-else-if="isUrlInclude('/companies')">
        <CompanyDetails v-for="(element, i) in elements" :key="i" v-bind:company="element" />
      </div>
      <div v-else>Errer rien trouvé</div>
    </div>
    <div v-else-if="isSearching" class="spinner">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-alert v-else-if="isAlertDisplay === true" type="warning" class="alert">Recherche invalide</v-alert>
    <v-alert v-else-if="isErrorAlertDisplay === true" type="error" class="alert">{{messageError}}</v-alert>
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
    isSearching: false,
    isAlertDisplay: false,
    isErrorAlertDisplay: false,
    messageError: "",
    numberElement: 0,
    isDeleteRequired: false,
    multiDelete: [],
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
    dropdown_numberelement: ["10", "20", "50", "100"]
  }),
  components: { ComputerDetails, CompanyDetails },
  props: {},
  methods: {
    search() {
      this.isSearching = true;
      this.isAlertDisplay = false;
      this.isErrorAlertDisplay = true;
      if (this.category == "0") {
        this.searchComputer();
      } else if (this.category == "1") {
        this.searchCompany();
      } else {
        this.isAlertDisplay = true;
        this.isSearching = false;
      }
    },
    searchComputer() {
      var token = sessionStorage.getItem("token");
      if (this.elementSearch.taillePage == "") {
        this.elementSearch.taillePage = "20";
      }
      if (this.elementSearch.search == null) {
        this.elementSearch.search = "";
      }
      computerApi
        .findAll(token, this.elementSearch)
        .then(responce => {
          this.numberElement = responce.data[0];
          this.elements = responce.data[1];
          this.responceStatus = responce.status;
          this.responceUrl = responce.config.url;
        })
        .catch(error => {
          this.messageError = error;
          this.isErrorAlertDisplay = true;
          this.isSearching = false;
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
          this.isErrorAlertDisplay = true;
          this.isSearching = false;
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
        return Math.ceil(this.numberElement / this.elementSearch.taillePage);
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

.topcardElements {
  width: 18.6vw;
  margin: 1vh;
}

.elementsPanel {
  margin: 0 20vw;
}

.editelement {
  margin-bottom: 3vw;
}

.searchButton {
  top: 2.5vh;
}

.checkboxRow {
  flex-wrap: nowrap;
  margin-top: 1vh;
}

.spinner {
  text-align: center;
  margin-top: 5%;
}

.alert {
  margin: 5%;
}
</style>
