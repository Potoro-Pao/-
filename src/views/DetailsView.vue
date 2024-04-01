<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-8">
        <div class="card">
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
                <h5 class="card-title">{{ product.title }}</h5>
                <hr class="my-4" />
                <p class="card-text">
                  <strong>Book Info</strong> <br /><br />
                  Author: {{ this.format.author }}<br />
                  ISBN: {{ this.format.ISBN }}<br />
                  Pages: {{ this.format.pages }}<br />
                  Publisher: {{ this.format.publisher }}<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Price & Checkout Card -->
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ product.price }}</h5>
            <h5
              v-if="product.origin_price !== product.price"
              class="card-title"
            >
              <del>{{ product.origin_price }}</del>
            </h5>
            <p style="block">Free Delivery Worldwide</p>

            <div class="input-group mb-3">
              <button
                class="btn btn-outline-secondary"
                v-if="qty > 1"
                @click="qty--"
                type="button"
              >
                -
              </button>
              <input type="text" class="form-control" :value="qty" readonly />
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
              @click.prevent="addToCart(product.id, this.qty)"
              class="btn btn-primary"
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
      <p class="card-text" style="line-height: 2; font-size: 1.125rem">
        {{ product.content }}
      </p>
    </div>
    <div class="container">
      <div class="row">
        <h3
          v-if="product.imagesUrl && product.imagesUrl.length > 0"
          class="mb-3"
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
      format: {
        author: '',
        ISBN: '',
        pages: '',
        publisher: '',
      },
    };
  },
  methods: {
    formated(format) {
      this.format = JSON.parse(format);
    },

    ...mapActions(cartStore, ['addToCart']),
    getProduct() {
      const { id } = this.$route.params;
      axios.get(`${VITE_URL}/api/${VITE_API}/product/${id}`).then((res) => {
        this.product = res.data.product;
        this.formated(this.product.description);
      });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
