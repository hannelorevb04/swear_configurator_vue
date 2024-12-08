import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Orders from './components/Orders.vue';
import OrderDetail from './components/OrderDetail.vue';
import Product from './components/Product.vue';
import Products from './components/Products.vue';

// Stel de routes in
const routes = [
  { path: '/', component: Login },
  { path: '/orders', component: Orders },
  { path: '/orders/:id', component: OrderDetail },
  { path: '/products/:id', component: Product }, // Voeg een nieuwe route toe voor het product detail
  { path: '/products', component: Products },
];

// Maak de router aan
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Maak de app aan en voeg de router toe
const app = createApp(App);
app.use(router);
app.mount('#app');
