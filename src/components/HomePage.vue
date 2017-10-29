<template>
  <v-ons-page>
    <h1 class="text-center">Minhas Despesas</h1>
    <v-ons-card>
      <div class="title">
        Outubro 2017
      </div>
      <div class="content">
        <h1>R$300,00</h1>
        <v-ons-button modifier="large" style="margin: 6px 0" @click.prevent="$router.push({name: 'list_expenses', params: { month: '10', year: 2017}})">Ver despesas</v-ons-button>
      </div>
    </v-ons-card>
    <v-ons-card>
      <div class="title">
        Próximos Meses
      </div>
      <div class="content">
        <h1>R$600,00</h1>
        <v-ons-button modifier="large" style="margin: 6px 0" @click.prevent="$router.push({name: 'list_months_expenses'})">Ver despesas</v-ons-button>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
export default {
  name: 'home',
  data() {
    return { };
  },
  created() {
    this.$store.commit('fab/toggle', true);
  },
  destroyed() {
    this.$store.commit('fab/toggle', false);
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
