<template>
  <loading v-model:active="isLoading"></loading>

  <div class="success-container">
    <div class="success-content">
      <div class="success-message">
        <h1>Payment Successful!</h1>
        <p>
          Your order has been placed. Thank you for choosing
          <strong>Books</strong>. Keep Reading!
        </p>
      </div>
      <div class="countdown" v-if="countdown > 0">
        <p>Redirecting in {{ countdown }} seconds...</p>
      </div>
      <button @click="goToShop" class="continue-shopping-btn">
        Continue Shopping
      </button >
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';

export default {
  data() {
    return {
      isLoading: true,
      countdown: 5, // Initialized countdown
    };
  },
  components: {
    Loading,
  },
  methods: {
    goToShop() {
      this.$router.push('/');
    },
    startCountdown() {
      const interval = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown === 0) {
          clearInterval(interval);
          this.goToShop();
        }
      }, 1000);
    },
  },
  mounted() {
    this.isLoading = false;
    this.startCountdown();
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.success-container {
  display: flex;
  flex-direction: column; /* 將flex方向改為column */
  justify-content: center;
  align-items: center;
  height: 100vh; /* 設置高度為整個視口高度 */
  width: 100vw; /* 設置寬度為整個視口寬度 */
  background-color: #f4f4f4; /* A light cream background */
  padding: 0; /* Reset any default padding */
}

.success-content {
  text-align: center;
  color: #3e2723; /* Coffee brown color for the text */
}

.success-message h1 {
  color: #6d4c41; /* A darker coffee shade for headings */
}

.countdown p {
  color: #5d4037; /* A warm brown tone */
}

.continue-shopping-btn {
  background-color: #795548; /* A rich coffee color for buttons */
  color: #ffffff; /* White text on buttons for readability */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.continue-shopping-btn:hover {
  background-color: #5d4037; /* Darken the button on hover for interaction feedback */
}
</style>
