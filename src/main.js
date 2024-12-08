import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Orders from './components/Orders.vue';
import OrderDetail from './components/OrderDetail.vue';
import Product from './components/Product.vue';
import Products from './components/Products.vue';


const routes = [
  { path: '/', component: Login },
  { path: '/orders', component: Orders },
  { path: '/orders/:id', component: OrderDetail },
  { path: '/products/:id', component: Product }, 
  { path: '/products', component: Products },
];


const router = createRouter({
  history: createWebHistory(),
  routes
});


const app = createApp(App);
app.use(router);
app.mount('#app');
