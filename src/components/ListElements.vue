<template>
  <v-card class="elementCard">
    <ul>
      <li v-for="(element, i) in lister" :key="i">
        <div v-for="(elem, o) in element" :key="o">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header><h4>{{elem.name}}</h4></v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul>
                <li>Introduced : {{elem.introduced}}</li>
                <li>Discontinued : {{elem.discontinued}}</li>
                <li>Company : {{elem.company.name}}</li>
              </ul>
            <v-btn color="primary"       @click="sheet = !sheet">Edit</v-btn>
                <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <v-btn
          text
          color="red"
          @click="sheet = !sheet"
        >close</v-btn>
        <div>This is a bottom sheet using the controlled by v-model instead of activator</div><!--TODO lier à modify element-->
      </v-sheet>
    </v-bottom-sheet>
            <v-btn color="error">Delete</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        </div>
      </li>
    </ul>
  </v-card>
</template>

<script>
import * as data from "../MOCK/mockComputer";

export default {
  name: "ListElements",
  data: () => ({
      sheet: false,
      elements: Object
  }),
  components: { },
  props: {},
  methods: {},
  computed: {
    lister() {
    return data;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.elementCard {
  margin: 0 20vw;
}
</style>
