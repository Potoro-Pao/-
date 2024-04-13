<template>
  <loading v-model:active="isLoading"></loading>
  <div class="container mt-5">
    <h2>Categories</h2>
    <div class="row my-4">
      <div id="categoriesScroll" class="overflow-auto">
        <nav class="nav d-flex flex-nowrap">
          <router-link class="nav-link py-2 px-3 text-muted" :to="`/products`"
            >All</router-link
          >
          <router-link
            v-for="item in categories"
            :key="item"
            class="nav-link py-2 px-3 text-muted"
            :to="`/products?categories=${item}`"
            >{{ item }}</router-link
          >
        </nav>
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-4 d-flex align-items-stretch"
        v-for="product in products"
        :key="product.id"
      >
        <router-link :to="`/product/${product.id}`"
         class="card mb-3 w-100 d-flex flex-column text-decoration-none">
          <img
            style="object-fit: contain; height: 250px;"
            :src="product.imageUrl"
            class="card-img-top"
            alt="Product Image"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text flex-grow-1">NTD ${{ product.price }}</p>
            <a
              @click.prevent="addToCart(product.id)"
              href="#"
              class="btn btn-outline-info w-100"
              >Add to Cart</a
            >
          </div>
        </router-link>
      </div>

      <pagC :pages="pages" :getProduct="getProduct" basePath="#/" />
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import axios from 'axios';
import { mapActions } from 'pinia';
import cartStore from '../stores/cartStore';
import pagC from '../components/PaginationComponent.vue';

const { VITE_URL, VITE_API } = import.meta.env;

export default {
  components: {
    Loading,
    pagC,
  },
  data() {
    return {
      isLoading: true,
      products: [],
      categories: [
        'Comic',
        'History',
        'Young Adult',
        'Drama',
        'Novel',
        'Sci-Fi',
        'Murder',
        'TextBook',
      ],
      pages: {},
    };
  },
  watch: {
    '$route.query': {
      handler() {
        this.getProduct();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),

    getProduct(page = 1) {
      const { categories = '' } = this.$route.query;
      const api = `${VITE_URL}/api/${VITE_API}/products?page=${page}&category=${categories}`;
      axios.get(api).then((res) => {
        this.products = res.data.products;
        this.pages = res.data.pagination;
        this.isLoading = false;
      });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style>
/* Add some hover effect for the card */
.card:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>
