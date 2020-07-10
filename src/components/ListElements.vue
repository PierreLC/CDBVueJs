<template>
  <div>
    <v-card class="searchCard">
      <v-row justify="center" align="center" class="rowTopElements">
        <v-select
          :items="dropdown_category"
          item-value="id"
          item-text="name"
          filled
          :label="$t('LIST.LABEL-CATEGORIES')"
          @change="changecategorie($event)"
          v-model="category"
          class="topcardElements"
        ></v-select>
        <v-text-field
          v-if="category !== '1'"
          v-model="elementSearch.search"
          @keydown.enter="search"
          :label="$t('LIST.LABEL-SEARCH')"
          clearable
        ></v-text-field>
        <v-select
          v-if="category !== '1'"
          :items="dropdown_numberelement"
          filled
          :label="$t('LIST.LABEL-NUMBER')"
          v-model="elementSearch.taillePage"
          class="topcardElements"
        ></v-select>
      </v-row>
      <v-row justify="center" align="center" v-if="category === '0'">
        <v-chip-group active-class="primary--text" v-model="elementSearch.order">
          <v-chip value="name">{{ $t("COMMONS.NAME") }}</v-chip>
          <v-chip value="introduced">{{ $t("COMMONS.INTRODUCED") }}</v-chip>
          <v-chip value="discontinued">{{ $t("COMMONS.DISCONTINUED") }}</v-chip>
          <v-chip value="company">{{ $t("COMMONS.COMPANY") }}</v-chip>
        </v-chip-group>
      </v-row>
      <div>
        <v-btn
          v-if="responceStatus !== ''"
          color="primary"
          @click="search"
          class="searchButton"
                    :disabled="isButtonClicked"

        >{{ $t("LIST.SEARCH") }} ({{numberElement}} {{ $t("LIST.RESULTS") }})</v-btn>
        <v-btn v-else color="primary" @click="search" class="searchButton" :disabled="isButtonClicked">{{ $t("LIST.SEARCH") }}</v-btn>
       
        <v-btn
          small
          @click="isDeleteRequired = !isDeleteRequired"
          class="deleteButton"
          v-if="isUrlInclude('/computers') && category === '0'"
          :disabled="isButtonClicked"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card>

    <v-row justify="center" align="center" v-if="isDeleteRequired && isUrlInclude('/computers')">
      <v-checkbox v-model="isCheckAll" @change="checkAll"></v-checkbox>
      <v-btn
        color="error"
        @click="deleteManyComputer"
        class="multiDeleteButton"
        :disabled="isButtonClicked"
      >Suppression multiple</v-btn>
    </v-row>
    <v-pagination
      v-model="elementSearch.pageIterator"
      :length="numberPage"
      @input="search()"
      v-if="numberPage && isUrlInclude('/computers') && category === '0'"
      :disabled="isButtonClicked"
    ></v-pagination>

    <div v-if="responceStatus === 200" class="elementsPanel">
      <div v-if="isUrlInclude('/computers')">
        <div v-for="(element, i) in elements" :key="i">
          <v-row justify="center" align="center" class="checkboxRow">
            <v-checkbox v-model="multiDelete" :value="element.id" v-if="isDeleteRequired"></v-checkbox>
            <ComputerDetails v-bind:computer="element" @clickRefresh="search" @computerId="deleteComputer($event)"/>
          </v-row>
        </div>
      </div>
      <div v-else-if="isUrlInclude('/companies')">
        <CompanyDetails v-for="(element, i) in elements" :key="i" v-bind:company="element" />
      </div>
      <div v-else>{{ $t("ERRORS.NOTHING-FOUND") }}</div>
    </div>
    <div v-else-if="isSearching" class="spinner">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-alert v-else-if="isAlertDisplay === true" type="warning" class="alert">{{ $t("ERRORS.INVALID-SEARCH") }}</v-alert>
    <v-alert v-else-if="isErrorAlertDisplay === true" type="error" class="alert">{{messageError}}</v-alert>

    <v-snackbar v-model="snackbar">
      Erreur de suppression
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="isSnackbar = false">Ok</v-btn>
      </template>
    </v-snackbar>
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
    isButtonClicked: false,
    isCheckAll: false,
    isSnackbar: false,
    multiDelete: [],
    elementSearch: {
      pageIterator: 1,
      taillePage: "",
      search: "",
      order: ""
    },
    dropdown_category: [
      { id: "0", name: "Ordinateurs"},
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
      this.isButtonClicked = true;
      this.isDeleteRequired = false;
      this.multiDelete = [];
      if (this.category == "0") {
        this.searchComputer();
      } else if (this.category == "1") {
        this.searchCompany();
      } else {
        this.isAlertDisplay = true;
        this.isSearching = false;
        this.isButtonClicked = false;
      }
    },
    deleteComputer(computerId){
      computerApi.delete(computerId);
      this.search();
    },
    searchComputer() {
      if (this.elementSearch.taillePage == "") {
        this.elementSearch.taillePage = "20";
      }
      if (this.elementSearch.search == null) {
        this.elementSearch.search = "";
      }
      if (this.elementSearch.order == undefined) {
        this.elementSearch.order = "";
      }
      computerApi
        .findAll(this.elementSearch)
        .then(responce => {
          this.numberElement = responce.data[0];
          this.elements = responce.data[1];
          this.responceStatus = responce.status;
          this.responceUrl = responce.config.url;
          this.isButtonClicked = false;
        })
        .catch(error => {
          this.messageError = error;
          this.isErrorAlertDisplay = true;
          this.isSearching = false;
          this.isButtonClicked = false;
        });
    },
    searchCompany() {
      companyApi
        .findAll()
        .then(responce => {
          this.elements = responce.data;
          this.responceStatus = responce.status;
          this.responceUrl = responce.config.url;
          this.isButtonClicked = false;
        })
        .catch(error => {
          this.messageError = error;
          this.isErrorAlertDisplay = true;
          this.isSearching = false;
          this.isButtonClicked = false;
        });
    },
    deleteManyComputer() {
      computerApi
        .deleteMulti(this.multiDelete)
        .then(this.search())
        .catch((this.isSnackbar = true));
    },
    changeCategorie(event) {
      this.alert = false;
      this.category = event;
      this.sortelement = "";
    },
    isUrlInclude(element) {
      return this.responceUrl.includes(element);
    },
    DefaultPage() {
      this.actualPage = 0;
    },
    checkAll() {
      if (this.isCheckAll) {
        for (var i = 0; i < this.elements.length; i++) {
          this.multiDelete.push(this.elements[i].id);
        }
      } else {
        this.multiDelete = [];
      }
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

.deleteButton {
  top: 2.5vh;
  background-color: white;
  float: right;
}

.multiDeleteButton {
  transition-duration: 1s;
  width: 100vh;
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
