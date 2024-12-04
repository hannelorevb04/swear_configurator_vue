<template>
  <div class="login">
    <h2>Admin Login</h2>
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Wachtwoord">
    <button @click="login">Inloggen</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
login() {
  // Controleer of de ingevoerde email en wachtwoord juist zijn
  if (this.email === 'admin@admin.com' && this.password === 'Admin') {
    // Sla een token op in localStorage (om aan te geven dat de gebruiker is ingelogd)
    localStorage.setItem('token', 'admin-token');

    // Navigeer naar de orderspagina
    this.$router.push('/orders');
  } else {
    // Toon een foutmelding als de gegevens niet juist zijn
    this.error = 'Onjuiste inloggegevens. Probeer het opnieuw.';
  }
}

  }
};
</script>

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
