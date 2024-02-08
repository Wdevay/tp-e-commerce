<script>
import { mapState } from "pinia";
import { useProductsStore } from "@/stores";
import { ProductDetailsCard } from "@/components";

export default {
  name: "ProductListPage",
  components: {
    ProductDetailsCard,
  },
  computed: {
    ...mapState(useProductsStore, ["getProducts"]),
  },
};
</script>
<template>
  <section class="product-list">
    <product-details-card
      v-for="product in getProducts"
      :key="product.id"
      :product="product"
      class="product"
    />
  </section>
</template>

<style scoped>
.product-list {
  display: flex;
  justify-content: space-evenly;
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
