<template>
  <div
    ref="toastContainer"
    class="toast"
    :class="bgClass"
    data-bs-autohide="false"
  >
    <div class="toast-body" :class="{ 'text-white': bgClass === 'bg-primary' }">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { Toast } from 'bootstrap';

export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    bgClass: {
      type: String,
      default: 'bg-info',
    },
  },
  data() {
    return {
      toastInstance: null,
    };
  },
  mounted() {
    this.toastInstance = new Toast(this.$refs.toastContainer);
  },
  methods: {
    showToast() {
      this.toastInstance.show();
      setTimeout(() => {
        this.toastInstance.hide();
      }, 2000);
    },
    hideToast() {
      this.toastInstance.hide();
    },
  },
  watch: {
    message(newVal) {
      if (newVal && this.toastInstance) {
        this.showToast();
      }
    },
  },
};
</script>
