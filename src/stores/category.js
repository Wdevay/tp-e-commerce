import { defineStore } from "pinia";
import {ref} from "vue";
import categories from '@/data/categoryList.json'

const STORE_NAME = "category";
const STORE_LOCALE_STORAGE_KEY = "categories";

const getDefaultState = () => categories;
const getCurrentState = () => {
  const localeData = localStorage.getItem(STORE_LOCALE_STORAGE_KEY);
  return localeData ? JSON.parse(localeData) : getDefaultState();
}


export const useCategoryStore = defineStore(STORE_NAME, () => {
  const input_category= ref(null)
  const categories = ref(getCurrentState())
  function updateLocaleStorage() {
    localStorage.setItem(
      STORE_LOCALE_STORAGE_KEY,
      JSON.stringify(categories.value)
    );
  }
  console.log(categories.value.length)

  function getCategoryById(id) {
    return categories.value.find((category) => category.id === id);
  }
  function getCategoryByName(name) {
    return categories.value.find((category) => category.name === name);
  }
  function addCategory() {
    if (input_category.value.trim() === '' ){
      return
    }
    categories.value.push({
      id: Math.floor(Math.random() * Date.now()),
      name: input_category.value,
    })
    input_category.value = null
    updateLocaleStorage()
  }

  function removeCategory(category) {
    categories.value = categories.value.filter(t=> t !== category)
    updateLocaleStorage()
  }

  return { getCategoryById, getCategoryByName,categories,addCategory,removeCategory,input_category,updateLocaleStorage };
})

