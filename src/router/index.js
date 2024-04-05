import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/DetailsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: 'form',
        component: () => import('../views/FillFormView.vue'),
      },
      {
        path: 'checkorder',
        component: () => import('../views/checkOrderView.vue'),
      },
      {
        path: 'success',
        component: () => import('../views/SuccessView.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/dashboard/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/ProductsView.vue'),
      },
      {
        path: 'order',
        component: () => import('../views/dashboard/OrderView.vue'),
      },
      {
        path: 'coupon',
        component: () => import('../views/dashboard/CouponView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
