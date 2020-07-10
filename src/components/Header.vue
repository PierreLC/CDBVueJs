<template>
  <div>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar prominent extended>
        <router-link to="/Dashboard">
          <v-btn class="header">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>

        <v-spacer></v-spacer>

        <v-row justify="center">
          <v-btn outlined color="indigo" dark @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>{{ $t("HEADER.ADD-COMPUTER") }}
          </v-btn>
          <v-dialog v-model="dialog" persistent>
            <v-card>
              <AddComputer @clickCloseAdd="emitCloseAdd" />
            </v-card>
          </v-dialog>
          <v-btn
            outlined
            color="indigo"
            dark
            @click="CompanyModal = !CompanyModal"
          >
            <v-icon>mdi-plus</v-icon>{{ $t("HEADER.ADD-COMPANY") }}
          </v-btn>
          <v-dialog v-model="CompanyModal" persistent>
            <v-card>
              <AddCompany @clickeModal="emitBoolClose" />
            </v-card>
          </v-dialog>
        </v-row>

        <div class="languagesDiv">
          <v-menu top offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="languagesButton" v-bind="attrs" v-on="on"
                >mdi-earth</v-icon
              >
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
        </div>

        <v-icon class="notificationsButton">mdi-bell</v-icon>

        <router-link to="/Authentication">
          <v-icon class="logoutButton">mdi-account</v-icon>
        </router-link>
      </v-toolbar>
    </v-card>
    <div class="roundedDiv"></div>
  </div>
</template>

<script>
import AddCompany from "./AddCompany";
import AddComputer from "./AddComputer";

export default {
  name: "Header",

  data: () => ({
    CompanyModal: false,
    dialog: false,
    langs: ["fr", "en"],
  }),

  props: {},
  components: { AddCompany, AddComputer },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
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

.roundedDiv {
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
