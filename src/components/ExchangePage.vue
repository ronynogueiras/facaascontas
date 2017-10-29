<template>
  <v-ons-page id="exchange-page">
    <v-ons-list>
      <v-ons-list-header>
        Despesa
      </v-ons-list-header>
      <v-ons-list-item>
        <v-ons-input placeholder="Descrição" float />
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-input placeholder="Valor" float />
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-input placeholder="Vencimento" float />
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-input placeholder="Parcelas" float />
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-button modifier="large" style="margin: 6px 0">Salvar</v-ons-button>

  </v-ons-page>
</template>
<script>
export default {
  name: 'exchange-page',
};
</script>
<style>

</style>
