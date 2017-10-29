<template>
  <v-ons-page id="list-months-expenses">
    <v-ons-list>
      <v-ons-list-header>
        <div class="text-center">
          Meses
        </div>
      </v-ons-list-header>
      <v-ons-list-item tappable v-for="item in 12" :key="item" @click.prevent="$router.push({name: 'list_expenses', params: { month: '10', year: 2017}})">
        <v-ons-row>
          <v-ons-col width="60%">Outubro 2017</v-ons-col>
          <v-ons-col>R$100,00</v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  name: 'list-months-expenses',
};
</script>

<style>

</style>
