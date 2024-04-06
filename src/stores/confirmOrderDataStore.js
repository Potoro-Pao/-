import { defineStore } from 'pinia';

export default defineStore('userDataStore', {
  state: () => ({
    orderData: {},
  }),
  actions: {
    storeData(data) {
      this.orderData = data;
    },
    getOrderSuccessUserData() {
      return this.orderData;
    },
  },
});
