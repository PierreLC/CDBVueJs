<template>
  <div>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar prominent extended>
        <router-link to="/">
          <v-btn class="dashboard">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>

        <v-spacer></v-spacer>

        <v-row justify="center">
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="indigo" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
                Add Element
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
                        hint="example of helper text only on focus"
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
                            v-model="menu"
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
                            ref="menu1"
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
                              @input="menu1 = false"
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
                <v-btn color="blue darken-1" text @click="addElement()">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-btn-toggle
          name="rightButtons"
          tile
          color="deep-purple accent-3"
          group
        >
          <!-- <div class="languages"> -->
          <!-- <v-menu>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                      :value="1"
                    >
                      <span v-if="this.language === 'fr'">Français</span>
                      <span v-if="this.language === 'en'">English</span>
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
            </v-menu> -->
          <div id="languages">
            <p>{{ $t("Hello") }} - {{ $t("Welcome") }}</p>
            <p>
              <select v-model="$i18n.locale">
                <option value="fr">fr</option>
                <option value="en">en</option>
              </select>
            </p>
          </div>

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
        </v-btn-toggle>
      </v-toolbar>
    </v-card>
    <div class="LBC"></div>
  </div>
</template>

<script>
import { companyApi } from "../api/company_api";
import { computerApi } from "../api/computer_api";

export default {
  name: "Header",

  data: (vm) => ({
    // language: "fr",
    // languages: [
    //   { locale: "fr", icon: frenchFlag, title: "Français" },
    //   { locale: "en", icon: englishFlag, title: "English" },
    // ],
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
    menu1: false,
    dialog: false,
  }),

  props: {},

  methods: {
    changeLang(index) {
      this.locale = this.languages[index].locale;
    },

    addElement() {
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

    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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
.dashboard {
  position: absolute;
  text-align: center;
}

.LBC {
  position: absolute;
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
