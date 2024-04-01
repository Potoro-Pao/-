<template>
  <div
    id=" productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>Add Product</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">Enter Image URL</label>
                  <input
                    type="text"
                    v-model="editProduct.imageUrl"
                    class="form-control"
                    placeholder="Please enter the image link"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              </div>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <h4>Other Images</h4>
                <div
                  v-for="(img, key) in tempProduct.imagesUrl"
                  :key="key + 123"
                >
                  <img :src="img" alt="" class="img-fluid" />
                  <input
                    type="text"
                    class="form-control"
                    v-model="editProduct.imagesUrl[key]"
                  />
                </div>
              </div>
              <button
                type="button"
                class="btn btn-outline-primary w-100"
                @click="editProduct.imagesUrl.push('')"
                v-if="
                  tempProduct.imagesUrl.length === 0 ||
                  tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                "
              >
              Add
              </button>
              <button
              type="button"
                v-else
                class="btn btn-outline-danger w-100"
                @click="editProduct.imagesUrl.pop()"
              >
              Delete Image
              </button>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  id=" title"
                  type="text"
                  class="form-control"
                  placeholder="Please enter the title"
                  v-model="editProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">Category</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="Please enter the category"
                    v-model="editProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">Unit</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="Please enter the unit"
                    v-model="editProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">Original Price</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="Please enter the original price"
                    v-model.number="editProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">Sale Price</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="Please enter the sale price"
                    v-model.number="editProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">Product Description</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="Please enter the product description"
                  v-model="editProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="Please enter the product content"
                  v-model="editProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="editProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >Enabled</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
          Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
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
  props: ['tempProduct', 'updateProduct'],
  data() {
    return {
      modalProducts: null,
      editProduct: {},
    };
  },
  watch: {
    tempProduct() {
      this.editProduct = this.tempProduct;
    },
  },
  methods: {
    openModal() {
      this.modalProducts.show();
    },
    closeModal() {
      this.modalProducts.hide();
    },
  },
  mounted() {
    this.modalProducts = new Modal(this.$refs.productModal);
    this.editProduct = this.tempProduct;
  },
};
</script>
