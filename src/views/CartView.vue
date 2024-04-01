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

    <!-- Coupon Code Section -->
    <div class="row mb-3">
      <div class="col-12">
        <label for="couponCode" class="form-label">Coupon Code:</label>
        <div class="input-group mb-2">
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
        <p class="alert alert-info mt-2">Code: Reading</p>
        <p class="alert alert-primary mt-2">Code: Literature</p>
      </div>
    </div>

    <!-- Shopping Cart Table -->
    <div class="row">
      <div class="col-12">
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
                  <div class="d-flex align-items-center">
                    <img
                      :src="item.product.imageUrl"
                      class="img-fluid me-3"
                      alt="Item"
                      style="width: 80px; height: auto"
                    />
                  </div>
                </td>
                <td>
                  {{ item.product.title }}
                </td>
                <td>
                  <span class="text-danger" v-if="item.product.discountPrice">
                    ${{ item.product.discountPrice }}
                  </span>
                  <span v-else>${{ item.product.price }}</span>
                  <span v-if="item.product.discountPrice" class="text-muted">
                    <del>${{ item.product.origin_price }}</del>
                  </span>
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
            <tfoot>
              <tr>
                <th colspan="5" class="text-end">Subtotal:</th>
                <th colspan="3">${{ total }}</th>
              </tr>
              <tr v-if="discount">
                <th colspan="5" class="text-end">Discount:</th>
                <th colspan="3" class="text-success">-${{ discount }}</th>
              </tr>
              <tr>
                <th colspan="5" class="text-end">Total:</th>
                <td colspan="3">${{ final_total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-between">
        <router-link to="/form" v-if="cart.length > 0" class="btn btn-info"
          >Proceed to Checkout</router-link
        >
        <router-link to="/products" v-else class="btn btn-danger"
          >Browse More Products</router-link
        >
        <button
          type="button"
          class="btn btn-danger"
          v-if="cart.length > 0"
          @click.prevent="removeAllItems"
        >
          Remove All
        </button>
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
