<template>
  <div class="toast-container">
    <ToastComponent ref="TToast" :message="message" :bgClass="type"></ToastComponent>
  </div>
  <nav
    class="navbar navbar-expand-lg fixed-top"
    style="background-color: #504152; padding: 0.5rem 1rem"
  >
    <router-link
      class="navbar-brand p-2"
      :style="{ color: isFrontView ? '#f4f4f4' : '#f4f4f4', fontSize: '24px' }"
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
      <ul v-if="isFrontView" class="navbar-nav mr-auto">
        <li class="nav-item">
          <SearchBarComponent @showFailedToast="handleShowToast"></SearchBarComponent>
        </li>
      </ul>

      <ul class="navbar-nav mx-auto">
        <li class="nav-item me-4">
          <router-link
            :to="isFrontView ? '/products' : '/admin/products'"
            class="nav-link"
            :class="{
              'active-nav-link':
                $route.path === '/products' ||
                $route.path === '/admin/products',
            }"
            style="color: #eae0d5; font-size: 18px"
            >Products</router-link
          >
        </li>
        <li class="nav-item me-4" v-if="!isFrontView">
          <router-link
            to="/admin/order"
            class="nav-link"
            :class="{ 'active-nav-link': $route.path === '/admin/order' }"
            style="color: #eae0d5; font-size: 18px"
            >Orders</router-link
          >
        </li>
        <li class="nav-item me-4">
          <router-link
            :to="isFrontView ? '/about' : '/admin/coupon'"
            class="nav-link"
            :class="{
              'active-nav-link':
                $route.path === '/about' || $route.path === '/admin/coupon',
            }"
            style="color: #eae0d5; font-size: 18px"
            >{{ isFrontView ? 'About' : 'Coupon' }}</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link v-if="isFrontView" class="btn pe-5" to="/cart">
            <div class="position-relative">
              <i
                :class="['bi', cart?.length > 0 ? 'bi-cart-fill' : 'bi-cart']"
                :style="{
                  color: '#eae0d5',
                  fontSize: '24px',
                }"
              ></i>
              <span
                class="position-absolute top-0
                 start-100 translate-middle badge rounded-pill bg-danger"
                style="transform: translate(-50%, -50%)"
              >
                {{ cart?.length }}
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
          <button
            v-else
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
import SearchBarComponent from './SearchBarComponent.vue';
import ToastComponent from './ToastComponent.vue';

const { VITE_URL } = import.meta.env;

export default {
  props: ['basePath'],
  data() {
    return {
      isFrontView: true,
      message: '',
      type: '',
    };
  },
  components: {
    SearchBarComponent,
    ToastComponent,
  },
  computed: {
    ...mapState(cartStore, ['cart']),
  },
  methods: {
    handleShowToast(data) {
      this.$emit('showFailedToast', data);
      this.message = data.message;
      this.type = data.bgClass;
      this.$refs.TToast.showToast();
    },
    ...mapActions(cartStore, ['getCart']),
    logOut() {
      const api = `${VITE_URL}/logout`;
      axios
        .post(api)
        .then(() => {
          this.clearCookies('hexVueToken');
          this.$router.push('/login');
        })
        .catch(() => {
          // console.error('Logout failed:', error);
        });
    },
    clearCookies(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    },
  },
  mounted() {
    this.isFrontView = this.basePath === '#/';
    if (this.isFrontView) {
      this.getCart();
    }
  },
};
</script>

<style>
.toast-container {
  position: fixed;
  top: 70px;
  right: 0;
  z-index: 1050;
  width: auto;
  padding: 1rem;
  pointer-events: none;
}

.toast {
  pointer-events: auto;
}
.nav-link:hover {
  border-bottom: 3px solid #9c80a0;
  padding-bottom: 5px;
}

.active-nav-link {
  color: #9c80a0;
  font-weight: bold;
  border-bottom: 3px solid #9c80a0;
  padding-bottom: 5px;
}
</style>
