<template>
  <loading v-model:active="isLoading"></loading>
  <div
    class="position-fixed top-0 end-0 p-3"
    style="z-index: 11; top: 65px !important"
  >
    <toastComponent
      ref="TToast"
      :message="message"
      :bgClass="bgClass"
    ></toastComponent>
  </div>
  <div class="container my-5">
    <stepperComponent :currentStep="1" />
  </div>

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
        <div :class="['toast-body', toastClass]">
          An error occurred. Please try again.
        </div>
      </div>
    </div>

    <!-- Main Section -->
    <div class="row">
      <!-- Shopping Cart Table -->
      <div class="col-lg-8">
        <h5 class="mb-3">Your Shopping Cart</h5>
        <div v-if="cart.length > 0">
          <div v-for="item in cart" :key="item.id" class="card mb-3">
            <div class="row g-0">
              <div
                class="col-4 d-flex align-items-center justify-content-center p-2"
              >
                <img
                  :src="item.product.imageUrl"
                  class="img-fluid"
                  alt="Item"
                  style="max-width: 80%; height: auto"
                />
              </div>
              <div class="col-8">
                <div class="card-body">
                  <h6 class="card-title">{{ item.product.title }}</h6>
                  <p class="card-text">
                    <small
                      class="text-muted"
                      v-if="item.product.origin_price > item.product.price"
                    >
                      Origin Price: <del>${{ item.product.origin_price }}</del>
                    </small>
                    <br />
                    Sale Price: ${{ item.product.price }}
                  </p>
                  <p class="card-text">
                    <small>Total: ${{ item.product.price * item.qty }}</small>
                  </p>
                  <div
                    class="d-flex flex-wrap justify-content-between align-items-center"
                  >
                    <div
                      class="btn-group me-2"
                      role="group"
                      aria-label="Quantity"
                    >
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        @click="item.qty > 1 ? item.qty-- : null"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        class="form-control text-center"
                        v-model="item.qty"
                        readonly
                        style="max-width: 50px"
                      />
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        @click="
                          item.qty++;
                          changeCartQty(item, item.qty);
                        "
                      >
                        +
                      </button>
                    </div>
                    <button
                      class="btn btn-danger btn-sm mt-4"
                      @click="openDelModal(item.product.title, item.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-warning mt-2"
            @click.prevent="removeAllItems"
          >
            Clear Cart
          </button>
        </div>
        <div v-else class="alert alert-warning" role="alert">
          Your cart is empty.
        </div>
      </div>

      <!-- Checkout Details -->
      <div class="col-lg-4">
        <h5 class="mb-3 mt-5">Apply Coupon</h5>
        <div class="input-group mb-3">
          <input
            type="text"
            id="couponCode"
            v-model.trim="couponCode"
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
  <DDM
    :temp-product="tempProduct"
    :delete-product="() => deleteProduct(tempProduct.id)"
    ref="dModal"
  ></DDM>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { Toast } from 'bootstrap';
import Loading from 'vue-loading-overlay';
import DDM from '../components/dashboardDelModal.vue';
import cartStore from '../stores/cartStore';
import stepperComponent from '../components/stepperComponent.vue';
import toastComponent from '../components/toastComponent.vue';

export default {
  data() {
    return {
      message: '',
      bgClass: '',
      tempProduct: {},
      isLoading: this.loading,
      couponCode: '',
      toastBody: null,
      toastClass: '',
      defaultCouponValue: 0,
    };
  },
  components: {
    Loading,
    DDM,
    stepperComponent,
    toastComponent,
  },
  computed: {
    ...mapState(cartStore, [
      'cart',
      'final_total',
      'total',
      'discount',
      'refreshDiscount',
      'loading',
    ]),
  },
  watch: {
    loading(n) {
      this.isLoading = n;
    },
  },
  methods: {
    openDelModal(title, id) {
      this.tempProduct.title = title;
      this.tempProduct.id = id;
      this.$refs.dModal.openDeleteModal();
    },
    deleteProduct(id) {
      this.removeCartItem(id);
      this.$refs.dModal.closeDeleteModal();
    },
    ...mapActions(cartStore, [
      'getCart',
      'removeCartItem',
      'changeCartQty',
      'applyDiscount',
      'deleteCart',
    ]),
    applyCoupon() {
      if (this.cart.length === 0) {
        this.bgClass = 'bg-danger';
        this.message = 'Your shopping cart is empty';
        this.$refs.TToast.showToast();
        return;
      }
      if (!this.couponCode) {
        this.bgClass = 'bg-danger';
        this.message = 'Please enter the coupon code';
        this.$refs.TToast.showToast();
        return;
      }
      if (this.couponCode !== 'Reading' && this.couponCode !== 'Literature') {
        this.bgClass = 'bg-danger';
        this.message = 'Please enter the right coupon code';
        this.$refs.TToast.showToast();
        return;
      }
      this.bgClass = this.couponCode === 'Reading' ? 'bg-info' : 'bg-primary';
      this.message = `${this.couponCode} has been copied to clipboard!`;
      this.$nextTick(() => {
        if (this.$refs.TToast) {
          this.$refs.TToast.showToast();
        }
      });
      this.applyDiscount(this.couponCode);
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
  },
};
</script>
