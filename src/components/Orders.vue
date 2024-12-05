<template>
  <div class="orders-container">
    <h2>Bestellingen Overzicht</h2>
    <ul class="orders-list">
      <li v-for="order in orders" :key="order._id" class="order-item">
        <h3>Bestelling #{{ order._id }}</h3>
        <p><strong>Email:</strong> {{ order.clientDetails.email }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>
        <div>
          <select v-if="order.showDropdown" v-model="order.newStatus" style="margin-bottom: 10px; margin-right: 10px;">
            <option disabled value="">-- Selecteer een status --</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button @click="order.showDropdown ? handleStatusChange(order) : toggleStatusChange(order)">
            {{ order.showDropdown ? 'Bevestig Statuswijziging' : 'Change Status' }}
          </button>
        </div>
        
        <p><strong>Totale prijs:</strong> {{ order.totalPrice }} EUR</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Declareer de reactive variabele voor bestellingen
const orders = ref([]);

// Functie om bestellingen op te halen
const fetchOrders = async () => {
  try {
    const response = await axios.get('https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders');
    orders.value = response.data.data.orders.map(order => ({ ...order, showDropdown: false, newStatus: order.status }));
  } catch (error) {
    console.error('Er is een fout opgetreden bij het ophalen van de bestellingen:', error);
  }
};

// Functie om de status van een bestelling bij te werken
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await axios.put(`https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders/${orderId}`, {
      status: newStatus
    });
    console.log(`Bestelling ${orderId} bijgewerkt naar status: ${newStatus}`);
  } catch (error) {
    console.error('Er is een fout opgetreden bij het bijwerken van de status van de bestelling:', error);
  }
};

// Functie om de dropdown voor statuswijziging te toggelen
const toggleStatusChange = (order) => {
  order.showDropdown = !order.showDropdown;
  if (!order.showDropdown) {
    handleStatusChange(order);
  }
};

// Functie om status te wijzigen
const handleStatusChange = (order) => {
  if (order.newStatus && order.newStatus !== order.status) {
    const originalStatus = order.status;
    order.status = order.newStatus;
    updateOrderStatus(order._id, order.newStatus).catch(() => {
      // Als er een fout optreedt, zet de status terug naar de oorspronkelijke waarde
      order.status = originalStatus;
    });
    order.showDropdown = false;
  }
};

// Haal de bestellingen op bij het laden van de component
onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
* {
  font-family: sans-serif;
}
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
  color: black
}
</style>
