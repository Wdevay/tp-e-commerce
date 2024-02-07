<script>
    import { mapState } from 'pinia'
    import { useAppStore  } from '@/stores'

    export default {
        name: "AdminDashboard",
        computed: {
            ...mapState(useAppStore, ["getIsAuthenticated", "getIsAdmin"])
        }
    }
</script>
<template>
    <h1>Admin Dashboard</h1>
    <button
      v-if="getIsAuthenticated && getIsAdmin"
      class="btn btn-lg btn-warning text-center"
      @click="$router.push({ name: 'ProductAdmin' })"
    >
      Products
    </button>
    <button
      v-if="getIsAuthenticated && getIsAdmin"
      class="btn btn-lg btn-info text-center"
      @click="$router.push({ name: 'CategoriesAdmin' })"
    >
      Categories
    </button>

</template>