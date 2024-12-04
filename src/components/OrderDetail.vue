<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const ordersData = [
  { id: 1, customer: 'John Doe', email: 'john@example.com', status: 'Nieuwe bestelling', sneakerConfig: 'Kleur: Blauw, Maat: 42' },
  { id: 2, customer: 'Jane Smith', email: 'jane@example.com', status: 'In productie', sneakerConfig: 'Kleur: Groen, Maat: 39' },
  { id: 3, customer: 'Mark Johnson', email: 'mark@example.com', status: 'Verzonden', sneakerConfig: 'Kleur: Rood, Maat: 44' }
];

const route = useRoute();
const order = ref(null);

onMounted(() => {
  const orderId = parseInt(route.params.id, 10);
  order.value = ordersData.find(o => o.id === orderId);
});
</script>

<template>
  <div v-if="order" class="order-detail-container">
    <h2>Details van Bestelling #{{ order.id }}</h2>
    <p><strong>Klant:</strong> {{ order.customer }}</p>
    <p><strong>Email:</strong> {{ order.email }}</p>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Configuratie:</strong> {{ order.sneakerConfig }}</p>
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
