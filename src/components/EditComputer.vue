<template>
  <div>
    <div>{{ $t("EDIT.COMPUTER") }}</div>
    <div>
      <v-card ref="addComputerForm">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  ref="name"
                  v-model="computer.name"
                  :rules="[
                    () => !!computer.name || 'this field is required',
                    () =>
                      computer.name.length <= 255 ||
                      'this field must be less than 255 characters',
                  ]"
                  :error-messages="errorMessages"
                  :label="$t('ADD.FIELD-NAME')"
                  :hint="$t('ADD.HINT-NAME')"
                  required
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  ref="company"
                  :label="$t('ADD.FIELD-COMPANY')"
                  :placeholder="name"
                  required
                  clearable
                  :rules="[() => !!company || 'this field is required']"
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
                        :placeholder="computer.introduced"
                        :label="$t('ADD.FIELD-INTRODUCED')"
                        :hint="$t('ADD.HINT-DATE')"
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
                      <v-btn text color="primary" @click="menu = !menu">{{
                        $t("COMMONS.CANCEL")
                      }}</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(computer.introduced)"
                        >{{ $t("COMMONS.OK") }}</v-btn
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
                        :placeholder="computer.discontinued"
                        :label="$t('ADD.FIELD-DISCONTINUED')"
                        :rules="[
                          () =>
                            computer.discontinued > computer.introduced ||
                            'Discontinued date must be after introudced date',
                        ]"
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
                      <v-btn text color="primary" @click="menu2 = !menu2">{{
                        $t("COMMONS.CANCEL")
                      }}</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu2.save(computer.discontinued)"
                        >{{ $t("COMMONS.OK") }}</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
          <small>{{ $t("ADD.REQUIRED") }}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="emitCloseAdd">{{
            $t("DETAILS.CLOSE")
          }}</v-btn>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="refreshButton"
                  v-bind="attrs"
                  @click="clearFields"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="blue darken-1" text @click="editComputer">{{
            $t("COMMONS.SAVE")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { computerApi } from "../api/computer_api";
import { companyApi } from "../api/company_api";

export default {
  name: "EditComputer",
  data: (vm) => ({
    menu: false,
    menu2: false,
    allowedDates: ["1971-01-01", "2037-01-01"],
    companies: [],
    company: {},
    id: 0,
    formHasErrors: false,
    name: null,
    errorMessages: "",
    computer: {
      id: 0,
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

  props: { computerToEdit: Object },
  methods: {
    editComputer() {
      var company = { id: this.id, name: "" };
      const computer = {
        id: this.computer.id,
        name: this.computer.name,
        introduced: this.computer.introduced,
        discontinued: this.computer.discontinued,
        company: company,
      };

    
      computerApi.edit(computer).then(this.emitCloseAdd());
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
    emitCloseAdd() {
      this.$emit("clickCloseAdd", false).then(this.clearFields());
    },
    clearFields() {
      this.computer.name = "";
      this.id = 0;
      this.introducedDateFormatted = "";
      this.discontinuedDateFormatted = "";
    },
    // submit() {
    //   this.formHasErrors = false;

    //   Object.keys(this.form).forEach((f) => {
    //     if (!this.form[f]) this.formHasErrors = true;
    //     this.$refs[f].validate(true);
    //   });
    // },
    bindPropsData() {
      this.computer = this.computerToEdit
      this.name = this.computerToEdit.name
      this.introducedDateFormatted = this.computerToEdit.introduced
      this.discontinuedDateFormatted = this.computerToEdit.discontinued
      this.id = this.company.id
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    options: () => this.name,
    form() {
      return {
        name: this.name,
        id: this.id,
        introducedDateFormatted: this.introducedDateFormatted,
        discontinuedDateFormatted: this.discontinuedDateFormatted,
      };
    },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
  },
  mounted() {
    this.findCompanies();
    this.bindPropsData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>