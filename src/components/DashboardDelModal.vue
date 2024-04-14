<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div v-if ="tempProduct.title" class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>Delete the Product</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-else class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>Delete the Order</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="tempProduct.title">
          Are you sure you want to delete
          <strong class="text-danger">{{ tempProduct.title }}</strong
          >? This action cannot be undone.
        </div>
        <div class="modal-body" v-else>
          Are you sure you want to delete the order
          <strong class="text-danger">{{ tempProduct.id }}</strong
          > ? This action cannot be undone.
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  props: {
    tempProduct: {
      default: () => ({ title: '' }),
    },
    deleteProduct: Function,
  },
  data() {
    return {
      modalDel: null,
    };
  },
  methods: {
    openDeleteModal() {
      this.modalDel.show();
    },
    closeDeleteModal() {
      this.modalDel.hide();
    },
  },
  mounted() {
    this.modalDel = new Modal(this.$refs.delProductModal);
  },
};
</script>
