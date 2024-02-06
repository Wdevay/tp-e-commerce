<script setup>
import { storeToRefs } from "pinia";
import { useProductsStore } from "../stores/products";

// In order to extract properties from the store while keeping its reactivity, you need to use storeToRefs(). It will create refs for every reactive property. This is useful when you are only using state from the store but not calling any action.
const { getFilteredProducts } = storeToRefs(useProductsStore());
const vtaCalculation = (price, vta) => {
  if (typeof price != "number") {
    /* throw new Error('Parameter is not a number!') */
    return "Error price is not a number";
  }
  let tax = (price / 100) * vta;
  return price + tax;
};
</script>
<template>
  <section>
    <ul v-for="product in getFilteredProducts" :key="product.id">
      <div class="item_details">
        <span>{{ product.name }}</span>
        <span>{{ product.category }}</span>
        <span>{{ product.price }}€</span>
        <span>
          tva :{{ product.vta }}% -
          {{ vtaCalculation(product.price, product.vta) }}€ TTC
        </span>
        <router-link
          :to="{ name: 'ProductDetailsPage', params: { id: product.id } }"
          class="btn btn-primary"
        >
          Voir L'article
        </router-link>
      </div>
    </ul>
  </section>
</template>

<style scoped>
.item_details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}
</style>
