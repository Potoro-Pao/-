import { defineStore } from 'pinia';
import axios from 'axios';

const { VITE_URL, VITE_API } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    cart: [],
    final_total: 0,
    total: 0,
    discount: 0,
    showToast: '',
    loading: false,
  }),
  actions: {
    getCart() {
      this.loading = true;
      const api = `${VITE_URL}/api/${VITE_API}/cart`;
      axios.get(api).then((res) => {
        this.loading = false;
        this.cart = res.data.data.carts;
        this.final_total = Math.floor(res.data.data.final_total);
        this.total = res.data.data.total;
        this.discount = this.final_total - this.total;
        // 不這樣寫的話，就算已使用優惠券也顯示不出來
      });
    },
    addToCart(id, qty = 1) {
      const api = `${VITE_URL}/api/${VITE_API}/cart`;
      const order = {
        product_id: id,
        qty,
      };
      axios.post(api, { data: order }).then(() => {
        this.getCart();
      });
    },
    removeCartItem(id) {
      this.loading = true;

      axios.delete(`${VITE_URL}/api/${VITE_API}/cart/${id}`).then(() => {
        this.getCart();
        this.loading = false;
      });
    },
    deleteCart() {
      this.loading = true;
      const api = `${VITE_URL}/api/${VITE_API}/carts`;
      axios.delete(api).then(() => {
        this.loading = false;
        this.deleteCartPinia();
      });
    },
    changeCartQty(item, qty = 1) {
      const order = {
        product_id: item.product_id,
        qty,
      };
      axios
        .put(`${VITE_URL}/api/${VITE_API}/cart/${item.id}`, { data: order })
        .then(() => {
          this.getCart();
        });
    },
    deleteCartPinia() {
      this.getCart();
    },

    resetShowToast() {
      this.showToast = '';
    },
    applyDiscount(couponCode) {
      const couponCodeData = {
        data: {
          code: couponCode,
        },
      };

      const api = `${VITE_URL}/api/${VITE_API}/coupon`;
      axios
        .post(api, couponCodeData)
        .then((res) => {
          this.final_total = Math.floor(res.data.data.final_total);
          this.discount = Math.floor(Math.abs(this.final_total - this.total));
          this.showToast = '已套用優惠券';
        })
        .catch(() => {
          this.showToast = +Math.random();
        });
    },
  },
});
