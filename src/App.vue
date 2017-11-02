<template>
  <v-ons-page id="app">
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click.prevent="$router.push({name: 'home'})">
          <v-ons-icon icon="ion-home"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">Faça as Contas</div>
      <div class="right">
        <v-ons-toolbar-button @click.prevent="$router.push({ name: 'new_expense' })">
          <v-ons-icon icon="ion-plus-circled"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <v-ons-splitter>
      <v-ons-splitter-content>
        <router-view></router-view>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>
<script>
import HomePage from './components/HomePage';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Faça as Contas',
    };
  },
  components: {
    HomePage,
  },
};
</script>

<style>
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
}
  .text-center {
    text-align: center;
  }
</style>
