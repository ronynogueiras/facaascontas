<template>
  <v-ons-page id="list-expense">
    <v-ons-row>
      <v-ons-col width="20%">
        <v-ons-button modifier="outline" @click.prevent="prevMonth()">
          <v-ons-icon icon="ion-arrow-left-c"></v-ons-icon>
        </v-ons-button>
      </v-ons-col>
      <v-ons-col width="60%">
        <div class="text-center title">{{ currentMonth }}</div>
      </v-ons-col>
      <v-ons-col width="20%" class="text-right">
        <v-ons-button modifier="outline" @click.prevent="nextMonth()">
          <v-ons-icon icon="ion-arrow-right-c"></v-ons-icon>
        </v-ons-button>
      </v-ons-col>
    </v-ons-row>
    <v-ons-list>
      <v-ons-list-item>
        <v-ons-row>
          <v-ons-col width="10%">#</v-ons-col>
          <v-ons-col width="60%"><b>Despesa</b></v-ons-col>
          <v-ons-col  class="text-right"><b>Valor</b></v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
      <v-ons-list-item v-for="(item, index) in expenses" :key="item.id" tappable @click.prevent="showDialogOptions(index)" v-if="expenses.length > 0">
        <v-ons-row>
          <v-ons-col width="10%"><v-ons-icon :icon="item.paid ? 'ion-checkmark-round' : 'ion-close-round'"></v-ons-icon></v-ons-col>
          <v-ons-col width="60%">{{ item.description }}<br><small>{{ parseDueDate(item.due_date) }}</small></v-ons-col>
          <v-ons-col class="text-right" vertical-align="center">
              {{ item.value | money }}
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
      <v-ons-list-item v-if="expenses.length === 0">
        Nenhuma despesa neste mês
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-alert-dialog modifier="rowfooter" :visible.sync="dialogVisible">
      <span slot="title">Ações</span>
      <v-ons-list>
        <v-ons-list-item modifier="chevron" tappable @click.prevent="$router.push({name: 'edit_expense', params: { id: current.id }})">
          <div class="left">
            <v-ons-icon icon="ion-edit" class="list-item__icon"></v-ons-icon>
          </div>
          <div class="center">
            Editar
          </div>
        </v-ons-list-item>
        <v-ons-list-item tappable @click.prevent="togglePayment()">
          <div class="left">
            <v-ons-icon :icon="iconPaid" class="list-item__icon"></v-ons-icon>
          </div>
          <div class="center">
            {{ expenses[current] && expenses[current].paid ? 'Marcar como Não Pago' : 'Marcar como Pago' }}
          </div>
        </v-ons-list-item>
        <v-ons-list-item @click="showRemoveAlert()" tappable>
          <div class="left">
            <v-ons-icon icon="ion-trash-a" class="list-item__icon"></v-ons-icon>
          </div>
          <div class="center">
            Remover
          </div>
        </v-ons-list-item>
      </v-ons-list>
      <template slot="footer">
        <div class="alert-dialog-button" @click="hideDialogOptions()">Fechar</div>
      </template>
    </v-ons-alert-dialog>
    <v-ons-bottom-toolbar id="total">
      <v-ons-row>
        <v-ons-col width="60%"><b>Total</b></v-ons-col>
        <v-ons-col  class="text-right"><b>{{ total | money }}</b></v-ons-col>
      </v-ons-row>
    </v-ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
import monthsName from '@/util/months';

export default {
  name: 'list-expense',
  props: {
    month: {
      type: String,
    },
  },
  data() {
    return {
      dialogVisible: false,
      current: null,
      expenses: [],
    };
  },
  methods: {
    get() {
      this.$db.expenses.where('due_date').startsWith(this.month).toArray((arr) => {
        this.expenses = arr;
      });
    },
    showDialogOptions(index) {
      this.current = index;
      this.dialogVisible = true;
    },
    hideDialogOptions() {
      this.dialogVisible = false;
      this.current = null;
    },
    showRemoveAlert() {
      this.$ons.notification.confirm('Deseja remover o registro?', {
        message: 'Confirmação',
        buttonLabels: ['Não', 'Sim'],
      }).then((result) => {
        if (result === 1) {
          this.removeItem();
        }
      });
    },
    togglePayment() {
      this.expenses[this.current].paid = !this.expenses[this.current].paid;
      this.$db.expenses.update(this.expenses[this.current].id, {
        paid: this.expenses[this.current].paid,
      }).then(() => {
        const message = this.expenses[this.current].paid ? 'Marcado como pago' : 'Marcado como não pago';
        this.$ons.notification.toast(message, {
          timeout: 1200,
        });
        this.hideDialogOptions();
      });
    },
    removeItem() {
      const id = this.expenses[this.current].id;
      this.$db.expenses.delete(id).then((result) => {
        const message = result ? 'Removido com sucesso.' : 'Falha ao remover';
        this.$ons.notification.toast(message, {
          timeout: 1200,
        });
        this.hideDialogOptions();
        this.get();
      });
    },
    parseDueDate(date) {
      const aux = date.split('-');
      return `${aux[2]}/${aux[1]}/${aux[0]}`;
    },
    nextMonth() {
      const currentMonth = parseInt(this.month.split('-')[1], 10) + 1;
      const currentYear = parseInt(this.month.split('-')[0], 10);
      let next;
      if (currentMonth > 12) {
        next = { name: 'list_expenses', params: { month: `${currentYear + 1}-01` } };
      } else {
        next = { name: 'list_expenses', params: { month: `${currentYear}-${currentMonth < 10 ? '0' : ''}${currentMonth}` } };
      }
      this.$router.push(next);
    },
    prevMonth() {
      const currentMonth = parseInt(this.month.split('-')[1], 10) - 1;
      const currentYear = parseInt(this.month.split('-')[0], 10);
      let prev;
      if (currentMonth === 0) {
        prev = { name: 'list_expenses', params: { month: `${currentYear - 1}-12` } };
      } else {
        prev = { name: 'list_expenses', params: { month: `${currentYear}-${currentMonth < 10 ? '0' : ''}${currentMonth}` } };
      }
      this.$router.push(prev);
    },
  },
  watch: {
    $route: 'get',
  },
  computed: {
    total() {
      // eslint-disable-next-line
      return this.expenses.reduce((total, current) => total + current.value, 0);
    },
    iconPaid() {
      return this.expenses[this.current] && this.expenses[this.current].paid ?
      'ion-checkmark-round' :
      'ion-close-round';
    },
    currentMonth() {
      const date = this.month.split('-');
      return `${monthsName[date[1] - 1].name} de ${date[0]}`;
    },
  },
  mounted() {
    this.get();
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
    color: #ffffff;
    background: #666666;
  }
  .title {
    padding-top: 10px;
    font-weight: 600;
  }
</style>
