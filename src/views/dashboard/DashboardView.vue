<template>
<div class="position-relative" style="min-height: 100vh">
  <NavbarComponent basePath="/admin"></NavbarComponent>
  <BgComponent></BgComponent>
  <RouterView></RouterView>
</div>
<FooterComponent class="mt-6 w-100"></FooterComponent>
</template>

<script>
import axios from 'axios';
import BgComponent from '@/components/BgComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import NavbarComponent from '@/components/NavbarComponent.vue';

const { VITE_URL } = import.meta.env;

export default {
  methods: {
    checkAdmin() {
      const url = `${VITE_URL}/api/user/check`;

      axios
        .post(url)
        .then(() => {})
        .catch(() => {
          this.$router.push('/login');
        });
    },
  },

  components: {
    BgComponent,
    FooterComponent,
    NavbarComponent,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
};
</script>
