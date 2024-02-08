<script setup>
import { useCategoryStore } from "@/stores";
import { storeToRefs } from 'pinia';



const storage = useCategoryStore()

const { categories, input_category } = storeToRefs(storage)
const { addCategory, removeCategory, updateLocaleStorage } = storage


</script>

<template>

    <section class="create-categories">
      <h2>ADMIN CATEGORIES</h2>

      <form @submit.prevent="addCategory">
        <h3>Ajouter une nouvelle catégorie</h3>
        <input 
			type="text" 
			placeholder="ex : vegetable"
			v-model="input_category"
		/>
      	<input type="submit" value="Ajouter catégorie" @click="updateLocaleStorage"/>
      </form>
    </section>

   <section class="categories-list">
    <h3>Liste des catégories</h3>
    <div class="list">

      <div class="categories-item" v-for="category in categories">
        
        <div class="category-name">
          <input type="text" v-model="category.name" @keypress="updateLocaleStorage"/>
        </div>

        <div class="actions">
          <button class="delete" @click="removeCategory(category) && updateLocaleStorage">Delete</button>
        </div>

      </div>

    </div>

   </section>

</template>

<style scoped>

* {
	--primary: #ffa801;
	--business: #0fbcf9;
	--personal: var(--primary);
	--light: #EEE;
	--grey: #888;
	--dark: #313154;
	--dang: #ff5b57;

	--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

	--business-glow: 0px 0px 4px rgba(rgba(15, 188, 249,0.75));
	--personal-glow: 0px 0px 4px rgba(rgba(255, 168, 1,0.75));
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}
template {
	display: flex;
}

input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

body {
	background: #EEE;
	color: #313154;
}

section {
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding-left: 1.5rem;
	padding-right: 1.5em;
}

h3 {
	color: #313154;
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}

h4 {
	color: #888;
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}


.create-categories input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: #313154;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	cursor: pointer;
}


.create-categories .options label div {
	color: #313154;
	font-size: 1.125rem;
	margin-top: 1rem;
}

.create-categories input[type="submit"] {
	display: block;
	/* width: 20%; */
	font-size: 1.125rem;
	padding: 0.75rem 1.25rem;
	color: #FFF;
	background-color: #0fbcf9;
	border-radius: 0.5rem;
	box-shadow: 0px 0px 4px rgba(rgba(255, 168, 1,0.75));
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.create-categories input[type="submit"]:hover {
	opacity: 0.75;
}

.categories-list .list {
	margin: 1rem 0;
} 

.categories-list .categories-item {
	display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	margin-bottom: 1rem;
}


.categories-item .category-name {
	flex: 1 1 0%;
}

.categories-item .category-name input {
	color: #313154;
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
	background-color: #0fbcf9;
}

.categories-item .actions .delete {
	background-color: #ff5b57;
}



</style>
