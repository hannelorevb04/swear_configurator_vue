<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const orders = ref([
  { id: 1, customer: 'John Doe', email: 'john@example.com', status: 'Nieuwe bestelling', sneakerConfig: 'Kleur: Blauw, Maat: 42' },
  { id: 2, customer: 'Jane Smith', email: 'jane@example.com', status: 'In productie', sneakerConfig: 'Kleur: Groen, Maat: 39' },
  { id: 3, customer: 'Mark Johnson', email: 'mark@example.com', status: 'Verzonden', sneakerConfig: 'Kleur: Rood, Maat: 44' }
]);

const router = useRouter();

function viewOrderDetail(orderId) {
  router.push(`/orders/${orderId}`);
}

function updateOrderStatus(orderId, newStatus) {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
  }
}
</script>

<template>
  <div class="orders-container">
    <h2>Bestellingen Overzicht</h2>
    <ul class="orders-list">
      <li v-for="order in orders" :key="order.id" class="order-item">
        <h3>Bestelling #{{ order.id }}</h3>
        <p><strong>Klant:</strong> {{ order.customer }}</p>
        <p><strong>Email:</strong> {{ order.email }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>
        <p><strong>Configuratie:</strong> {{ order.sneakerConfig }}</p>
        <button @click="viewOrderDetail(order.id)">Bekijk Details</button>
        <button @click="updateOrderStatus(order.id, 'Verzonden')">Markeer als Verzonden</button>
        <button @click="updateOrderStatus(order.id, 'Geannuleerd')">Markeer als Geannuleerd</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.orders-container {
  padding: 2em;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f0f0f0;
}

.orders-list {
  list-style: none;
  padding: 0;
}

.order-item {
  background: white;
  padding: 1.5em;
  margin-bottom: 1em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  margin-right: 10px;
  padding: 8px 12px;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #64f243;
}
</style>
