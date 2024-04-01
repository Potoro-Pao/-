<template>
    <loading v-model:active="isLoading"></loading>
  <div class="container mt-5">
    <h2>Order List</h2>
    <div class="table-responsive">
      <div class="text-end mb-5">
        <button type="button" @click="removeAllOrders" class="btn btn-danger">
          Remove All Orders
        </button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order ID</th>
            <th scope="col">Created Time</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ order.id }}</td>
            <td>
              {{ new Date(order.create_at * 1000).toLocaleDateString('zh-TW') }}
            </td>
            <td>$ {{ Math.round(order.total) }}</td>
            <td :style="{ color: order.is_paid ? 'green' : 'red' }">
              {{ order.is_paid ? 'Paid' : 'Unpaid' }}
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="showOrderDetail(order)"
              >
                View Detail
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="prepareDeleteOrder(order.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PagC :pages="pages" :getProduct="getOrders" basePath="/admin" />
  </div>
  <DOM
    :temp-product="tempProduct"
    :selected-order="selectedOrder"
    :update-product="updateProduct"
    ref="dOrderModal"
  ></DOM>
  <DDM
    :selected-order="selectedOrder"
    :delete-product="deleteOrder"
    ref="dModal"
  ></DDM>
</template>
<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import DDM from '../../components/dashboardDelModal.vue';
import DOM from '../../components/dashboardOrderModal.vue';
import PagC from '../../components/PaginationComponent.vue';

const { VITE_URL, VITE_API } = import.meta.env;
export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      modal: null,
      selectedOrder: {
        is_paid: Boolean,
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
      },
      tempProduct: {},
      pages: {},
    };
  },
  components: {
    DDM,
    DOM,
    PagC,
    Loading,
  },
  methods: {
    removeAllOrders() {
      this.isLoading = true;
      const api = `${VITE_URL}/api/${VITE_API}/admin/orders/all`;
      axios
        .delete(api)
        .then(() => {
          this.isLoading = false;
          this.getOrders();
        })
        .catch(() => {});
    },
    prepareDeleteOrder(orderId) {
      this.tempProduct.id = orderId;
      this.$refs.dModal.openDeleteModal();
    },
    deleteOrder() {
      const api = `${VITE_URL}/api/${VITE_API}/admin/order/${this.tempProduct.id}`;
      axios
        .delete(api)
        .then(() => {
          this.getOrders(); // Refresh the orders list
          this.$refs.dModal.closeDeleteModal(); // Close the DDM modal after successful deletion
        })
        .catch(() => {});
    },
    getOrders(page = 1) {
      const api = `${VITE_URL}/api/${VITE_API}/admin/orders?page=${page}`;
      axios.get(api).then((res) => {
        this.orders = res.data.orders;
        this.pages = res.data.pagination;
      });
    },
    showOrderDetail(clickedOrder) {
      this.selectedOrder = this.orders.find(
        (order) => order.id === clickedOrder.id,
      );
      this.$refs.dOrderModal.openModal();
    },

    updateProduct() {
      const api = `${VITE_URL}/api/${VITE_API}/admin/order/${this.selectedOrder.id}`;
      axios
        .put(api, { data: this.selectedOrder })
        .then((res) => {
          this.products = res.data.products;
          this.getOrders();
          this.$refs.dOrderModal.closeModal();
        })
        .catch(() => {
          //
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = token;
    this.getOrders();
  },
};
</script>
