<template>
  <div
    class="modal fade"
    ref="updateOrderModal"
    tabindex="-1"
    aria-labelledby="updateOrderInfoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateOrderInfoModalLabel">
            Update Order Information
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="paymentStatus" class="form-label">Payment Status</label>
            <select
              id="paymentStatus"
              class="form-select"
              v-model="paymentStatusComputed"
            >
              <option value="true">Paid</option>
              <option value="false">Unpaid</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="orderMessage" class="form-label">Message</label>
            <textarea
              id="orderMessage"
              class="form-control"
              rows="2"
              v-model="editOrder.message"
            ></textarea>
          </div>
          <!-- User information fields -->
          <div class="mb-3">
            <label for="userName" class="form-label">Name</label>
            <input
              type="text"
              id="userName"
              class="form-control"
              v-model="editOrder.user.name"
            />
          </div>
          <div class="mb-3">
            <label for="userEmail" class="form-label">Email</label>
            <input
              type="email"
              id="userEmail"
              class="form-control"
              v-model="editOrder.user.email"
            />
          </div>
          <div class="mb-3">
            <label for="userTel" class="form-label">Telephone</label>
            <input
              type="tel"
              id="userTel"
              class="form-control"
              v-model="editOrder.user.tel"
            />
          </div>
          <div class="mb-3">
            <label for="userAddress" class="form-label">Address</label>
            <input
              type="text"
              id="userAddress"
              class="form-control"
              v-model="editOrder.user.address"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  props: ['selectedOrder', 'tempProduct', 'updateProduct'],
  computed: {
    paymentStatusComputed: {
      get() {
        return this.editOrder.is_paid ? 'true' : 'false';
      },
      set(value) {
        this.editOrder.is_paid = value === 'true';
      },
    },
  },
  data() {
    return {
      modalOrder: null,
      editOrder: {
        is_paid: Boolean,
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
      },
    };
  },
  watch: {
    selectedOrder() {
      this.editOrder = this.selectedOrder;
    },
  },
  methods: {
    openModal() {
      this.modalOrder.show();
    },
    closeModal() {
      this.modalOrder.hide();
    },
  },
  mounted() {
    this.modalOrder = new Modal(this.$refs.updateOrderModal);
    this.editOrder = this.selectedOrder;
  },
};
</script>
