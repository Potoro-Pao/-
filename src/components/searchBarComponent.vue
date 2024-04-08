<template>
  <div class="input-group">
    <input
      v-model.trim="orderID"
      type="text"
      class="form-control"
      placeholder="Search Your Order"
      aria-label="Order Number"
      aria-describedby="button-addon2"
    />
    <button
      @click="getOrder"
      class="btn btn-outline-secondary"
      type="button"
      id="button-addon2"
    >
      Search
    </button>
  </div>
</template>

<script>
import axios from 'axios';

const { VITE_URL, VITE_API } = import.meta.env;
export default {
  data() {
    return {
      orderID: '',
      checkoutData: '',
    };
  },
  methods: {
    getOrder() {
      const api = `${VITE_URL}/api/${VITE_API}/order/${this.orderID.trim()}`;
      axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          // 正常情況
          if (res.data.order && Object.keys(res.data.order).length > 0) {
            this.checkoutData = res.data.order;
            this.$router
              .push({
                path: '/checkorder',
                query: {
                  data: JSON.stringify(this.checkoutData),
                },
              })
              .catch(() => {});
          } else {
            // 若返回空值(未找到訂單不可以跳轉)
            this.showToast(
              'Order not found. Please enter the correct Order Number.',
              'bg-danger',
            );
          }
        })
        .catch(() => {
          // 如果後端返回錯誤或網路錯誤
          this.showToast('An error occurred. Please try again.', 'bg-danger');
        });
    },
  },
};
</script>
