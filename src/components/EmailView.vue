<template>
  <div
    v-if="email"
    class="email-view w-100 flex-grow-1 text-break position-absolute ms-2 margin-t"
  >
    <b-card>
      <b-card-header>
        <b-card-title class="fs-14">{{ email.headerSubject }}</b-card-title>
        <b-card-sub-title class="fs-12">{{ email.fromAddr }}</b-card-sub-title>
      </b-card-header>
      <b-card-body>
        <p class="text-left mt-0">{{ email.text }}</p>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
.no-email-selected {
  margin-top: 20px;
}
.margin-t {
  margin-top: 10px;
}

.fs-14 {
  font-size: 14px;
}

.fs-12 {
  font-size: 12px;
}
</style>
