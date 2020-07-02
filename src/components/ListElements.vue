<template>
  <v-card>
    <ul>
      <li v-for="(element, i) in elements" :key="i">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>{{element.name}}</v-expansion-panel-header>
            <v-expansion-panel-content>azeaz</v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </li>
    </ul>
  </v-card>
</template>

<script>
import * as data from "../MOCK/mockComputer";

console.info(data);

export default {
  name: "ListElements",
  data: function() {
    return {
      item: 1,
      elements: Object
    };
  },
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
</style>
