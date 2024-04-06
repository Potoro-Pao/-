<template>
  <loading v-model:active="isLoading"></loading>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1>Complete Your Information</h1>
        <VForm ref="orderForm" @submit="onSubmit" v-slot="{ errors }">
          <div class="mb-3">
            <label for="email">Email</label>
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="Your Email"
              rules="email|required"
              v-model="user.email"
            />
            <ErrorMessage name="email" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="name">Name</label>
            <VField
              id="name"
              name="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="Your Name"
              rules="required"
              v-model="user.name"
            />
            <ErrorMessage name="name" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="phone">Telephone</label>
            <VField
              id="phone"
              name="phone"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['phone'] }"
              placeholder="Telephone"
              :rules="isPhone"
              v-model="user.tel"
            />
            <ErrorMessage name="phone" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="country">Country</label>
            <VField
              id="country"
              name="country"
              class="form-control"
              :class="{ 'is-invalid': errors['country'] }"
              placeholder="Your Country"
              :rules="isCountry"
              v-model="user.country"
            />
            <ErrorMessage name="country" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="city">City</label>
            <VField
              id="city"
              name="city"
              class="form-control"
              :class="{ 'is-invalid': errors['city'] }"
              placeholder="Your City"
              :rules="isCity"
              v-model="user.city"
            />
            <ErrorMessage name="city" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="address">Address</label>
            <VField
              id="address"
              name="address"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="Address"
              rules="required"
              v-model="user.address"
            />
            <ErrorMessage name="address" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="message">Message</label>
            <textarea
              id="message"
              class="form-control"
              rows="10"
              placeholder="Write something"
              v-model="user.message"
            ></textarea>
          </div>

          <div class="text-end">
            <div class="text-end">
              <button type="submit" class="btn btn-danger text-white">
                Review Order
              </button>
            </div>
          </div>
        </VForm>
      </div>
    </div>
  </div>
  <div
    class="modal right fade"
    ref="orderModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="orderModalLabel">Order Summary</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-for="goods in this.cart" :key="goods.id">
            <div>
              <strong>{{ goods.product.title }}</strong>
            </div>
            <div>${{ goods.product.price }}</div>
          </div>
          <hr />
          <p>Origin Price: {{ this.total }}</p>
          <p class="text-success">Discount: {{ this.discount }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Your Name: {{ user.name }}</p>
          <p class="text-danger">Total Amount: ${{ this.final_total }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeOrderModal"
          >
            Close
          </button>
          <button type="button" @click="sendOrder" class="btn btn-primary">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Form as VForm,
  Field as VField,
  ErrorMessage,
  defineRule,
  configure,
} from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { Modal, Toast } from 'bootstrap';
import { mapState, mapActions } from 'pinia';
import Loading from 'vue-loading-overlay';
import axios from 'axios';
import cartStore from '../stores/cartStore';
import confirmOrderDataStore from '../stores/confirmOrderDataStore';
import en from '../en.json';

const { VITE_URL, VITE_API } = import.meta.env;
defineRule('required', required);
defineRule('email', email);

configure({
  generateMessage: localize({
    en: en.messages,
  }),
  validateOnInput: true, // 输入时验证
});

export default {
  components: {
    VForm,
    VField,
    ErrorMessage,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      orderModal: null,
      user: {
        email: '',
        name: '',
        tel: '',
        country: '',
        city: '',
        address: '',
        message: '',
      },
    };
  },
  computed: {
    ...mapState(cartStore, ['cart', 'final_total', 'total', 'discount']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'deleteCartPinia']),
    ...mapActions(confirmOrderDataStore, ['storeData']),
    sendOrder() {
      const apiFormat = {
        data: {
          user: {
            name: this.user.name,
            email: this.user.email,
            tel: this.user.tel,
            address: JSON.stringify({
              address: this.user.address,
              country: this.user.country,
              city: this.user.city,
            }),
          },
          message: this.user.message,
        },
      };
      this.isLoading = true;
      this.showToast('Order submitted successfully', 'success');
      const api = `${VITE_URL}/api/${VITE_API}/order`;
      axios.post(api, apiFormat).then((res) => {
        this.isLoading = false;
        this.getCart();
        this.storeData(res.data);
        this.$router.push({ path: '/checkorder' });
      });
    },
    onSubmit() {
      this.sendOrder();
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      const result = phoneNumber.test(value) ? true : 'Telephone is required.';
      if (result && value) {
        if (value.length < 8) {
          return 'The length must be at least 8 digits.';
        }
      }
      return result;
    },
    isCity(value) {
      const cityName = /^[A-Z][a-z]*$/;
      return cityName.test(value)
        ? true
        : 'City is required and start with Uppercase.';
    },
    isCountry(value) {
      const countryName = /^[A-Z][a-z]*$/;
      return countryName.test(value)
        ? true
        : 'Country is required and start with Uppercase.';
    },
    showToast(message, type) {
      const toastEl = document.createElement('div');
      toastEl.classList.add(
        'toast',
        'align-items-center',
        'text-white',
        type === 'success' ? 'bg-success' : 'bg-danger',
        'border-0',
        'position-fixed',
        'top-0',
        'end-0',
        'm-3',
      );
      toastEl.role = 'alert';
      toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi bi-check-circle"></i> ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
      document.body.appendChild(toastEl);
      const toast = new Toast(toastEl, { autohide: true, delay: 2000 });
      toast.show();
    },
  },
  mounted() {
    this.orderModal = new Modal(this.$refs.orderModal);
  },
};
</script>
