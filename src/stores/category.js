import { defineStore } from "pinia";
import {ref, onMounted, computed, watch } from "vue";
import { useProductsStore } from "./products";
import categories from '@/data/categoryList.json'

const STORE_NAME = "category";
const STORE_LOCALE_STORAGE_KEY = "categories";

const getDefaultState = () => categories;
const getCurrentState = () => {
  const localeData = localStorage.getItem(STORE_LOCALE_STORAGE_KEY);
  return localeData ? JSON.parse(localeData) : getDefaultState();
}


// const categ = ref(categories)
// console.log("categ:",categ.value)



export const useCategoryStore = defineStore(STORE_NAME, () => {
  const store = useProductsStore();
  const products = store.products;
  let activeCategory = null;
  let filteredProducts = ref([]);
  const input_category= ref(null)
  const categories = ref(getCurrentState())
  function updateLocaleStorage() {
    localStorage.setItem(
      STORE_LOCALE_STORAGE_KEY,
      JSON.stringify(categories.value)
    );
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
  }
  watch(categories, (newVal) => {
    localStorage.setItem('categories', JSON.stringify(newVal))
  })
  

  //分类选择逻辑: 我们定义了一个 selectCategory方法，该方法会设置 activeCategory 并筛选出该分类下的所有商品。
  function selectCategory(category) {
    console.log(`selectCategory: ${category}`);
    activeCategory = category; // 存储当前选中的分类
    filteredProducts = products.filter(
      (product) => product.category === activeCategory.id
    );

    return filteredProducts;
  }
  return { selectCategory, activeCategory,categories,addCategory,removeCategory,input_category,updateLocaleStorage };
});
