<template>
  <div class="header">
    <v-card class="headerCard" flat tile>
      <v-toolbar class="headerToolbar">
        <router-link to="/">
          <v-btn class="homeButton">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>

        <v-spacer></v-spacer>

        <v-row justify="center">
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="addButton" outlined v-bind="attrs" v-on="on">
                <v-icon class="plusIcon">mdi-plus</v-icon>
                <p class="addText">{{ $t("HEADER.ADD") }}</p>
              </v-btn>
            </template>
            <v-card>
              <v-card-title> </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Computer name*"
                        required
                        hint="Enter the name of the computer"
                        v-model="computer.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        label="Companies*"
                        v-model="id"
                        :items="companies"
                        item-value="id"
                        item-text="name"
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-container>
                        <v-row>
                          <v-menu
                            ref="menu"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="3000px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dateFormatted"
                                label="Introduced date"
                                hint="MM/DD/YYYY format"
                                :allowed-dates="allowedDates"
                                v-bind="attrs"
                                @blur="date = parseDate(dateFormatted)"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="computer.introduced"
                              no-title
                              @input="menu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-row>
                      </v-container>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-container>
                        <v-row>
                          <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="3000px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dateFormatted"
                                label="Discontinued date"
                                hint="MM/DD/YYYY format"
                                v-bind="attrs"
                                @blur="date = parseDate(dateFormatted)"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="computer.discontinued"
                              no-title
                              @input="menu = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false"
                  >Close</v-btn
                >
                <v-btn color="blue darken-1" text @click="addComputer()">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-item group class="rightButtons">
          <v-container>
            <div class="languagesDiv">
              <v-menu top offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-earth</v-icon>
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

            <div class="notificationsDiv">
              <v-icon class="notificationsButton">mdi-bell</v-icon>
            </div>

            <div class="logoutDiv">
              <router-link to="/Authentication">
                <v-icon class="logoutButton">mdi-account</v-icon>
              </router-link>
            </div>
          </v-container>
        </v-item>
      </v-toolbar>
    </v-card>
    <div class="roundedCard"></div>
  </div>
</template>

<script>
import { companyApi } from "../api/company_api";
import { computerApi } from "../api/computer_api";

export default {
  name: "Header",

  data: (vm) => ({
    langs: ["fr", "en"],
    CompanyModal: false,
    companies: [],
    company: {},
    id: 0,
    computer: {
      name: "",
      introduced: "",
      discontinue: "",
      company: "",
    },
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false,
    dialog: false,
    allowedDates: ["1971-01-01", "2037-01-01"],
  }),

  props: {},
  methods: {
    addComputer() {
      var company = { id: this.id, name: "" };
      const computer = {
        name: this.computer.name,
        introduced: this.computer.introduced,
        discontinued: this.computer.discontinued,
        company: company,
      };
      computerApi.create(computer);
    },

    findCompanies() {
      companyApi.findAll().then((response) => {
        this.companies = response.data;
      });
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },

    allowedDate: (val) => parseInt(val.split("-")[2], 10) % 2 === 0,

    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    changeLang(lang) {
      console.log(lang);
      this.$i18n.locale = lang;
    },
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    options: () => this.name,
  },

  mounted() {
    this.findCompanies();
  },
};
</script>

<style scoped>
.header {
  position: relative;
  margin-bottom: 2%;
}

.roundedCard {
  position: relative;
  background-color: #3b5998;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 150px;
  width: auto;
  border: 1px solid #3b5998;
  border-radius: 0 0 50% 50%/0 0 100% 100%;
}

.headerCard {
}

.headerToolbar {
  height: 70px;
}

.homeButton {
  position: absolute;
  justify-content: center;
  display: flex;
  left: 5%;
  top: 20%;
}

.addButton {
  border: 2px solid #3b5998;
  position: absolute;
  top: 20%;
  bottom: 50%;
  left: 45%;
  right: 50%;
  color: #3b5998;
  text-align: center;
  text-decoration-color: #3b5998;
}

.addText {
  margin-top: 17.5%;
  text-align: center;
  color: #3b5998;
}

.plusIcon {
  color: white;
}

.rightButtons {
  position: absolute;
  justify-content: right;
  display: flex;
  right: 6%;
  top: 1%;
}

.languagesButton {
}

.notificationsButton {
  margin-left: 50%;
}

.logoutButton {
  margin-left: 100%;
  transform: scale(0.8, 0.8, 0.8);
}
</style>
