<script setup>
import { useRouter } from "vue-router";
import { useProductsStore } from "../stores/products";

const router = useRouter();
const store = useProductsStore();
const vtaCalculation = (price, vta) => {
  if (typeof price != "number") {
    /* throw new Error('Parameter is not a number!') */
    return "Error price is not a number";
  }
  let tax = (price / 100) * vta;
  return price + tax;
};
const deleteFromCart = (id) => {
  store.removeFromCart(id);
};
</script>

<template>
  <section>
    <p>Items in Cart: {{ store.cart.length }}</p>
    <button class="btn btn-lg btn-success text-center" @click="router.push({ name: 'ProductListPage' })">Back to Product List</button>
    <div v-if="!store.cart.length" style="text-align: center">
      <h1>Empty Cart...</h1>
    </div>
    <div class="cart-items" v-else="">
      <div class="cart-item" v-for="item in store.cart" :key="item.id">
        <br>
        <div class="item-details">
          <span
            @click="router.push({name: 'ProductDetailsPage', params: {id: item.id}})"
            class="cart-item-name"
            >{{ item.name }}</span
          >
          <span>{{ item.category }}</span>
          <span>{{ item.price }}</span>
          <span>
            tva :{{ item.vta }}% - {{ vtaCalculation(item.price, item.vta) }}€
            TTC</span
          >
          <button @click="deleteFromCart(item.uuid)" class="btn">Remove</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}

.btn {
  top: 50%;
  background-color: #ffbf00;
  color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px #ffbf00;
}
.btn:hover {
  background-color: #2c8d41;
  box-shadow: 0px 0px 2px 2px #2c8d41;
  transition: 0.7s;
}

.cart-item-name:hover {
  cursor: pointer;
  color: #ffbf00;
}


</style>
