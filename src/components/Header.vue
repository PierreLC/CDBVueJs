<template>
  <div>
    <v-card color="grey lighten-4" flat height="200px" tile>
      <v-toolbar prominent extended>
        <router-link to="/">
          <v-btn class="dashboard">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>

        <v-spacer></v-spacer>

        <v-row justify="center">
          <v-btn outlined color="indigo" dark @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>Add Computer
          </v-btn>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <AddElement  @clickCloseAdd="emitCloseAdd"/>
            </v-card>
          </v-dialog>
          <v-btn
            outlined
            color="indigo"
            dark
            @click="CompanyModal = !CompanyModal"
          >
            <v-icon>mdi-plus</v-icon>Add Company
          </v-btn>
          <v-dialog v-model="CompanyModal" persistent max-width="290">
            <v-card>
              <AddCompany @clickeModal="emitBoolClose" />
            </v-card>
          </v-dialog>
        </v-row>

        <v-btn-toggle name="language" tile color="deep-purple accent-3" group>
          <div class="languages">
            <v-menu>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                      :value="1"
                    >
                      <!-- <span v-if="this.language === 'fr'">Français</span>
                      <span v-if="this.language === 'en'">English</span> -->
                      <v-icon>mdi-earth</v-icon>
                    </v-btn>
                  </template>
                  <span>Select your language</span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item
                  v-for="(language, index) in languages"
                  :key="index"
                  @click="changeLang()"
                >
                  <v-list-item-title>{{ language.icon }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <div class="notifications">
              <v-btn :value="2">
                <v-icon>mdi-bell</v-icon>
              </v-btn>
            </div>

            <div class="personButton">
              <router-link to="/Authentication">
                <v-btn :value="3">
                  <v-icon>mdi-account</v-icon>
                </v-btn>
              </router-link>
            </div>
          </div>
        </v-btn-toggle>
      </v-toolbar>
    </v-card>
    <div class="LBC"></div>
  </div>
</template>

<script>
import { frenchFlag } from "../assets/images/fr-flag.png";
import { englishFlag } from "@/assets/images/en-flag.png";
import AddCompany from "./AddCompany";
import AddElement from "./AddElement";

export default {
  name: "Header",

  data: () => ({
    CompanyModal: false,
    dialog: false,

    language: "fr",
    languages: [
      { locale: "fr", icon: frenchFlag, title: "Français" },
      { locale: "en", icon: englishFlag, title: "English" },
    ],
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
  },
};
</script>

<style scoped>
.dashboard {
  position: absolute;
  text-align: center;
}

.LBC {
  position: relative;
  background-color: #3b5998;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 150px;
  width: auto;
  border-radius: 0 0 50% 50%/0 0 100% 100%;
}

.addButton {
  text-decoration-color: white;
}
</style>
