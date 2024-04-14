<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
      >
        <router-link :to="crumb.path">{{ crumb.title }}</router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    breadcrumbs: Array,
  },
};
</script>

<style scoped>
.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
}
</style>
