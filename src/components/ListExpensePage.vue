<template>
  <v-ons-page id="list-expense">
    <v-ons-row>
      <v-ons-col>
        <v-ons-button modifier="outline">
          <v-ons-icon icon="md-arrow-left"></v-ons-icon>
        </v-ons-button>
      </v-ons-col>
      <v-ons-col>
        <div class="text-center title">Outubro 2017</div>
      </v-ons-col>
      <v-ons-col class="text-right">
        <v-ons-button modifier="outline">
          <v-ons-icon icon="md-arrow-right"></v-ons-icon>
        </v-ons-button>
      </v-ons-col>
    </v-ons-row>
    <v-ons-list>
      <v-ons-list-item>
        <v-ons-row>
          <v-ons-col width="60%"><b>Despesa</b></v-ons-col>
          <v-ons-col  class="text-right"><b>Valor</b></v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
      <v-ons-list-item v-for="item in expenses" :key="item.id">
        <v-ons-row>
          <v-ons-col width="60%">{{ item.description }}</v-ons-col>
          <v-ons-col class="text-right">
              {{ item.value | money }}
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>    
    <v-ons-bottom-toolbar id="total">
      <v-ons-row>
        <v-ons-col width="60%"><b>Total</b></v-ons-col>
        <v-ons-col  class="text-right"><b>{{ total | money }}</b></v-ons-col>
      </v-ons-row>
    </v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
export default {
  name: 'list-expense',
  props: {
    month: {
      type: String,
    },
    year: null,
  },
  data() {
    return {
      expenses: [
        {
          id: 1,
          value: 100,
          description: 'Despesa',
        },
        {
          id: 2,
          value: 100,
          description: 'Despesa',
        },
      ],
    };
  },
  computed: {
    total() {
      // eslint-disable-next-line
      return this.expenses.reduce((total, current) => total + current.value, 0);
    },
  },
};
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  #total {
    padding: 15px 15px 0 15px;
    background: #ebebeb;
  }
  .title {
    padding-top: 10px;
    font-weight: 600;
  }
</style>
