<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const order = ref(null);

onMounted(async () => {
  try {
    const orderId = route.params.id;
    const response = await axios.get(`https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders/${orderId}`);
    order.value = response.data.data.order;
  } catch (error) {
    console.error('Fout bij het ophalen van de bestelling:', error);
  }
});
</script>

<template>
  <div v-if="order" class="order-detail-container">
    <h2>Details van Bestelling #{{ order._id }}</h2>
    <p><strong>Klant:</strong> {{ order.clientDetails.email }}</p>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Orderdatum:</strong> {{ new Date(order.orderDate).toLocaleString() }}</p>
  </div>
  <div v-else>
    <p>Bestelling niet gevonden.</p>
  </div>
</template>

<style scoped>
.order-detail-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>
