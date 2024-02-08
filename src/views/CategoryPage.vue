<script>
import { mapState } from "pinia";
import { useProductsStore, useCategoryStore } from "@/stores";
import { ProductDetailsCard } from "@/components";

export default {
  name: "ProductListPage",
  data() {
    return {
      activeCategory: null,
    }
  },
  mounted() {
    this.activeCategory = this.getCategoryByName(this.$route.params.categoryName)
  },
  components: {
    ProductDetailsCard,
  },
  computed: {
    ...mapState(useProductsStore, ["getProductsByCategory"]),
    ...mapState(useCategoryStore, ["getCategoryByName"]),
  },
};
</script>
<template>
  <section>
    <h2 style="margin-bottom: 30px;">{{ $route.params.categoryName }}</h2>
    <div
      v-for="product in getProductsByCategory($route.params.categoryName)"
      class="product-list"
    >
      <product-details-card
      v-if="!product.length"
      :key="product.id"
      :product="product"
      class="product"
      />
      
      <div v-else>
        <h3>Cette categorie n'a pas d'articles</h3>
      </div>
  </div>
  </section>
</template>

<style scoped>
.product-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.product {
  flex-basis: 28%;
  margin: 8px;
  padding: 16px;
  box-shadow: 0px 0px 14px 1px;
  cursor: pointer;
}
</style>
