<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]); 
const error = ref(null); 


const fetchProducts = async () => {
  try {
    const response = await axios.get('https://sneaker-configurator-api-ak6n.onrender.com/api/v1/products');
    products.value = response.data.data.products;
  } catch (err) {
    console.error('Er is een fout opgetreden bij het ophalen van de producten:', err);
    error.value = 'Kan de producten niet ophalen. Probeer het later opnieuw.';
  }
};


onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="products-container">
    <h2>Alle Producten</h2>

    <!-- fouten weergeven -->
    <div v-if="error" class="error">{{ error }}</div>

    
    <div v-else>
      <ul class="products-list">
        <li v-for="product in products" :key="product._id" class="product-item">
          <h3>Product #{{ product._id }}</h3>
          <p><strong>Model:</strong> {{ product.model }}</p>
          <p><strong>Basisprijs:</strong> € {{ product.startPrice }}</p>
          <p><strong>Maat:</strong> {{ product.size }}</p>
          <div>
            <h4>Kleuren:</h4>
            <ul>
              <li><strong>Zool:</strong> {{ product.colors.sole }}</li>
              <li><strong>Veters:</strong> {{ product.colors.laces }}</li>
              <li><strong>Buitenkant 1:</strong> {{ product.colors.outside_1 }}</li>
              <li><strong>Buitenkant 2:</strong> {{ product.colors.outside_2 }}</li>
            </ul>
          </div>
          <div>
            <h4>Materialen:</h4>
            <ul>
              <li><strong>Zool:</strong> {{ product.materials.sole }}</li>
              <li><strong>Veters:</strong> {{ product.materials.laces }}</li>
              <li><strong>Buitenkant 1:</strong> {{ product.materials.outside_1 }}</li>
              <li><strong>Buitenkant 2:</strong> {{ product.materials.outside_2 }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
*{
  font-family: sans-serif;
}
.products-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.products-list {
  list-style: none;
  padding: 0;
}

.product-item {
  background: white;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
