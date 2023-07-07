<template>
  <div class="email-item-container">
    <b-card
      role="button"
      :class="{ selected: selected }"
      @click="selectEmail"
      class="email-item"
    >
      <div class="d-flex flex-column align-items-center mw-75">
        <div class="sender">{{ trimStr(email.headerSubject) }}</div>
        <div class="subject">{{ trimStr(email.fromAddr) }}</div>
        <div class="date">{{ trimStr(email.text) }}</div>
      </div>
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
  margin-top: -2px;
  font-size: 12px;
  color: #999;
}

.email-item .sender {
  font-weight: bold;
}

.email-item .subject {
  margin-top: -2px;
  color: #555;
}

.email-item .date {
  margin-top: -2px;
  font-size: 12px;
  color: #999;
}
</style>
