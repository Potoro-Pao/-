<template>
  <loading v-model:active="isLoading"></loading>
  <div class="container mt-4">
    <!-- Toast Notifications -->
    <div
      aria-live="polite"
      aria-atomic="true"
      class="position-fixed top-0 end-0 p-3"
      style="z-index: 11"
    >
      <div
        ref="toast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div :class="['toast-body', toastClass]">
          {{
            showToast
              ? 'Your coupon has been applied successfully!'
              : 'Your coupon is invalid!'
          }}
        </div>
      </div>
    </div>

    <!-- Main Section -->
    <div class="row">
      <!-- Shopping Cart Table -->
      <div class="col-lg-8">
        <h5 class="mb-3">Your Shopping Cart</h5>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody v-if="cart.length > 0">
              <tr v-for="(item, index) in cart" :key="item.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <img
                    :src="item.product.imageUrl"
                    class="img-fluid me-3"
                    alt="Item"
                    style="width: 80px; height: auto"
                  />
                </td>
                <td>{{ item.product.title }}</td>
                <td>
                  <span class="text-danger" v-if="item.product.discountPrice"
                    >${{ item.product.discountPrice }}</span
                  >
                  <span v-else>${{ item.product.price }}</span>
                  <span v-if="item.product.discountPrice" class="text-muted"
                    ><del>${{ item.product.origin_price }}</del></span
                  >
                </td>
                <td>
                  <div class="d-flex justify-content-center align-items-center">
                    <button
                      class="btn btn-outline-secondary"
                      @click="item.qty > 1 ? item.qty-- : null"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      class="form-control text-center mx-2"
                      v-model="item.qty"
                      readonly
                      style="max-width: 60px; min-width: 40px"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      @click="
                        item.qty++;
                        changeCartQty(item, item.qty);
                      "
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  ${{
                    item.qty *
                    (item.product.discountPrice || item.product.price)
                  }}
                </td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click="removeCartItem(item.id)"
                  >
                    ×
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center text-danger">
                  Your cart is empty.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          type="button"
          class="btn btn-danger mt-2"
          v-if="cart.length > 0"
          @click.prevent="removeAllItems"
        >
          Remove All
        </button>
      </div>

      <!-- Checkout Details -->
      <div class="col-lg-4">
        <h5 class="mb-3">Apply Coupon</h5>
        <div class="input-group mb-3">
          <input
            type="text"
            id="couponCode"
            v-model="couponCode"
            placeholder="Enter coupon code"
            class="form-control"
          />
          <button class="btn btn-success" @click="applyCoupon">
            Apply Coupon
          </button>
        </div>
        <div class="mb-3">
          <p class="alert alert-info">Code: Reading</p>
          <p class="alert alert-primary">Code: Literature</p>
        </div>

        <h5 class="mb-3">Order Summary</h5>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>Subtotal:</div>
            <div>${{ total }}</div>
          </li>
          <li
            class="list-group-item d-flex justify-content-between lh-sm text-success"
            v-if="discount"
          >
            <div>Discount:</div>
            <div>-${{ discount }}</div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div><strong>Total:</strong></div>
            <div>
              <strong>${{ final_total }}</strong>
            </div>
          </li>
        </ul>
        <router-link
          to="/form"
          v-if="cart.length > 0"
          class="btn btn-primary mt-3"
          >Proceed to Checkout</router-link
        >
        <router-link to="/products" v-else class="btn btn-secondary mt-3"
          >Browse More Products</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { Toast } from 'bootstrap';
import Loading from 'vue-loading-overlay';

import cartStore from '../stores/cartStore';

export default {
  data() {
    return {
      isLoading: false,
      couponCode: '',
      toastBody: null,
      toastClass: '',
      defaultCouponValue: 0,
    };
  },
  components: {
    Loading,
  },
  computed: {
    ...mapState(cartStore, [
      'cart',
      'final_total',
      'total',
      'discount',
      'showToast',
      'refreshDiscount',
      'loading',
    ]),
  },
  watch: {
    loading(n) {
      this.isLoading = n;
    },
    showToast(newVal) {
      if (newVal === '已套用優惠券') {
        this.onToastCalled();
      }
    },
  },

  methods: {
    ...mapActions(cartStore, [
      'getCart',
      'removeCartItem',
      'changeCartQty',
      'applyDiscount',
      'resetShowToast',
      'deleteCart',
    ]),
    applyCoupon() {
      this.applyDiscount(this.couponCode);
    },
    onToastCalled() {
      if (this.showToast === '已套用優惠券') {
        if (this.couponCode === 'Reading') {
          this.toastClass = 'text-bg-info';
        }
        if (this.couponCode === 'Literature') {
          this.toastClass = 'text-bg-primary';
        }
        this.toastBody.show();
      } else {
        this.toastClass = 'text-bg-danger';
        this.invalidToast.show();
      }
      this.resetShowToast();
    },
    removeAllItems() {
      this.isLoading = this.loading;
      this.deleteCart();
    },
  },
  mounted() {
    this.getCart();
    const toastElement = this.$refs.toast;
    const invalidToastElement = this.$refs.invalidToast;
    this.toastBody = new Toast(toastElement);
    this.invalidToast = new Toast(invalidToastElement);
    this.$watch('showToast', (newVal) => {
      if (newVal) {
        this.onToastCalled();
      }
    });
  },
};
</script>
