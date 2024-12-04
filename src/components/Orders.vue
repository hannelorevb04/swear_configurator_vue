<template>
  <div v-if="isAuthenticated">
    <h2>Bestellingen</h2>
    <!-- Je bestaande inhoud hier -->
  </div>
  <div v-else>
    <p>U heeft geen toegang. Log in om verder te gaan.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    // Controleer of er een token in localStorage staat
    if (localStorage.getItem('token') === 'admin-token') {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
      this.$router.push('/'); // Stuur de gebruiker terug naar de loginpagina als hij/zij niet is ingelogd
    }
  }
};
</script>
