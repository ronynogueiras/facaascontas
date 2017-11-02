<template>
  <v-ons-page id="list-months-expenses">
    <v-ons-list>
      <v-ons-list-header>
        <div class="text-center">
          Meses
        </div>
      </v-ons-list-header>
      <v-ons-list-header>
        <v-ons-row>
          <v-ons-col width="60%">Mês</v-ons-col>
          <v-ons-col>Valor Total </v-ons-col>
        </v-ons-row>
      </v-ons-list-header>
      <v-ons-list-item tappable v-for="(month, index) in months" :key="index" @click.prevent="$router.push({name: 'list_expenses', params: { month: index}})" modifier="chevron" v-if="months != {}">
        <v-ons-row>
          <v-ons-col width="60%">{{ monthsName[index.substr(5, 2) - 1 ] }}, {{ index.substr(0, 4) }}</v-ons-col>
          <v-ons-col>{{ total(month) | money }} </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
      <v-ons-list-item v-else>
        <div class="center">
          Nenhuma despesa cadastrada.
        </div>
      </v-ons-list-item>      
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import _ from 'lodash';
import monthsName from '@/util/months';

export default {
  name: 'list-months-expenses',
  data() {
    return {
      months: [],
    };
  },
  computed: {
    monthsName() {
      return _.map(monthsName, item => item.name);
    },
  },
  methods: {
    get() {
      this.$db.expenses.orderBy('id').toArray((arr) => {
        if (arr.length > 0) {
          let months = _.map(arr, (o) => {
            const i = o;
            i.due_date = o.due_date.split('-').splice(0, 2).join('-');
            return i;
          });
          months = _.groupBy(months, o => o.due_date);
          this.months = months;
        }
      });
    },
    total(month) {
      return month.reduce((total, current) => total + parseFloat(current.value), 0);
    },
  },
  mounted() {
    this.get();
  },
};
</script>

<style>

</style>
