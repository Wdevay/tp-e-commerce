<script setup></script>

<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Categories
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Viande</a></li>
      <li><a class="dropdown-item" href="#">Légume</a></li>
      <li><a class="dropdown-item" href="#">Boisson</a></li>
      <li><a class="dropdown-item" href="#">Confiserie</a></li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  margin-right: 10rem;
}
</style>
