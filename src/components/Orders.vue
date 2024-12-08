<!--<template>
  <div class="orders-container">
    <h2>Bestellingen</h2>
    <ul class="orders-list">
      <li v-for="order in orders" :key="order._id" class="order-item">
        <h3 @click="goToOrderDetail(order._id)" style="cursor: pointer;">Bestelling #{{ order._id }}</h3>
        <p><strong>Email:</strong> {{ order.clientDetails.email }}</p>
        <p><strong>Totale prijs:</strong> € {{ order.totalPrice }}</p>
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
            Bevestig statuswijziging
          </button>
          <button v-else @click="toggleStatusChange(order)" style="margin-top: 10px;">
            Verander status
          </button>
          <button @click="deleteOrder(order._id)" style="margin-top: 10px; margin-left: 10px;">
            Verwijder bestelling
          </button>
        </div>
        
        
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

-->


<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../api'; // Gebruik de aangepaste Axios-instantie
import { useRouter } from 'vue-router';

// Declaraties
const orders = ref([]);
const error = ref('');
const router = useRouter();
const showPasswordModal = ref(false); // Modal staat standaard uit
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const passwordSuccess = ref('');

// Functie om bestellingen op te halen
const fetchOrders = async () => {
  try {
    const response = await apiClient.get('/orders'); // Haal bestellingen op via beveiligde API
    orders.value = response.data.data.orders.map(order => ({
      ...order,
      showDropdown: false,
      newStatus: order.status,
    })); // Voeg dropdown en status-logica toe
  } catch (err) {
    error.value = 'Er is een fout opgetreden bij het ophalen van de bestellingen.';
    console.error(err);
  }
};

// Functie om de status van een bestelling bij te werken
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await apiClient.put(`/orders/${orderId}`, { status: newStatus });
    console.log(`Bestelling ${orderId} bijgewerkt naar status: ${newStatus}`);
  } catch (error) {
    console.error('Er is een fout opgetreden bij het bijwerken van de status van de bestelling:', error);
  }
};

// Functie om een bestelling te verwijderen
const deleteOrder = async (orderId) => {
  try {
    await apiClient.delete(`/orders/${orderId}`);
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

// Functie om naar order detail te navigeren
const goToOrderDetail = (orderId) => {
  router.push({ path: `/orders/${orderId}` });
};

// Functie om wachtwoord te wijzigen
const updatePassword = async () => {
  try {
    if (newPassword.value !== confirmPassword.value) {
      passwordError.value = 'Nieuwe wachtwoorden komen niet overeen.';
      passwordSuccess.value = '';
      return;
    }

    await apiClient.put('/users/update-password', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    passwordSuccess.value = 'Wachtwoord succesvol gewijzigd.';
    passwordError.value = '';
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    showPasswordModal.value = false; // Sluit de modal
  } catch (err) {
    passwordError.value = err.response?.data?.message || 'Er is een fout opgetreden.';
    passwordSuccess.value = '';
  }
};

// Haal de bestellingen op bij het laden van de component
onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <div class="orders-container">
    <div class="header">
      <h2>Bestellingen</h2>
      <button class="password-button" @click="showPasswordModal = true">Wachtwoord wijzigen</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
    <ul class="orders-list" v-else>
      <li v-for="order in orders" :key="order._id" class="order-item">
        <div class="order-info">
          <h3 @click="goToOrderDetail(order._id)" style="cursor: pointer;">Bestelling #{{ order._id }}</h3>
          <p><strong>Email:</strong> {{ order.clientDetails.email }}</p>
          <p><strong>Totale prijs:</strong> € {{ order.totalPrice }}</p>
          <p><strong>Status:</strong> {{ order.status }}</p>
        </div>
        <div class="order-actions">
          <select v-if="order.showDropdown" v-model="order.newStatus">
            <option disabled value="">-- Selecteer een status --</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button v-if="order.showDropdown" @click="handleStatusChange(order)">Bevestig statuswijziging</button>
          <button v-else @click="toggleStatusChange(order)">Verander status</button>
          <button @click="deleteOrder(order._id)">Verwijder bestelling</button>
        </div>
      </li>
    </ul>

    <!-- Wachtwoord wijzigen modal -->
    <div v-if="showPasswordModal" class="modal">
      <div class="modal-content">
        <h3>Wachtwoord wijzigen</h3>
        <form @submit.prevent="updatePassword">
          <label for="old-password">Huidig wachtwoord</label>
          <input
            id="old-password"
            type="password"
            v-model="oldPassword"
            placeholder="Voer je huidige wachtwoord in"
            required
          />
          <label for="new-password">Nieuw wachtwoord</label>
          <input
            id="new-password"
            type="password"
            v-model="newPassword"
            placeholder="Voer een nieuw wachtwoord in"
            required
          />
          <label for="confirm-password">Bevestig nieuw wachtwoord</label>
          <input
            id="confirm-password"
            type="password"
            v-model="confirmPassword"
            placeholder="Bevestig je nieuwe wachtwoord"
            required
          />
          <button type="submit">Bijwerken</button>
          <button type="button" @click="showPasswordModal = false">Annuleren</button>
        </form>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <p v-if="passwordSuccess" class="success">{{ passwordSuccess }}</p>
      </div>
    </div>
  </div>
</template>



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


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

</style>
