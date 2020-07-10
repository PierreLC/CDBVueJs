<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ $t("LOGIN.LOGIN-FORM") }}</v-toolbar-title>

                <v-tooltip bottom>
                  <span>{{ $t("LOGIN.SOURCE") }}</span>
                </v-tooltip>
              </v-toolbar>
              <v-alert type="error" v-show="visible">
                {{ $t("ERRORS.ALERT") }}
              </v-alert>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    :label="$t('LOGIN.USERNAME')"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="userpassword"
                    id="password"
                    :label="$t('LOGIN.PASSWORD')"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="loginMethod()">{{ $t("LOGIN.LOGIN") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { userApi } from "../../api/user_api";

export default {
  name: "Connection",
  data: () => ({
    visible: false,
    username: "",
    userpassword: ""
  }),
  props: {},
  methods: {
    loginMethod() {
      const password = this.CryptoJS.SHA256(this.userpassword);
      userApi
        .login(this.username, password.toString(this.CryptoJS.enc.Base64))
        .then(response => {
          let token = "token";
          sessionStorage.setItem(token, response.data);
          this.$router.push({
            name: "Dashboard",
            query: { redirect: "/path" }
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
