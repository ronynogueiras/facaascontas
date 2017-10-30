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
          <v-ons-col width="10%">#</v-ons-col>
          <v-ons-col width="60%"><b>Despesa</b></v-ons-col>
          <v-ons-col  class="text-right"><b>Valor</b></v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
      <v-ons-list-item v-for="(item, index) in expenses" :key="item.id" tappable @click.prevent="showDialogOptions(index)">
        <v-ons-row>
          <v-ons-col width="10%"><v-ons-icon :icon="item.paid ? 'ion-checkmark-round' : 'ion-close-round'"></v-ons-icon></v-ons-col>
          <v-ons-col width="60%">{{ item.description }}<br><small>{{ item.due_date }}</small></v-ons-col>
          <v-ons-col class="text-right" vertical-align="center">
              {{ item.value | money }}
          </v-ons-col>
        </v-ons-row>
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
            {{ expenses[current] && expenses[current].paid ? 'Pago' : 'Não Pago' }}
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
      dialogVisible: false,
      current: null,
      expenses: [
        {
          id: 1,
          value: 100.11,
          paid: false,
          due_date: '30/10/2017',
          description: 'Despesa',
        },
        {
          id: 2,
          value: 102.12,
          paid: true,
          due_date: '31/10/2017',
          description: 'Despesa',
        },
      ],
    };
  },
  methods: {
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
          this.hideDialogOptions();
          this.removeItem();
        }
      });
    },
    togglePayment() {
      this.expenses[this.current].paid = !this.expenses[this.current].paid;
      this.$ons.notification.toast(this.expenses[this.current].paid ? 'Marcado como pago' : 'Marcado como não pago', {
        timeout: 1200,
      });
      this.hideDialogOptions();
    },
    removeItem() {
      this.$ons.notification.toast('Removido!', {
        timeout: 1200,
      });
    },
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
