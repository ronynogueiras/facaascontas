<template>
  <v-ons-page id="manager-expense">
    <v-ons-list>
      <v-ons-list-header>
        <div class="center">
          Despesa
        </div>
      </v-ons-list-header>
      <v-ons-list-item>
        <v-ons-input placeholder="Descrição" float v-model="description"></v-ons-input>
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-input type="tel" placeholder="Valor" float v-money="money" v-model.lazy="value"></v-ons-input>
      </v-ons-list-item>
      <v-ons-list-item>
        <label for="">Vencimento</label>
        <v-ons-row>
          <v-ons-col width="20%">
            <v-ons-select style="width: 100%">
              <option v-for="day in 31" :value="day" :key="day">
                {{ day }}
              </option>
            </v-ons-select>
          </v-ons-col>
          <v-ons-col  width="60%">
            <v-ons-select style="width: 100%">
              <option v-for="month in months" :value="month.id" :key="month.id">
                {{ month.name }}
              </option>
            </v-ons-select>
          </v-ons-col>
          <v-ons-col  width="20%">
            <v-ons-select style="width: 100%">
            <option v-for="year in years" :value="year" :key="year">
              {{ year }}
            </option>
          </v-ons-select>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-bottom-toolbar>
        <v-ons-button modifier="large" @click.prevent="save()">Salvar</v-ons-button>
    </v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import { VMoney } from 'v-money';

export default {
  name: 'manager-expense',
  data() {
    return {
      description: '',
      dueDate: '',
      value: 0.0,
      months: [
        {
          id: 1,
          name: 'Janeiro',
        },
        {
          id: 2,
          name: 'Fevereiro',
        },
        {
          id: 3,
          name: 'Março',
        },
        {
          id: 4,
          name: 'Abril',
        },
        {
          id: 5,
          name: 'Maio',
        },
        {
          id: 6,
          name: 'Junho',
        },
        {
          id: 7,
          name: 'Julho',
        },
        {
          id: 8,
          name: 'Agosto',
        },
        {
          id: 9,
          name: 'Setembro',
        },
        {
          id: 10,
          name: 'Outubro',
        },
        {
          id: 11,
          name: 'Novembro',
        },
        {
          id: 12,
          name: 'Dezembro',
        },
      ],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    save() {
      alert(JSON.stringify({
        description: this.description,
        dueDate: this.dueDate,
        value: this.value,
      }));
    },
  },
  computed: {
    years() {
      const current = new Date().getFullYear();
      return [current, current + 1];
    },
  },
  directives: { money: VMoney },
};
</script>

<style scoped>
  .center {
    text-align: center;
  }
  v-ons-input {
    width: 100%;
  }
</style>
