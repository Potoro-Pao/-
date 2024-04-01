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
    <div class="row mb-3">
      <div class="col-12">
        <label for="couponCode">Coupon Code:</label>
        <input
          type="text"
          id="couponCode"
          v-model="couponCode"
          placeholder="Enter coupon code"
          class="form-control"
        />
        <div class="alert alert-info mt-2">Code: Reading</div>
        <div class="alert alert-primary mt-2">Code: Literature</div>
        <button type="button" class="btn btn-success mt-2" @click="applyCoupon">
          Apply Coupon
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" style="width: 50px">#</th>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col" style="width: 120px">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col" style="width: 100px">Remove</th>
              </tr>
            </thead>
            <tbody v-if="cart.length > 0">
              <tr v-for="(item, index) in cart" :key="item.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <div class="row">
                    <div class="col-md-3">
                      <img
                        :src="item.product.imageUrl"
                        class="img-fluid"
                        alt="Item"
                      />
                    </div>
                    <div class="col-md-9">
                      <div>{{ item.product.title }}</div>
                      <div class="text-muted">
                        {{ item.product.origin_price }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>${{ item.product.price }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      v-if="item.qty > 1"
                      @click="
                        item.qty--;
                        changeCartQty(item, item.qty);
                      "
                    >
                      -
                    </button>
                    <input
                      type="text"
                      class="form-control text-center"
                      :value="item.qty"
                      disabled
                    />
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="
                        item.qty++;
                        changeCartQty(item, item.qty);
                      "
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${{ item.qty * item.product.price }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="removeCartItem(item.id)"
                  >
                    X
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="6" class="text-center text-danger">
                  There is nothing in the cart!
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colspan="4"
                  class="text-right font-weight-bold subtotal-total-label"
                >
                  Subtotal:
                </td>
                <td colspan="2" class="text-right subtotal-total-value">
                  ${{ this.total }}
                </td>
              </tr>
              <tr>
                <td
                  colspan="4"
                  class="text-right font-weight-bold subtotal-total-label"
                >
                  Total:
                </td>
                <td
                  colspan="2"
                  class="text-right font-weight-bold subtotal-total-value"
                >
                  ${{ this.final_total }}
                </td>
              </tr>
              <tr v-if="this.discount">
                <td
                  colspan="4"
                  class="text-right font-weight-bold subtotal-total-label"
                >
                  Discount:
                </td>
                <td
                  colspan="2"
                  class="text-right text-success subtotal-total-value"
                >
                  -$
                  {{
                    this.discount === 0 ? this.refreshDiscount : this.discount
                  }}
                </td>
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
