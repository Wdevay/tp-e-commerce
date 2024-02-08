<script>
import { mapState, mapActions } from "pinia";
import { useAppStore, useProductsStore, useCategoryStore } from "@/stores";
import nav from "@/data/nav.json";


export default {
  name: "MainNav",
  data() {
    return {
      searchTerm: "",
    };
  },
  watch: {
    searchTerm(oldTerm, newTerm) {
      if (oldTerm != newTerm) {
        this.runSearchMode;
      }
    },
  },
  props: {
    navItems: {
      type: Object,
      required: false,
      default: function () {
        return nav.publicMainNav;
      },
    },
    showUserNav: {
      type: Boolean,
      required: false,
      default: function () {
        return nav.showUserNav;
      },
    },
    userNavItems: {
      type: Object,
      required: false,
      default: function () {
        return nav.userNav;
      },
    },
  },
  computed: {
    ...mapState(useAppStore, ["getIsAuthenticated", "getIsAdmin"]),
    ...mapState(useProductsStore, ["getSearchTerm", "getFilteredProducts"]),
    ...mapState(useCategoryStore, ["selectCategory", "activeCategory","categories"]),
    checkDisplay:
      () =>
      (link, isAuth = false, isAdmin = false) => {
        if (link.meta && link.meta.requiresAuth === true && isAuth === false) {
          return false;
        }
        if (link.meta && link.meta.isAdmin === true && isAdmin === false) {
          return false;
        }
        return true;
      }, 
  },


  methods: {
    ...mapActions(useProductsStore, ["setSearchTerms"]),
    runSearchMode() {
      this.setSearchTerms(this.searchTerm);
      this.$router.push({
        name: "SearchPage",
        // query: {
        //   searchTerm: this.searchTerm,
        // },
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <template
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
      >
      <div class="logo">
        <svg
          class="bi me-2"
          width="40"
          height="32"
          role="img"
          aria-label="Bootstrap"
        >
          <use xlink:href="#bootstrap"></use>
        </svg>
      </div>
      </a>
      <ul
        class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
      >

          <li 
            v-for="(item, index) in navItems.items" :key="index"
          >
            <router-link
              :to="item.link ? item.link : '#'"
              :class="item.class ? item.class : null"
              :target="item.target ? item.target : '_self'"
              class="nav-link px-2 link-secondary"
            >
              {{ item.name ? item.name : "link" }}
            </router-link>
          </li>
      </ul>

      <!-- Category Dropdown -->
      <!-- <div v-if="this.$route.path === '/products'" /> -->
      <div class="dropdown">
        <button
          id="dropdown-toggle"
          class="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Categories
        </button>
        <ul class="dropdown-menu">
          <li
            v-for="(category) in categories"
          >
            <router-link
              :to="{ name: 'CategoryPage', params: { categoryName: category.name }}"
              class="dropdown-item"
            >
              {{ category.name }}
             </router-link> 
          </li>
        </ul>
      </div>
      <!-- End Category Dropdown -->

      <!-- Search Bar -->
      <!-- .prevent表示提交以后不刷新页面,submit点击默认行为是提交表单,这里并不需要它提交,只需要执行runSearchMode方法,故阻止为好。 -->
      <div class="container">
      <form @submit.prevent="runSearchMode()" class="search" role="search">
        <input
          type="text"
          class="form-control"
          placeholder="Enter search term"
          aria-label="Search"
          v-model="searchTerm"
          @input="() => runSearchMode()"
        />
      </form>
    </div>
      <!-- End Search Bar -->

      <!-- Icon Cart -->
      <router-link :to="{ name: 'CartView' }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="cart"
          viewBox="0 0 16 16"
        >
          <path
            d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"
          />
          <path
            d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
          />
        </svg>
      </router-link>
      <!-- End Icon Cart -->

      <router-link
        v-if="getIsAuthenticated === false"
        class="btn btn-success"
        to="/login"
      >
        Connexion
      </router-link>
    </template>
    <div
      v-if="showUserNav === true && getIsAuthenticated === true"
      class="dropdown text-end"
    >
      <a
        href="#"
        class="d-block link-body-emphasis text-decoration-none dropdown-toggle show"
        data-bs-toggle="dropdown"
        aria-expanded="true"
      >
          <img
            src="https://github.com/mdo.png"
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle"
          />
        </a>
        <ul
          class="dropdown-menu text-small"
          data-popper-placement="bottom-end"
          style="
            position: absolute;
            inset: 0px 0px auto auto;
            margin: 0px;
            transform: translate(0px, 34px);
          "
        >
          <li v-for="(item, index) in userNavItems.items" :key="index">
            <router-link
              v-if="checkDisplay(item, getIsAuthenticated, getIsAdmin)"
              :to="item.link ? item.link : '#'"
              :class="item.class ? item.class : null"
              :target="item.target ? item.target : '_self'"
              class="dropdown-item"
            >
              {{ item.name ? item.name : "link" }}
            </router-link>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="/login">Sign out</a></li>
        </ul>
      </div>
    </div>
</template>

<style scoped>
* {
  transition: all 0.3s ease-in-out;
}
.container {
  display: flex;
}
.router-link-active {
  font-weight: bold;
  font-size: 1.25rem;
  color: #42b983;
}
.router-link-active:hover {
  font-size: 1.5rem;
}
.search {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 20rem;
  margin-left: 15rem;
  border: none;
}
.cart {
  margin-left: 2rem;
  margin-right: 2rem;
  color: #42b983;
}

.dropdown {
  margin-right: 15rem;
}

.container {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-color: #42b983;
}

a{
  text-decoration: none;
  color: #ffbf00;
}
/* esaaie logo à gauche 
.logo {
  display: flex;
  align-items: end;
  justify-content: flex-end;
} */
</style>
