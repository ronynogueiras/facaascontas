/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import numeral from 'numeral';
import 'numeral/locales/pt-br';

numeral.locale('pt-br');

Vue.filter('money', (value, format = '$0,0.00') => numeral(parseFloat(value)).format(format));
Vue.filter('percent', (value, format = '0.00%') => numeral(parseFloat(value)).format(format));
