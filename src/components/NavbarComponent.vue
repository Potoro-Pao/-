<template>
  <nav
    class="navbar navbar-expand-lg"
    style="background-color: #504152; padding: 0.5rem 1rem"
  >
    <router-link
      v-if="isFrontView"
      class="navbar-brand p-2"
      style="color: #f4f4f4; font-size: 24px"
      to="/"
      >Bookstore</router-link
    >
    <router-link
      v-else
      class="navbar-brand p-2"
      style="color: #f4f4f4; font-size: 24px"
      to="/"
      >Bookstore</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item me-4">
          <router-link
            v-if="isFrontView"
            class="nav-link active"
            style="color: #eae0d5; font-size: 18px"
            to="/"
            >Home</router-link
          >
          <router-link
            v-else
            class="nav-link active"
            style="color: #eae0d5; font-size: 18px"
            to="/admin/products"
            >Products</router-link
          >
        </li>
        <li class="nav-item me-4">
          <router-link
            v-if="isFrontView"
            class="nav-link"
            style="color: #eae0d5; font-size: 18px"
            to="/products"
            >Products</router-link
          >
          <router-link
            v-else
            class="nav-link"
            style="color: #eae0d5; font-size: 18px"
            to="/admin/order"
            >Orders</router-link
          >
        </li>
        <li class="nav-item me-4">
          <router-link
            v-if="isFrontView"
            class="nav-link"
            style="color: #eae0d5; font-size: 18px"
            to="/about"
            >About</router-link
          >
          <router-link
            v-else
            class="nav-link"
            style="color: #eae0d5; font-size: 18px"
            to="/admin/coupon"
            >Coupon</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link v-if="isFrontView" class="btn pe-5" to="/cart">
            <div class="position-relative">
              <i
                style="color: #eae0d5; font-size: 24px"
                class="bi bi-cart-fill"
              ></i>
              <span
                class="position-absolute top-0 start-100
                translate-middle badge rounded-pill bg-danger"
                style="transform: translate(-50%, -50%)"
              >
                {{ this.cart?.length }}
                <!-- 使用pinia的值 -->
                <span class="visually-hidden">unread messages</span>
              </span>
            </div>
          </router-link>
        </li>
        <li class="nav-item me-4">
          <router-link
            v-if="isFrontView"
            class="nav-link"
            style="color: #eae0d5; font-size: 18px"
            to="/login"
            >Log in</router-link
          >
          <!-- 登出按钮 -->
          <button
            v-if="!isFrontView"
            class="nav-link btn"
            style="
              color: #eae0d5;
              font-size: 18px;
              background-color: transparent;
            "
            @click="logOut"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'pinia';
import cartStore from '../stores/cartStore';

const { VITE_URL } = import.meta.env;

export default {
  props: ['basePath'],
  data() {
    return {
      isFrontView: true,
    };
  },
  computed: {
    ...mapState(cartStore, ['cart']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    logOut() {
      const api = `${VITE_URL}/logout`;
      axios
        .post(api)
        .then(() => {
          this.clearCookies('hexVueToken');
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error('Logout failed:', error);
        });
    },
    clearCookies(name) {
      document.cookie = `${name} =; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    },
  },
  mounted() {
    if (this.basePath === '#/') {
      this.getCart();
    } else {
      this.isFrontView = false;
    }
  },
};
</script>
