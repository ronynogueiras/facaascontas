// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css';

import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import store from './store';
import router from './router';
import App from './App';
import './filters/finance';

Vue.config.productionTip = false;

Vue.use(VueOnsen);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
