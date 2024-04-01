<template>
  <loading v-model:active="isLoading"></loading>
  <div class="container">
    <h1 class="text-center my-5">Confirm Your Payment</h1>

    <div class="row">
      <div class="mb-3">
        <label style="font-size: 20px" for="orderId" class="form-label mb-3"
          >Order ID</label
        >
        <input
          type="text"
          class="form-control"
          id="orderId"
          v-model="checkoutOrderID"
          readonly
        />
        <label style="font-size: 20px" for="orderId" class="form-label mb-3"
          >Search Order ID</label
        >
        <input
          type="text"
          class="form-control"
          id="orderId"
          v-model="orderID"
        />
        <button type="button" class="btn btn-primary mt-3" @click="searchOrder">
          Search
        </button>
      </div>
      <div class="row">
        <div class="col-md-6" v-for="order in orders" :key="order.id">
          <div class="card">
            <img
              :src="order.product.imageUrl"
              class="card-img-top"
              alt="Product Image"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{ order.product.title }}
              </h5>
            </div>
            <div class="container">
              <p class="card-text">Price: {{ order.product.price }}</p>
              <p>Quantity: {{ order.qty }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><strong>Customer Information </strong></h5>
            <p class="card-text">Name: {{ this.userData.name }}</p>
            <p class="card-text">Email: {{ this.userData.email }}</p>
            <p class="card-text">Address: {{ this.userData.address }}</p>
            <p class="card-text">Phone: {{ this.userData.tel }}</p>
            <p class="card-text text-success">Total: {{ this.ordersTotal }}</p>
          </div>
        </div>
        <div class="mt-3" v-if="!this.is_paid">
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

const { VITE_URL, VITE_API } = import.meta.env;

export default {
  data() {
    return {
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
  },
  methods: {
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
            this.orders = order.products;
            this.ordersTotal = Math.round(order.total);
            this.orderID = order.id;
            this.userData = order.user;
            this.userCountryCity.country = JSON.parse(this.userData.address).country;
            this.userCountryCity.city = JSON.parse(this.userData.address).city;
            this.userData.address = JSON.parse(this.userData.address).address;
          }
        })
        .catch(() => {});
    },

    searchOrder() {
      const api = `${VITE_URL}/api/${VITE_API}/order/${this.orderID}`;
      axios.get(api).then((res) => {
        this.isLoading = false;
        this.orders = res.data.order.products;
        this.userData = res.data.order.user;
        this.userCountryCity.country = JSON.parse(this.userData.address).country;
        this.userCountryCity.city = JSON.parse(this.userData.address).city;
        this.userData.address = JSON.parse(this.orders.address).address;
        this.ordersTotal = Math.round(res.data.order.total);
        this.checkoutOrderID = res.data.order.id;
        this.orderID = res.data.order.id;
      });
    },
  },
  created() {
    if (this.$route.query.data) {
      this.checkoutData = JSON.parse(this.$route.query.data);
    }
  },
  mounted() {
    this.isLoading = false;
    this.checkoutOrderID = this.checkoutData.orderId || this.checkoutData.id;
    this.orderID = this.checkoutData.orderId || this.checkoutData.id;
    this.getOrderAll();
  },
};
</script>

<style scoped>
.card {
  max-height: 400px;
  overflow-y: auto;
}
</style>
