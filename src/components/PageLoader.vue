<template>
  <div class="page-loader" v-if="isLoading">
    <b-spinner variant="primary"></b-spinner>
  </div>
  <div v-else></div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: null,
    },
  },

  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style scoped>
.page-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>
