<template>
  <BgC></BgC>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 mt-5 font-weight-normal text-center">Admin Log in</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="loginCheck">
          <div class="form-floating mb-3">
            <input
              @keyup.enter="loginCheck"
              v-model="user.account"
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              @keyup.enter="loginCheck"
              v-model="user.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            id="loginBtn"
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
          >
            Log in
          </button>
          <button
            @click="logBackHome"
            class="btn btn-lg btn-secondary w-100 mt-3"
          >
            Back to Home Page
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'bootstrap';
import BgC from '../../components/BgComponent.vue';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {
        account: null,
        password: null,
      },
    };
  },
  components: {
    BgC,
  },
  methods: {
    logBackHome() {
      this.$router.push('/');
    },
    loginCheck() {
      const user = {
        username: this.user.account,
        password: this.user.password,
      };
      axios
        .post(`${VITE_URL}/admin/signin`, user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexVueToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/admin/products');
          // axios.defaults.headers.common["Authorization"] = token;
          //   window.location.href = 'index.html';
        })
        .catch(() => {
          this.showToast(
            'Login failed. Please check your credentials and try again.',
            'bg-danger',
          );
        });
    },
    showToast(message, className) {
      const toastContainer = document.createElement('div');
      toastContainer.style.position = 'fixed';
      toastContainer.style.top = '1rem';
      toastContainer.style.right = '1rem';
      toastContainer.style.zIndex = '1050';
      const toastEl = document.createElement('div');
      toastEl.className = `toast align-items-center text-white ${className} border-0`;
      toastEl.role = 'alert';
      toastEl.ariaLive = 'assertive';
      toastEl.ariaAtomic = 'true';
      toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>`;

      toastContainer.appendChild(toastEl);

      document.body.appendChild(toastContainer);

      const toast = new Toast(toastEl);
      toast.show();

      setTimeout(() => {
        toastEl.remove();
        toastContainer.remove();
        this.$router.push({ name: 'NotFound' });
      }, 2500);
    },
  },
};
</script>
