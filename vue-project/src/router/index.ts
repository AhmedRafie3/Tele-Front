import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue')
    },
    {
      path: '/',
      name: 'logIn',
      component: () => import('../components/LogIn.vue')
    },
    {
      path: '/employeeList',
      name: 'employeeList',
      component: () => import('../components/EmployeeList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/addnewemp',
      name: 'addnewemp',
      component: () => import('../components/AddNewEmp.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editemp/:id',
      name: 'editemp',
      component: () => import('../components/EditEmployee.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'logIn' });
  } else {
    next(); 
  }
});

export default router;
