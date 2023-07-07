<template>
  <div class="email-item-container">
    <b-card
      role="button"
      :class="{ selected: selected }"
      @click="selectEmail"
      class="email-item"
    >
      <b-card-body>
        <div class="d-flex flex-column align-items-center mw-75">
          <b-card-text class="sender">{{
            trimStr(email.headerSubject)
          }}</b-card-text>
          <b-card-text class="subject">{{
            trimStr(email.fromAddr)
          }}</b-card-text>
          <b-card-text class="date">{{ trimStr(email.text) }}</b-card-text>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { trimString } from "@/utils/string.js";

export default {
  props: {
    email: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectEmail() {
      this.$emit("select", this.email);
    },

    trimStr(str) {
      return trimString(str);
    },
  },
};
</script>

<style scoped>
.email-item-container {
  flex: 1;
  max-width: 100%;
}

.email-item {
  padding: 5px;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.email-item.selected {
  background-color: #e1f2ff;
}

.sender {
  font-weight: bold;
}

.subject {
  margin-top: 2px;
  color: #555;
}

.date {
  margin-top: 2px;
  font-size: 12px;
  color: #999;
}

.email-item .sender {
  font-weight: bold;
}

.email-item .subject {
  margin-top: 2px;
  color: #555;
}

.email-item .date {
  margin-top: 2px;
  font-size: 12px;
  color: #999;
}
</style>
