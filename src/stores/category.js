import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductsStore } from "./products";

export const useCategoryStore = defineStore("category", () => {
  const store = useProductsStore();
  const products = store.products;
  let activeCategory = null;
  let filteredProducts = ref([]);

  //分类选择逻辑: 我们定义了一个 selectCategory方法，该方法会设置 activeCategory 并筛选出该分类下的所有商品。
  function selectCategory(category) {
    console.log(`selectCategory: ${category}`);
    activeCategory = category; // 存储当前选中的分类
    filteredProducts = products.filter(
      (product) => product.category === activeCategory.id
    );

    return filteredProducts;
  }
  return { selectCategory, activeCategory };
});
