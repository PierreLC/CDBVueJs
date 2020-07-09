<template>
  <div>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Computer name*"
                required
                hint="Please enter the name of the computer"
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
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-container>
                <v-menu
                  ref="menu"
                  :return-value.sync="introducedDateFormatted"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="3000px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      readonly
                      v-model="introducedDateFormatted"
                      :allowed-dates="allowedDates"
                      label="Introduced date"
                      hint="YYYY-MM-DD format"
                      v-bind="attrs"
                      @blur="date = parseDate(introducedDateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="computer.introduced"
                    @input="menu = false"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(computer.introduced)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-container>
            </v-col>

            <v-col cols="12" sm="6">
              <v-container>
                <v-menu
                  ref="menu2"
                  :return-value.sync="discontinuedDateFormatted"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="3000px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      readonly
                      v-model="discontinuedDateFormatted"
                      :allowed-dates="allowedDates"
                      label="Discontinued date"
                      hint="YYYY-MM-DD format"
                      v-bind="attrs"
                      @blur="date = parseDate(discontinuedDateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="computer.discontinued"
                    @input="menu2 = false"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(computer.discontinued)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="addElement()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { computerApi } from "../api/computer_api";
import { companyApi } from "../api/company_api";

export default {
  name: "AddElement",
  data: (vm) => ({
    menu: false,
    menu2: false,
    allowedDates: ["1971-01-01", "2037-01-01"],
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
    introducedDateFormatted: vm.formatDate(
      new Date().toISOString().substr(0, 10)
    ),
    discontinuedDateFormatted: vm.formatDate(
      new Date().toISOString().substr(0, 10)
    ),
  }),

  props: {},
  methods: {
    emitCloseAdd: function() {
      this.$emit("clickCloseAdd", false);
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
      var token = sessionStorage.getItem("token");
      companyApi.findAll(token).then((response) => {
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
    changeLang(lang) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
