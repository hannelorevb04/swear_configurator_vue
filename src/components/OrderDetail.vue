<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const order = ref(null);
const newStatus = ref('');

// Functie om bestelling op te halen
onMounted(async () => {
  try {
    const orderId = route.params.id;
    const response = await axios.get(`https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders/${orderId}`);
    order.value = response.data.data.order;
    newStatus.value = order.value.status;
  } catch (error) {
    console.error('Fout bij het ophalen van de bestelling:', error);
  }
});

// Functie om de status bij te werken
const updateOrderStatus = async () => {
  if (newStatus.value && newStatus.value !== order.value.status) {
    try {
      await axios.put(`https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders/${order.value._id}`, {
        status: newStatus.value
      });
      console.log(`Bestelling ${order.value._id} bijgewerkt naar status: ${newStatus.value}`);
      order.value.status = newStatus.value;
    } catch (error) {
      console.error('Er is een fout opgetreden bij het bijwerken van de status:', error);
    }
  }
};

// Functie om de bestelling te verwijderen
const deleteOrder = async () => {
  try {
    await axios.delete(`https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders/${order.value._id}`);
    console.log(`Bestelling ${order.value._id} verwijderd`);
    router.push('/orders');
  } catch (error) {
    console.error('Er is een fout opgetreden bij het verwijderen van de bestelling:', error);
  }
};
</script>

<template>
  <div v-if="order" class="order-detail-container">
    <h2>Details van bestelling #{{ order._id }}</h2>
    <p><strong>Klant:</strong> {{ order.clientDetails.email }}</p>
    <p><strong>Status:</strong>
      <select v-model="newStatus" class="status-select">
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button @click="updateOrderStatus">Verander status</button>
    </p>
    <p><strong>Orderdatum:</strong> {{ new Date(order.orderDate).toLocaleString() }}</p>
    <button @click="deleteOrder">Verwijder bestelling</button>
  </div>
  <div v-else>
    <p>Bestelling niet gevonden.</p>
  </div>
</template>

<style scoped>
* {
  font-family: sans-serif;
}
.order-detail-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}
button {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  background-color: #64f243;
  color: black;
}
button:hover {
    background-color: #333;
  color: #fff;
}
.status-select {
  margin-left: 10px;
  margin-right: 15px;
}

</style>
