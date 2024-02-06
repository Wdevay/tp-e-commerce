<script setup>
import { useCategoryStore } from "@/stores/category";
import { useProductsStore } from "@/stores/products";
import categories from "@/data/categoryList.json";

const { selectCategory } = useCategoryStore();
const { getFilteredProducts } = useProductsStore();
const selectCategoryAndProducts = (category) => {
  const list = selectCategory(category.name);
  console.log(list);
};
</script>

<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Categories
    </button>
    <ul class="dropdown-menu">
      <li
        v-for="(category, index) in categories"
        :key="index"
        :class="{ active: activeCategory === category }"
        @click="selectCategoryAndProducts(category)"
      >
        {{ category.name }}
      </li>
    </ul>
    <div class="selected-products">
      <div v-for="(product, index) in getFilteredProducts" :key="index">
        {{ product.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  margin-right: 10rem;
}
</style>
