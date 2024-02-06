import { defineStore } from "pinia";
/* Importation des données depuis un fichier json - La conversion est automatique */
/* import products from "../data/productList.json" */
/* @ est un raccourcis pour partir du dossier src */
import products from "@/data/productList.json";

const STORE_NAME = "products";
const STORE_LOCALE_STORAGE_KEY = "products";

const getDefaultState = () => products;
const getCurrentState = () => {
  const localeData = localStorage.getItem(STORE_LOCALE_STORAGE_KEY);
  return localeData ? JSON.parse(localeData) : getDefaultState();
};

export const useProductsStore = defineStore(STORE_NAME, {
  state: () => {
    return {
      products: getCurrentState(),
      editProductMode: false,
      productToEditId: null,
      cart: [],
      searchTerm: "",
    };
  },
  getters: {
    getProducts: (state) => state.products,
    getEditProductMode: (state) => state.editProductMode,
    getProductToEditId: (state) => state.productToEditId,
    getProductById: (state) => (id) => {
      console.log("store product id : ", id);
      console.log(state.products.find((product) => product.id == id));
      return state.products.find((product) => product.id == id);
    },
    getSearchTerm: (state) => state.searchTerm,
    getFilteredProducts: (state) => {
      console.log("seqrchhh : ", state.searchTerm);
      if (state.searchTerm.length == 0) {
        return state.products;
      }
      return state.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(state.searchTerm.toLowerCase());
      });
    },
  },
  actions: {
    updateLocaleStorage() {
      localStorage.setItem(
        STORE_LOCALE_STORAGE_KEY,
        JSON.stringify(this.products)
      );
    },
    addProduct(product) {
      this.products.push(product);
      this.updateLocaleStorage();
    },
    updateProduct(product) {
      const index = this.products.findIndex((el) => {
        return el.id === product.id;
      });
      this.products[index] = product;
      this.updateLocaleStorage();
      this.resetEditionMode();
    },
    deleteProduct(productId) {
      /* Ici on va parcourir le tableau products et supprimer le produit transmis */
      this.products = this.products.filter((el) => el.id != productId);
      this.updateLocaleStorage();
    },
    setEditProductMode(mode) {
      this.editProductMode = mode;
    },
    setProductToEditId(id) {
      this.productToEditId = id;
    },
    resetEditionMode() {
      this.productToEditId = null;
      this.editProductMode = false;
    },
    addToCart(product) {
      const uuid = Math.floor(Math.random() * Date.now());
      const productToCart = { ...product, uuid };
      this.cart.push(productToCart);
    },
    removeFromCart(productUuid) {
      this.cart = this.cart.filter((el) => {
        return el.uuid != productUuid;
      });
      console.log(this.cart);
    },
    setSearchTerms(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
});
