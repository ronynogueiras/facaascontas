<template>
  <v-ons-page id="manager-expense">
    <v-ons-list nodivider>
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
            <v-ons-select style="width: 100%" v-model="day">
              <option v-for="day in 31" :value="day" :key="day">
                {{ day }}
              </option>
            </v-ons-select>
          </v-ons-col>
          <v-ons-col  width="60%">
            <v-ons-select style="width: 100%" v-model="month">
              <option v-for="month in months" :value="month.id" :key="month.id">
                {{ month.name }}
              </option>
            </v-ons-select>
          </v-ons-col>
          <v-ons-col  width="20%">
            <v-ons-select style="width: 100%" v-model="year">
            <option v-for="year in years" :value="year" :key="year">
              {{ year }}
            </option>
          </v-ons-select>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-input type="tel" placeholder="Parcelas" float v-model="parcels"></v-ons-input>
      </v-ons-list-item>
      <v-ons-list-item>
        <label class="left">
          <v-ons-checkbox :input-id="'paid'" v-model="paid"/>
        </label>
        <label class="center" :for="'paid'">
          Pago
        </label>
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
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      description: '',
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      value: 0.0,
      paid: false,
      parcels: 1,
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
        prefix: 'R$',
        suffix: '',
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    save() {
      const expense = {
        description: this.description,
        paid: this.paid,
        due_date: this.getDueDate(),
        parcels: this.parcels ? this.parcels : 1,
        value: this.value.replace(/[^0-9,]/g, '').replace(',', '.'),
      };
      this.$db.expenses.put(expense).then(() => {
        this.description = '';
        this.paid = false;
        this.day = new Date().getDate();
        this.month = new Date().getMonth() + 1;
        this.year = new Date().getFullYear();
        this.value = 0.0;
        this.$ons.notification.toast('Salvo com sucesso.', { timeout: 1200 });
      }).catch((err) => {
        console.log(err);
        this.$ons.notification.toast('Falha ao salvar', { timeout: 1200 });
      });
    },
    getDueDate() {
      const day = this.day < 10 ? `0${this.day}` : this.day;
      const month = this.month < 10 ? `0${this.month}` : this.month;
      return `${this.year}-${month}-${day}`;
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
