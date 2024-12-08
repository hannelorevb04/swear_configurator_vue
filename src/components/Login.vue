

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

async function login() {
  try {
    const response = await axios.post('https://sneaker-configurator-api-ak6n.onrender.com/api/v1/users/login', {
      email: email.value,
      password: password.value,
    });

    // Sla het token op in localStorage
    const token = response.data.data.token;
    localStorage.setItem('token', token);

    // Redirect naar de bestellingenpagina
    router.push('/orders');
  } catch (err) {
    console.error('Inloggen mislukt:', err);
    error.value = 'Inloggen mislukt. Controleer je gegevens.';
  }
}


</script>


<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Admin login</h2>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Wachtwoord" />
      <button @click="login">Inloggen</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
* {
    font-family: sans-serif;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-form {
  background: white;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

input {
  margin-bottom: 10px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 12px 20px;
  width: 100%;
  font-size: 16px;
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

p {
  color: red;
  margin-top: 10px;
}
</style>
