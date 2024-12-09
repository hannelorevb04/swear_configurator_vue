<script setup> 
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const order = ref(null);
const newStatus = ref('');


onMounted(async () => {
  try {
    const token = localStorage.getItem('token'); 
    const orderId = route.params.id;
    const response = await axios.get(
      `https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    order.value = response.data.data.order;
    newStatus.value = order.value.status;
  } catch (error) {
    console.error('Fout bij het ophalen van de bestelling:', error);
    if (error.response?.status === 401) {
      alert('U bent niet geautoriseerd. Log opnieuw in.');
      router.push('/login'); 
    }
  }
});

// Delete order
const deleteOrder = async () => {
  try {
    await axios.delete(`https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders/${order.value._id}`);
    console.log(`Bestelling ${order.value._id} verwijderd`);
    router.push('/orders');
  } catch (error) {
    console.error('Er is een fout opgetreden bij het verwijderen van de bestelling:', error);
  }
};


const goToProductDetails = (productId) => {
  if (productId) {
    router.push(`/products/${productId}`);
  } else {
    alert('Geen product ID gevonden.');
  }
};


const goBackToOrders = () => {
  router.push('/orders');
};
</script>

<template>
  <div v-if="order" class="order-detail-container">
    <h2>Details van bestelling #{{ order._id }}</h2>
    <p><strong>Product ID:</strong> {{ order.productId }}</p>
    <p>
      <strong>Orderdatum:</strong>
      {{ new Date(order.orderDate).toLocaleDateString('nl-NL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) }}
    </p>
    <p><strong>Adres:</strong> {{ order.clientDetails.address.street }}, 
      {{ order.clientDetails.address.city }},
      {{ order.clientDetails.address.zip }}, 
      {{ order.clientDetails.address.country }}</p>
    <p><strong>Totale prijs:</strong> € {{ order.totalPrice }}</p>
    <p><strong>Email:</strong> {{ order.clientDetails.email }}</p>
    <p><strong>Telefoonnummer:</strong> {{ order.clientDetails.phone }}</p>
    <p><strong>Status:</strong> {{ order.status }}</p>

    <div class="actions">
      <button @click="goBackToOrders">Terug naar orders</button>
      <button @click="goToProductDetails(order.productId)">Bekijk product</button>
      <button @click="deleteOrder">Verwijder bestelling</button>
    </div>
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
.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
