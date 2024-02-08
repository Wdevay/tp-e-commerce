import { defineStore } from "pinia";
import { ref, onMounted, computed, watch } from "vue";
import { useProductsStore } from "./products";

const STORE_NAME = "cart";
const STORE_LOCALE_STORAGE_KEY = "carts";

const cart = ref([]);
const getDefaultState = () => cart;
const getCurrentState = () => {
  const localeData = localStorage.getItem(STORE_LOCALE_STORAGE_KEY);
  return localeData ? JSON.parse(localeData) : getDefaultState();
};

export const useCartStore = defineStore(STORE_NAME, () => {
  const store = useProductsStore();
  const products = store.products;
  const carts = ref(getCurrentState());
  function updateLocaleStorage() {
    localStorage.setItem(STORE_LOCALE_STORAGE_KEY, JSON.stringify(carts.value));
  }
  function addToCart(product) {
    const uuid = Math.floor(Math.random() * Date.now());
    const productToCart = { ...product, uuid };
    carts.value.push(productToCart);
    updateLocaleStorage();
  }

  function removeFromCart(productUuid) {
    carts.value = carts.value.filter((el) => {
      return el.uuid != productUuid;
    });
    console.log(cart);
    updateLocaleStorage();
  }
  return { addToCart, removeFromCart, carts };
});
