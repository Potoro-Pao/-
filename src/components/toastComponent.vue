<!-- Toast.vue -->
<template>
  <div v-if="visible" :class="['toast', bgClass]" @click="hideToast">
    <div class="toast-body">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    bgClass: {
      type: String,
      default: 'bg-info',
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showToast() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
    hideToast() {
      this.visible = false;
    },
  },
  watch: {
    message: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.showToast();
        }
      },
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  animation: slideIn 0.5s ease-out;
}

.bg-info {
  background-color: #17a2b8;
}

/* Add more background color styles as needed */

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
