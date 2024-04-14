<template>
  <Loading v-model:active="isLoading"></Loading>
  <div class="container">
    <div class="text-end mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('new')">
        Create New Product
      </button>
    </div>
    <div class="table-responsive">
      <!-- Make the table responsive -->
      <table class="table mt-4">
        <thead>
          <tr>
            <th>Category</th>
            <th>Product Title</th>
            <th>Product Image</th>
            <th>Original Price</th>
            <th>Sale Price</th>
            <th>Enabled</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td>
              <img
                :src="product.imageUrl"
                alt="product main image"
                class="img-fluid"
                style="max-width: 100px"
              />
              <!-- Make image responsive -->
            </td>
            <td class="text-end">{{ product.origin_price }}</td>
            <td class="text-end">{{ product.price }}</td>
            <td>
              <span
                :class="{
                  'text-success': product.is_enabled,
                  'text-danger': !product.is_enabled,
                }"
              >
                {{ product.is_enabled ? 'on' : 'off' }}
              </span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', product)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', product)"
                >
                  Del
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationComponent
      :pages="pages"
      :getProduct="getProduct"
      basePath="/admin"
    />
  </div>
  <!-- Modal components -->
  <DashboardProModal
    :temp-product="tempProduct"
    :update-product="updateProduct"
    ref="pModal"
  ></DashboardProModal>
  <DashboardDelModal
    :temp-product="tempProduct"
    :delete-product="deleteProduct"
    ref="dModal"
  ></DashboardDelModal>
</template>

<script>
import axios from 'axios';
import DashboardDelModal from '@/components/DashboardDelModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import DashboardProModal from '@/components/DashboardProModal.vue';
import Loading from 'vue-loading-overlay';

const { VITE_URL, VITE_API } = import.meta.env;

export default {
  data() {
    return {
      isLoading: true,
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      pages: {},
      modalProducts: null,
      modalDel: null,
      isNew: false,
    };
  },
  methods: {
    getProduct(page = 1) {
      this.isLoading = true;
      const api = `${VITE_URL}/api/${VITE_API}/admin/products?page=${page}`;
      axios.get(api).then((res) => {
        this.isLoading = false;
        this.products = res.data.products;
        this.pages = res.data.pagination;
      });
    },
    openModal(status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.pModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...product, imagesUrl: product.imagesUrl || [] };

        this.isNew = false;
        this.$refs.pModal.openModal();
      } else if (status === 'delete') {
        this.tempProduct = { ...product, imagesUrl: product.imagesUrl || [] };
        this.$refs.dModal.openDeleteModal();
      }
    },
    updateProduct() {
      this.isLoading = true;
      let api = `${VITE_URL}/api/${VITE_API}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        api = `${VITE_URL}/api/${VITE_API}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      axios[method](api, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.products;
          this.getProduct();
          this.$refs.pModal.closeModal();
        })
        .catch(() => {});
    },
    deleteProduct() {
      this.isLoading = true;
      const api = `${VITE_URL}/api/${VITE_API}/admin/product/${this.tempProduct.id}`;
      axios.delete(api, { data: this.tempProduct }).then((res) => {
        this.isLoading = false;
        this.products = res.data.products;
        this.getProduct();
        this.$refs.dModal.closeDeleteModal();
        this.tempProduct = {
          imagesUrl: [],
        };
      });
    },
  },
  components: {
    PaginationComponent,
    DashboardProModal,
    DashboardDelModal,
    Loading,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = token;
    this.getProduct();
  },
};
</script>
