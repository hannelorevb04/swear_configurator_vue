<template>
  <div class="order-detail">
    <h2>Bestelling Details</h2>
    <p><strong>Klant:</strong> {{ order.customer.name }}</p>
    <p><strong>Email:</strong> {{ order.customer.email }}</p>
    <p><strong>Adres:</strong> {{ order.customer.address }}</p>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Configuratie:</strong></p>
    <ul>
      <li>Kleur: {{ order.sneakerConfig.color }}</li>
      <li>Maat: {{ order.sneakerConfig.size }}</li>
      <li>Extra's: {{ order.sneakerConfig.extras.join(', ') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: null
    };
  },
  async created() {
    const orderId = this.$route.params.id;
    try {
      const response = await fetch(`https://your-backend-api.com/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.order = await response.json();
    } catch (error) {
      console.error('Fout bij het ophalen van bestelling details:', error);
    }
  }
};
</script>

<style scoped>
.order-detail {
  padding: 2em;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 5px;
}
</style>
