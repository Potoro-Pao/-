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
      console.log(this.orderID);
      const api = `${VITE_URL}/api/${VITE_API}/order/${this.orderID.trim()}`;
      if (!this.orderID) {
        this.$emit('showFailedToast', {
          message: 'Order not found. Please enter the correct Order Number.',
          bgClass: 'bg-danger',
        });
        return;
      }

      axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.order && Object.keys(res.data.order).length > 0) {
            this.checkoutData = res.data.order;
            this.$router
              .push({
                path: '/checkorder',
                query: { data: JSON.stringify(this.checkoutData) },
              })
              .catch(() => {
                console.log('sldjfs');
                this.$emit('showFailedToast', {
                  message:
                    'Order not found. Please enter the correct Order Number.',
                  bgClass: 'bg-danger',
                });
              });
          } else {
            this.$emit('showFailedToast', {
              message:
                'Order not found. Please enter the correct Order Number.',
              bgClass: 'bg-danger',
            });
          }
        })
        .catch(() => {
          this.$emit('showFailedToast', {
            message: 'An error occurred. Please try again.',
            bgClass: 'bg-danger',
          });
        });
    },
  },
};
</script>
