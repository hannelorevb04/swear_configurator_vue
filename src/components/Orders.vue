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
const isMenuOpen = ref(false); // Hamburger menu logica

// Toggle hamburger menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Toggle wachtwoord modal
const togglePasswordModal = () => {
  showPasswordModal.value = !showPasswordModal.value;
};

// Uitloggen actie
const logout = () => {
  console.log("Uitloggen...");
  router.push('/'); // Navigeer naar login.vue
};

// Functie om bestellingen op te halen
const fetchOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    orders.value = response.data.data.orders.map(order => ({
      ...order,
      showDropdown: false,
      newStatus: order.status,
    }));
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
  <nav>
    <a id="logo" href="index.html">
      <img src="/logo.webp" alt="logo" />
    </a>
    <div class="menu-toggle" @click="toggleMenu">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div :class="{'nav-links': true, 'active': isMenuOpen}">
      <a href="#" @click="logout">Uitloggen</a>
      <a href="#" @click="togglePasswordModal">Wachtwoord wijzigen</a>
    </div>
  </nav>

  <div class="orders-container">
    <div class="header">
      <h2>Bestellingen</h2>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul class="orders-list" v-else>
      <li v-for="order in orders" :key="order._id" class="order-item">
        <div class="order-info">
          <h3>Bestelling #{{ order._id }}</h3>
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
  </div>

  <!-- Modal -->
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
        <button type="button" @click="togglePasswordModal">Annuleren</button>
      </form>
      <p v-if="passwordError" class="error">{{ passwordError }}</p>
      <p v-if="passwordSuccess" class="success">{{ passwordSuccess }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Algemene stijlen */
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

/* Navigatie stijlen */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  background-color: #333;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

nav + .orders-container {
  padding-top: 100px; /* Padding onder navigatie */
}

#logo img {
  height: 40px;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.menu-toggle .bar {
  width: 25px;
  height: 3px;
  background-color: white;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
}

.nav-links a {
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
}

.nav-links a:hover {
  color: #64f243;
  border-bottom: 2px solid #64f243;
}

.nav-links.active {
  display: flex;
}

@media screen and (max-width: 1000px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 10px;
    background-color: #444;
    padding: 1rem;
    border-radius: 5px;
    gap: 1em;
    z-index: 101;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links a {
    text-align: center;
    font-size: 1rem;
    color: white;
  }
}

/* Modal stijlen */
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

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
