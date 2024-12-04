<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Declareren van de variabelen voor email, wachtwoord, foutmelding en de router
const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter(); // Gebruik useRouter om de router binnen te halen

// Inlogfunctie die controleert of email en wachtwoord juist zijn
function login() {
  if (email.value === 'admin@admin.com' && password.value === 'Admin') {
    // Sla een "token" op om aan te geven dat de gebruiker is ingelogd
    localStorage.setItem('token', 'admin-token');

    // Navigeer naar de orderspagina
    router.push('/orders');
  } else {
    // Toon een foutmelding als de inloggegevens onjuist zijn
    error.value = 'Onjuiste inloggegevens. Probeer het opnieuw.';
  }
}
</script>

<template>
  <div class="login">
    <h2>Admin Login</h2>
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Wachtwoord">
    <button @click="login">Inloggen</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.login {
  max-width: 300px;
  margin: 100px auto;
  text-align: center;
}
input {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
}
button:hover {
  background-color: #555;
}
p {
  color: red;
}
</style>
