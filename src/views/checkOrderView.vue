<template>
  <div class="toast-container">
    <ToastComponent
      ref="TToast"
      :message="message"
      :bgClass="type"
    ></ToastComponent>
  </div>
  <div class="container my-5">
    <StepperComponent :currentStep="3" />
  </div>
  <loading v-model:active="isLoading"></loading>
  <div class="container">
    <h1 class="text-center my-5">Confirm Your Payment</h1>
    <div class="row">
      <div class="mb-3">
        <label for="orderId" style="font-size: 20px" class="form-label mb-3"
          >Order ID</label
        >
        <input
          type="text"
          class="form-control"
          id="orderId"
          v-model="checkoutOrderID"
          readonly
        />
        <label
          for="searchOrderId"
          style="font-size: 20px"
          class="form-label mb-3"
          >Search Order ID</label
        >
        <input
          type="text"
          class="form-control"
          id="searchOrderId"
          v-model="orderID"
        />
        <button type="button" class="btn btn-primary mt-3" @click="searchOrder">
          Search
        </button>
      </div>
      <div class="col-12">
        <h5 class="mb-3">Your Orders</h5>
        <div class="list-group">
          <a
            v-for="order in orders"
            :key="order.id"
            class="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <img
                :src="order.product?.imageUrl"
                alt="Product Image"
                style="width: 100px; height: auto; margin-right: 15px"
              />
              <div class="flex-grow-1">
                <h5 class="mb-3">{{ order.product?.title }}</h5>
                <p class="mb-1">
                  Item Price:
                  <span class="text-muted"
                    >${{ order.product?.price }} NTD</span
                  >
                </p>
                <p
                  class="mb-1 font-weight-bold text-primary"
                  style="font-size: 1.25em"
                >
                  Item Total: ${{ order.product?.price * order?.qty }} NTD
                </p>
              </div>
              <small>Quantity: {{ order?.qty }}</small>
            </div>
          </a>
        </div>
      </div>
      <div class="container">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><strong>Customer Information</strong></h5>
            <p class="card-text">Name: {{ this.userData.name }}</p>
            <p class="card-text">Email: {{ this.userData.email }}</p>
            <p class="card-text">Address: {{ this.userData.address }}</p>
            <p class="card-text">Phone: {{ this.userData.tel }}</p>
            <p
              class="card-text font-weight-bold text-success"
              style="font-size: 1.25em"
            >
              Total: ${{ this.ordersTotal }} NTD
              <span v-if="hasCoupon" class="badge bg-success ml-3"
                >Coupon Applied</span
              >
            </p>
          </div>
        </div>
        <div v-if="!this.is_paid" class="mt-3">
          <label for="paymentMethod" class="form-label">Payment Methods</label>
          <select
            class="form-select"
            id="paymentMethod"
            v-model="selectedPaymentMethod"
          >
            <option disabled value="">Choose a payment method</option>
            <option>Credit card</option>
            <option>Bank transfer</option>
            <option>Pay when you get it (Cash on Delivery)</option>
          </select>
          <button
            type="button"
            class="btn btn-primary mt-3"
            :disabled="!selectedPaymentMethod"
            @click="confirmOrder"
          >
            Confirm Payment
          </button>
        </div>
        <div v-else>
          <p class="text-danger" style="font-size: 30px">
            Your shipment is on the road.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import axios from 'axios';
import { mapActions } from 'pinia';
import mapStore from '../stores/mapStore';
import confirmOrderDataStore from '../stores/confirmOrderDataStore';
import ToastComponent from '../components/ToastComponent.vue';
import StepperComponent from '../components/StepperComponent.vue';

const { VITE_URL, VITE_API } = import.meta.env;

export default {
  data() {
    return {
      hasCoupon: '',
      message: '',
      type: '',
      is_paid: false,
      selectedPaymentMethod: '',
      isLoading: true,
      checkoutData: {},
      orderData: {},
      productDetails: {},
      userData: {},
      orders: {},
      ordersTotal: 0,
      checkoutOrderID: '',
      orderID: '',
      userCountryCity: { country: '', city: '' },
    };
  },
  components: {
    Loading,
    ToastComponent,
    StepperComponent,
  },
  methods: {
    ...mapActions(mapStore, [
      'setLocationFromExternal',
      'setBookPhotoFromExternal',
    ]),
    ...mapActions(confirmOrderDataStore, ['getOrderSuccessUserData']),
    ...mapActions(mapStore, [
      'setLocationFromExternal',
      'setBookPhotoFromExternal',
    ]),

    confirmOrder() {
      const api = `${VITE_URL}/api/${VITE_API}/pay/${this.orderID}`;
      axios
        .post(api)
        .then(() => {
          this.isLoading = true;
          const bookInfo = this.randomPhoto(this.orders);
          this.setLocationFromExternal(
            this.userCountryCity,
            bookInfo[0],
            bookInfo[1],
          );
          this.$router.push('/success');
        })
        .catch(() => {});
    },
    randomPhoto(orders) {
      const ids = Object.keys(orders);
      const randomIndex = Math.floor(Math.random() * ids.length);
      const randomId = ids[randomIndex];
      const productTitle = orders[randomId].product.title;
      const productPhoto = orders[randomId].product.imageUrl;
      return [productTitle, productPhoto];
    },
    getOrderAll() {
      const api = `${VITE_URL}/api/${VITE_API}/orders`;
      axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.orders = res.data.orders;
          this.is_paid = this.orders[0].is_paid;
          const order = this.orders.find(
            (e) => e.id === (this.checkoutData.orderId || this.checkoutData.id),
          );

          if (order) {
            this.isLoading = false;
            this.orders = order.products;
            this.ordersTotal = Math.round(order.total);
            this.orderID = order.id;
            this.userData = order.user;
            this.userCountryCity.country = JSON.parse(
              this.userData.address,
            ).country;
            this.userCountryCity.city = JSON.parse(this.userData.address).city;
            this.userData.address = JSON.parse(this.userData.address).address;
            const checkCoupon = Object.values(order.products);
            this.hasCoupon = checkCoupon.some((o) => !!o.coupon);
          } else {
            this.orders = '';
            this.ordersTotal = '';
            this.orderID = '';
            this.userData = '';
            this.userCountryCity = '';
          }
        })
        .catch(() => {});
    },

    searchOrder() {
      this.isLoading = true;
      if (!this.orderID) {
        this.type = 'bg-danger';
        this.message = 'Please Enter the order Number';
        this.$refs.TToast.showToast();
        this.isLoading = false;
        return;
      }

      const api = `${VITE_URL}/api/${VITE_API}/order/${this.orderID}`;
      axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.orders = res.data.order.products;
          this.userData = res.data.order.user;
          this.userCountryCity.country = JSON.parse(
            this.userData.address,
          )?.country;
          this.userCountryCity.city = JSON.parse(this.userData.address).city;
          this.userData.address = JSON.parse(this.userData.address).address;
          this.ordersTotal = Math.round(res.data.order.total);
          this.checkoutOrderID = res.data.order.id;
          this.orderID = res.data.order.id;
          // const checkCoupon = Object.values(this.orders.products);
          // this.hasCoupon = checkCoupon.some((o) => !!o.coupon);
          if (this.orders && typeof this.orders === 'object') {
            this.hasCoupon = Object.values(this.orders).some(
              (product) => product.coupon,
            );
          } else {
            this.hasCoupon = false;
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.type = 'bg-danger';
          this.message = 'Please enter the correct order number';
          this.$refs.TToast.showToast();
        });
    },
  },
  created() {
    this.checkoutData = this.getOrderSuccessUserData();
  },
  mounted() {
    this.checkoutOrderID = this.checkoutData.orderId || this.checkoutData.id;
    this.orderID = this.checkoutData.orderId || this.checkoutData.id;
    if (!this.checkoutOrderID || !this.orderID) {
      this.type = 'bg-danger';
      this.message = 'Please enter the order number';
      this.$refs.TToast.showToast();
      this.isLoading = false;
      return;
    }
    this.getOrderAll();
  },
};
</script>

<style scoped>
.card {
  max-height: 400px;
  overflow-y: auto;
}
.card:hover {
  transform: none;
  box-shadow: none;
}
</style>
