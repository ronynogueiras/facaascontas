<template>
  <v-ons-page>
    <h1 class="text-center">Minhas Despesas</h1>
    <v-ons-card>
      <div class="title">
        {{ currentMonthName }}
      </div>
      <div class="content">
        <h1>{{ currentExpense | money }} </h1>
        <v-ons-button modifier="large" style="margin: 6px 0" @click.prevent="$router.push({name: 'list_expenses', params: { month: currentMonth }})">Ver despesas</v-ons-button>
      </div>
    </v-ons-card>
    <v-ons-card>
      <div class="title">
        Próximos Meses
      </div>
      <div class="content">
        <h1>{{ nextExpenses | money }}</h1>
        <v-ons-button modifier="large" style="margin: 6px 0" @click.prevent="$router.push({name: 'list_months_expenses'})">Ver despesas</v-ons-button>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import months from '@/util/months';

const now = new Date();

export default {
  name: 'home',
  data() {
    return {
      currentMonth: `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' : ''}${now.getMonth() + 1}`,
      currentExpense: 0.0,
      nextExpenses: 0.0,
    };
  },
  methods: {
    getCurrentMonth() {
      this.$db.expenses.where('due_date').startsWith(this.currentMonth).toArray((arr) => {
        this.currentExpense = arr.reduce((total, current) => total + parseFloat(current.value), 0);
      });
    },
    getNextMonths() {
      let month = now.getMonth() + 1;
      let year = now.getFullYear();
      if (month === 12) {
        month = '01';
        year += 1;
      }
      const greaterThan = new Date(year, month);
      this.$db.expenses
      .filter(item => new Date(item.due_date).getTime() > greaterThan.getTime())
      .toArray((arr) => {
        this.nextExpenses = arr.reduce((total, current) => total + parseFloat(current.value), 0);
      });
    },
  },
  computed: {
    currentMonthName() {
      return `${months[now.getMonth()].name} ${now.getFullYear()}`;
    },
  },
  mounted() {
    this.getCurrentMonth();
    this.getNextMonths();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}
.text-center {
  text-align: center;
}
img {
  max-width: 300px;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}
</style>
