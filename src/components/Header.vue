<template>
  <div class="mainElement">
    <v-row align="center" justify="center">
      <v-col class="rowDisplayCenter">
        <router-link to="/Dashboard" v-if="token">
          <v-btn class="headerButton logoButton"></v-btn>
        </router-link>

        <router-link to="/" v-else>
          <v-btn class="headerButton logoButton"></v-btn>
        </router-link>
      </v-col>

      <v-col class="rowDisplayCenter">
        <div v-if="actualRoute !== 'Authentication'">
          <v-btn outlined color="indigo" dark @click="dialog = !dialog" class="headerButton">
            <v-icon>mdi-plus</v-icon>
            {{ $t("HEADER.ADD") }}
          </v-btn>
          <v-dialog v-model="dialog" persistent>
            <v-card>
              <AddElement @clickCloseAdd="emitCloseAdd" />
            </v-card>
          </v-dialog>
          <v-btn
            outlined
            color="indigo"
            dark
            @click="CompanyModal = !CompanyModal"
            class="headerButton"
          >
            <v-icon>mdi-plus</v-icon>Add Company
          </v-btn>
          <v-dialog v-model="CompanyModal" persistent>
            <v-card>
              <AddCompany @clickeModal="emitBoolClose" />
            </v-card>
          </v-dialog>
        </div>
      </v-col>

      <v-col class="rowDisplayRight">
        <v-menu top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="headerButton" fab small light>
              <v-icon v-bind="attrs" v-on="on">mdi-earth</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(lang, i) in langs"
              :key="`Lang${i}`"
              :value="lang"
              @click="changeLang(lang)"
            >
              <v-list-item-title>{{ lang }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn color="headerButton" fab small light>
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn color="headerButton" @click="logout" fab small light>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div class="LBC"></div>
  </div>
</template>

<script>
import AddCompany from "./AddCompany";
import AddElement from "./AddElement";

export default {
  name: "Header",

  data: () => ({
    CompanyModal: false,
    dialog: false,
    langs: ["fr", "en"],
    actualRoute: "",
    token: ""
  }),

  props: {},
  components: { AddCompany, AddElement },
  methods: {
    changeLang(index) {
      this.locale = this.languages[index].locale;
    },
    emitBoolClose(value) {
      this.CompanyModal = value;
    },
    emitCloseAdd(value) {
      this.dialog = value;
    },
    logout() {
      sessionStorage.removeItem("token");
      if (this.$router.currentRoute.name != "Authentication") {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    this.actualRoute = this.$router.currentRoute.name;
    this.token = sessionStorage.getItem("token");
  }
};
</script>

<style scoped>
.mainElement {
  background-color: #3b5998;
}

.rowDisplayCenter {
  text-align: center;
}

.rowDisplayRight {
  text-align: right;
  margin-right: 1%;
}

.logoButton {
  width: 13vw;
  height: 40px !important;
  background-image: url(../assets/cdblogo_blank.png);
  background-size: contain;
  background-position: center;
}

.headerButton {
  margin: 1%;
  background-color: #f5f5f5;
  color: #3b5998;
}

.LBC {
  position: absolute;
  background-color: #3b5998;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 15vw;
  max-height: 150px;
  width: auto;
  border-radius: 0 0 50% 50%/0 0 100% 100%;
}
</style>
