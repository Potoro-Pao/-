<template>
  <div class="container my-5">
    <div class="row">
      <!-- Product Information and Checkout Card -->
      <div class="col-lg-8 d-flex">
        <div class="card rounded-0 flex-grow-1 mr-lg-2">
          <div class="row g-0">
            <div class="col-md-5">
              <img
                :src="product.imageUrl"
                class="img-fluid rounded-start"
                alt="Product Image"
              />
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title" style="font-weight: bold">
                  {{ product.title }}
                </h5>
                <hr class="my-4" />
                <p class="card-text">
                  <strong>Book Info</strong> <br /><br />
                  Author: {{ format.author }}<br />
                  ISBN: {{ format.ISBN }}<br />
                  Pages: {{ format.pages }}<br />
                  Publisher: {{ format.publisher }}<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 d-flex">
        <div class="card rounded-0 flex-grow-1 ml-lg-2">
          <div class="card-body">
            <h5 class="card-title" style="color: green">
              ${{ product.price }} NTD
            </h5>
            <h5
              v-if="product.origin_price !== product.price"
              class="card-title text-muted"
              style="color: red"
            >
              <del>${{ product.origin_price }} NTD</del>
            </h5>
            <p>Free Delivery Worldwide</p>
            <div class="input-group mb-3">
              <button
                class="btn btn-outline-secondary"
                v-if="qty > 1"
                @click="qty--"
                type="button"
              >
                -
              </button>
              <input
                type="text"
                class="form-control"
                :value="qty"
                readonly
                style="text-align: center"
              />
              <button
                class="btn btn-outline-secondary"
                @click="qty++"
                type="button"
              >
                +
              </button>
            </div>
            <button
              type="button"
              @click.prevent="addToCart(product.id, qty)"
              class="btn btn-primary w-100 mt-9"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <h3>Short Description</h3>
      <!-- Only render the content when it exists -->
      <div v-if="product.content" class="col-md-8">
        <p
          class="card-text"
          style="line-height: 2; font-size: 1.125rem"
          v-if="!showFullContent"
        >
          {{ product.content.substring(0, 100) + '...' }}
          <button @click="toggleContent" class="btn btn-link">Read more</button>
        </p>
        <p class="card-text" style="line-height: 2; font-size: 1.125rem" v-else>
          {{ product.content }}
          <button @click="toggleContent" class="btn btn-link">Read less</button>
        </p>
      </div>
      <p v-else>Loading description...</p>
    </div>
  </div>
  <div class="container">
      <div class="row">
        <h3
          v-if="product.imagesUrl && product.imagesUrl.length > 0"
          class="mb-5 mt-4"
        >
          Image Gallery
        </h3>
        <div class="row g-3">
          <div
            v-if="product.imagesUrl && product.imagesUrl.length > 0"
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
          >
            <div
              v-for="(image, index) in product.imagesUrl"
              :key="index"
              class="col"
            >
              <div class="h-100">
                <img
                  :src="image"
                  class="img-fluid"
                  style="height: 500px; width: 100%; object-fit: cover"
                  alt="Product Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import cartStore from '../stores/cartStore';

const { VITE_URL, VITE_API } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      qty: 1,
      showFullContent: false, // Control display state of content
      format: {
        author: '',
        ISBN: '',
        pages: '',
        publisher: '',
      },
    };
  },
  methods: {
    formatted(format) {
      this.format = JSON.parse(format);
    },
    toggleContent() {
      this.showFullContent = !this.showFullContent; // Toggle content display state
    },
    ...mapActions(cartStore, ['addToCart']),
    getProduct() {
      const { id } = this.$route.params;
      axios.get(`${VITE_URL}/api/${VITE_API}/product/${id}`).then((res) => {
        this.product = res.data.product;
        this.formatted(this.product.description);
      });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
