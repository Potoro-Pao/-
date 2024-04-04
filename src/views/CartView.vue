<template>
  <loading v-model:active="isLoading"></loading>
  <div class="container mt-4">
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
          Your coupon has been applied successfully!
        </div>
      </div>
      <div
        ref="invalidToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div :class="['toast-body', toastClass]">Your coupon is invalid!</div>
      </div>
    </div>

    <!-- Main Section -->
    <div class="row">
      <!-- Shopping Cart Table -->
      <div class="col-lg-8">
        <h5 class="mb-3">Your Shopping Cart</h5>
        <div v-if="cart.length > 0">
          <div v-for="item in cart" :key="item.id" class="mb-4">
            <!-- 商品信息 -->
            <div class="d-flex align-items-center mb-2">
              <div class="flex-shrink-0">
                <img
                  :src="item.product.imageUrl"
                  class="img-fluid"
                  alt="Item"
                  style="width: 80px; height: auto"
                />
              </div>
              <div class="flex-grow-1 ms-3">
                <h6>{{ item.product.title }}</h6>
                <p>
                  <span class="text-danger" v-if="item.product.discountPrice"
                    >${{ item.product.discountPrice }}</span
                  >
                  <span v-else>${{ item.product.price }}</span>
                  <span v-if="item.product.discountPrice" class="text-muted"
                    ><del>${{ item.product.origin_price }}</del></span
                  >
                </p>
              </div>
            </div>
            <!-- 修改商品数量和移除功能 -->
            <div class="d-flex justify-content-between">
              <div>
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
                    style="max-width: 60px"
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
              </div>
              <div>
                <button class="btn btn-danger" @click="removeCartItem(item.id)">
                  ×
                </button>
              </div>
            </div>
            <hr />
          </div>
          <button
            type="button"
            class="btn btn-danger mt-2"
            @click.prevent="removeAllItems"
          >
            Remove All
          </button>
        </div>
        <div v-else>
          <p class="text-center text-danger">Your cart is empty.</p>
        </div>
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
      if (this.cart.length === 0) {
        console.log('Cart is empty');
        return;
      }
      if (!this.couponCode) {
        this.onToastCalled();
        return;
      }
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
