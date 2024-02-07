<script setup>
import {ref, onMounted, watch} from 'vue'

const categories = ref ([])

const input_category = ref(null)

// const todos_asc = computed(() => todos.value.sort((a,b) => b.createdAt - a.createdAt))

const addCategory = () => {
  if (input_category.value.trim() === '' ){
    return
  }
  categories.value.push({
    id: Math.floor(Math.random() * Date.now()),
    category: input_category.value,
  })
  input_category.value = null
}

const removeCategory = (category) => {
  categories.value = categories.value.filter(t=> t !== category)
}

watch(categories, (newVal) => {
  localStorage.setItem('categories',JSON.stringify(newVal))
})



onMounted(() => {
  categories.value = JSON.parse(localStorage.getItem('categories')) || []
})


</script>

<template>

    <section class="create-categories">
      <h2>ADMIN CATEGORIES</h2>

      <form @submit.prevent="addCategory">
        <h3>Ajouter une nouvelle catégorie</h3>
        <input 
        type="text" 
        placeholder="ex : vegetable"
        v-model="input_category"/>

      <input type="submit" value="Add Category"/>
      </form>
    </section>

   <section class="categories-list">
    <h3>Liste des catégories</h3>
    <div class="list">

      <div v-for="category in categories">
        
        <span>{{ category.id }}</span>

        <div class="category-name">
          <input type="text" v-model="category.category"/>
        </div>

        <div class="actions">
          <button class="btn btn-danger" @click="removeCategory(category)">Delete</button>
        </div>

      </div>

    </div>

   </section>

</template>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}

input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

body {
	background: var(--light);
	color: var(--dark);
}

section {
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding-left: 1.5rem;
	padding-right: 1.5em;
}

h3 {
	color: var(--dark);
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}

h4 {
	color: var(--grey);
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}


.create-categories input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: var(--dark);
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1.5rem;
}

.create-categories .options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	margin-bottom: 1.5rem;
}

.create-categories .options label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	cursor: pointer;
}

input[type="radio"],
input[type="checkbox"] {
	display: none;
}

.bubble {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--business);
	box-shadow: var(--business-glow);
}

.bubble.personal {
	border-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble::after {
	content: "";
	display: block;
	opacity: 0;
	width: 0px;
	height: 0px;
	background-color: var(--business);
	box-shadow: var(--business-glow);
	border-radius: 50%;
	transition: 0.2s ease-in-out;
}

.bubble.personal::after {
	background-color: var(--personal);
	box-shadow: var(--personal-glow);
}

input:checked ~ .bubble::after {
	width: 10px;
	height: 10px;
	opacity: 1;
}

.create-categories .options label div {
	color: var(--dark);
	font-size: 1.125rem;
	margin-top: 1rem;
}

.create-categories input[type="submit"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: #FFF;
	background-color: var(--primary);
	border-radius: 0.5rem;
	box-shadow: var(--personal-glow);
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.create-categories input[type="submit"]:hover {
	opacity: 0.75;
}

.categories-list .list {
	margin: 1rem 0;
} 

.categories-list .todo-item {
	display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}

.categories-item label {
	display: block;
	margin-right: 1rem;
	cursor: pointer;
}

.categories-item .categories-content {
	flex: 1 1 0%;
}

.categories-item .categories-content input {
	color: var(--dark);
	font-size: 1.125rem;
}

.categories-item .actions {
	display: flex;
	align-items: center;
}

.categories-item .actions button {
	display: block;
	padding: 0.5rem;
	border-radius: 0.25rem;
	color: #FFF;
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.categories-item .actions button:hover {
	opacity: 0.75;
}

.categories-item .actions .edit {
	margin-right: 0.5rem;
	background-color: var(--primary);
}

.categories-item .actions .delete {
	background-color: var(--danger);
}



</style>
