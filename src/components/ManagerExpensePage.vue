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
        <div class="message-error">{{ errors.description }}</div> 
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-input type="tel" placeholder="Valor" float v-money="money" v-model.sync="value"></v-ons-input>
        <div class="message-error">{{ errors.value }}</div>
      </v-ons-list-item>
      <v-ons-list-item>
        <label for="">Vencimento</label>
        <small v-if="errors.date" class="message-error">{{ errors.date }}</small>
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
import monthsName from '@/util/months';
import _ from 'lodash';
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
      months: monthsName,
      errors: {},
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
      this.errors = {};
      if (this.validate()) {
        let m = this.month;
        let y = this.year;
        const parcels = this.parcels === 0 || !this.parcels ? 1 : this.parcels;
        for (let i = 1; i <= parcels; i += 1) {
          const val = this.value.replace(/[^0-9,]/g, '').replace(',', '.');
          const description = parcels > 1 ? `${this.description} - ${i}/${parcels}` : this.description;
          const d = this.day;
          m = parcels > 1 ? m + 1 : m;
          if (m > 12) {
            m = 1;
            y += 1;
          }
          const expense = {
            description,
            paid: this.paid,
            due_date: this.getDueDate(d, m, y),
            parcels,
            value: val / parcels,
          };
          this.$db.expenses.put(expense).then(() => {
            this.description = '';
            this.paid = false;
            this.day = new Date().getDate();
            this.month = new Date().getMonth() + 1;
            this.year = new Date().getFullYear();
            this.value = 0.0;
          }).catch(() => {
            this.$ons.notification.toast('Falha ao salvar', { timeout: 1200 });
          });
          this.$ons.notification.toast('Salvando...', { timeout: 1200 });
        }
      } else {
        this.$ons.notification.toast('Ops! Verifique os campos e tente novamente', { timeout: 1200 });
      }
    },
    getDueDate(d, m, y) {
      const day = d < 10 ? `0${d}` : d;
      const month = m < 10 ? `0${m}` : m;
      return `${y}-${month}-${day}`;
    },
    validate() {
      if (!this.description) {
        this.errors.description = 'Você deve informar a descrição';
      }
      if (!this.value || this.value === 0 || this.value === 'R$0,00') {
        this.errors.value = 'Você deve informar o valor da despesa';
      }
      if (!this.day || !this.month || !this.year) {
        this.errors.date = 'Você deve informar uma data válida';
      }
      return _.isEmpty(this.errors);
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
  .message-error {
    color: #ff0000;
  }
</style>
