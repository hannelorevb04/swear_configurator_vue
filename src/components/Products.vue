<template>
  <div class="product-container">
    <h1>All Products</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="product-list">
      <div v-for="product in products" :key="product._id" class="product-card">
        <h2>{{ product.model }}</h2>
        <p><strong>Price:</strong> €{{ product.startPrice }}</p>
        <p><strong>Size:</strong> {{ product.size }}</p>
        <div>
          <strong>Colors:</strong>
          <ul>
            <li><strong>Sole:</strong> {{ product.colors.sole }}</li>
            <li><strong>Laces:</strong> {{ product.colors.laces }}</li>
            <li><strong>Outside 1:</strong> {{ product.colors.outside_1 }}</li>
            <li><strong>Outside 2:</strong> {{ product.colors.outside_2 }}</li>
          </ul>
        </div>
        <div>
          <strong>Materials:</strong>
          <ul>
            <li><strong>Sole:</strong> {{ product.materials.sole }}</li>
            <li><strong>Laces:</strong> {{ product.materials.laces }}</li>
            <li><strong>Outside 1:</strong> {{ product.materials.outside_1 }}</li>
            <li><strong>Outside 2:</strong> {{ product.materials.outside_2 }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {
      products: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(
          "https://sneaker-configurator-api-ak6n.onrender.com/api/v1/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        this.products = data.data.products;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.product-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.error {
  text-align: center;
  font-size: 18px;
  color: red;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
}

.product-card h2 {
  margin-top: 0;
}

.product-card ul {
  list-style-type: none;
  padding: 0;
}
</style>
