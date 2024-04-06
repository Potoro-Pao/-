import { defineStore } from 'pinia';
// import axios from 'axios';

// const { VITE_URL, VITE_API } = import.meta.env;

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
