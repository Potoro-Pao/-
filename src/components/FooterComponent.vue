<template>
  <div class="py-3" style="background-color: #504152">
    <div class="container">
      <div v-if="this.isFrontView">
        <div
          class="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4"
        >
          <router-link
            v-if="isFrontView"
            class="h4"
            style="color: #f4f4f4"
            to="/"
            >BOOKS</router-link
          >
          <ul class="d-flex list-unstyled mb-0 h4">
            <li>
              <a href="#" class="mx-3" style="color: #f4f4f4">
                <font-awesome-icon :icon="['fab', 'facebook']" />
              </a>
            </li>
            <li>
              <a href="#" class="mx-3" style="color: #f4f4f4">
                <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
            </li>
            <li>
              <a href="#" class="ms-3" style="color: #f4f4f4">
                <font-awesome-icon :icon="['fab', 'line']" />
              </a>
            </li>
          </ul>
        </div>
        <div
          class="d-flex flex-column flex-md-row
           justify-content-between align-items-md-end align-items-start text-white"
        >
          <div class="mb-md-0 mb-1">
            <p class="mb-0">
              <a
                href="tel:+02-3456-7890"
                style="color: #f4f4f4; text-decoration: none"
                >02-3456-7890</a
              >
            </p>
            <!-- Update email address with mailto: link -->
            <p class="mb-0">
              <a
                href="mailto:service@mail.com"
                style="color: #f4f4f4; text-decoration: none"
                >service@mail.com</a
              >
            </p>
          </div>
          <p class="mb-0">© 2020 LOGO All Rights Reserved.</p>
        </div>
      </div>
      <div v-else class="text-white">
        <p class="text-center">
          This website is for personal portfolio use only and will not be used
          for commercial purposes.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['basePath'],
  data() {
    return {
      isFrontView: false,
    };
  },
  mounted() {
    if (this.basePath === '#/') {
      this.isFrontView = true;
    }
  },
};
</script>
