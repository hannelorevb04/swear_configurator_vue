<template>
  <div class="orders-container">
    <h2>Bestellingen Overzicht</h2>
    <ul class="orders-list">
      <li v-for="order in orders" :key="order._id" class="order-item">
        <h3 @click="goToOrderDetail(order._id)" style="cursor: pointer;">Bestelling #{{ order._id }}</h3>
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
          <button v-if="order.showDropdown" @click="handleStatusChange(order)" style="margin-top: 10px;">
            Bevestig Statuswijziging
          </button>
          <button v-else @click="toggleStatusChange(order)" style="margin-top: 10px;">
            Change Status
          </button>
          <button @click="deleteOrder(order._id)" style="margin-top: 10px; margin-left: 10px;">
            Verwijder Bestelling
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

// Functie om een bestelling te verwijderen
const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`https://sneaker-configurator-api-ak6n.onrender.com/api/v1/orders/${orderId}`);
    console.log(`Bestelling ${orderId} verwijderd`);
    // Verwijder de bestelling lokaal uit de lijst
    orders.value = orders.value.filter(order => order._id !== orderId);
  } catch (error) {
    console.error('Er is een fout opgetreden bij het verwijderen van de bestelling:', error);
  }
};

// Functie om de dropdown voor statuswijziging te toggelen
const toggleStatusChange = (order) => {
  order.showDropdown = !order.showDropdown;
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


import { useRouter } from 'vue-router';

// Declareer router
const router = useRouter();

// Functie om naar order detail te navigeren
const goToOrderDetail = (orderId) => {
  router.push({ path: `/orders/${orderId}` });
};
</script>

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
