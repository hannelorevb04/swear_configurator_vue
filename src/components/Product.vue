<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const productId = route.params.id;
  try {
    const response = await axios.get(`https://sneaker-configurator-api-ak6n.onrender.com/api/v1/products/${productId}`);
    product.value = response.data.data.product; 
  } catch (error) {
    console.error('Fout bij het ophalen van het product:', error);
  }
});
</script>

<template>
  <div v-if="product" class="product-detail-container">
    <h2>Product Details</h2>
    <p><strong>Model:</strong> {{ product.model }}</p>
    <p><strong>Prijs:</strong> € {{ product.startPrice }}</p>
    <p><strong>Maat:</strong> {{ product.size }}</p>
    <p><strong>Kleuren:</strong></p>
    <ul>
      <li>Zool: {{ product.colors.sole }}</li>
      <li>Veters: {{ product.colors.laces }}</li>
      <li>Buitenkant 1: {{ product.colors.outside_1 }}</li>
      <li>Buitenkant 2: {{ product.colors.outside_2 }}</li>
    </ul>
    <p><strong>Materialen:</strong></p>
    <ul>
      <li>Zool: {{ product.materials.sole }}</li>
      <li>Veters: {{ product.materials.laces }}</li>
      <li>Buitenkant 1: {{ product.materials.outside_1 }}</li>
      <li>Buitenkant 2: {{ product.materials.outside_2 }}</li>
    </ul>
  </div>
  <div v-else>
    <p>Product niet gevonden.</p>
  </div>
</template>

<style scoped>
.product-detail-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>
