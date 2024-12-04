import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Orders from './components/Orders.vue';
import OrderDetail from './components/OrderDetail.vue';

// Stel de routes in
const routes = [
  { path: '/', component: Login },
  { path: '/orders', component: Orders },
  { path: '/orders/:id', component: OrderDetail }
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
