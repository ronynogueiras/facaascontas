import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function load(path) {
  // '@' is aliased to src/paths
  return () => import(`@/components/${path}.vue`);
}

const router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: load('HomePage'),
    },
    {
      path: '/despesas/:month/:year',
      name: 'list_expenses',
      props: true,
      component: load('ListExpensePage'),
    },
    {
      path: '/meses',
      name: 'list_months_expenses',
      props: true,
      component: load('ListMonthsExpensesPage'),
    },
    {
      path: '/novo',
      name: 'new_expense',
      component: load('ManagerExpensePage'),
    },
    {
      path: '/editar/:id',
      name: 'edit_expense',
      props: true,
      component: load('ManagerExpensePage'),
    },
  ],
});

export default router;
