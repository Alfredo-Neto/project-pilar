<template>
  <div class="email-list">
    <div v-if="emails.length === 0" class="empty-message">
      Nenhum email por aqui :)
    </div>
    <b-card-group v-else class="d-flex flex-column">
      <EmailItem
        v-for="email in emails"
        :key="email.id"
        :email="email"
        :selected="email === selectedEmail"
        @select="handleEmailSelect"
      />
    </b-card-group>
  </div>
</template>

<script>
import { BCardGroup } from "bootstrap-vue";
import EmailItem from "./EmailItem.vue";

export default {
  components: {
    EmailItem,
    BCardGroup,
  },
  props: {
    emails: {
      type: Array,
      required: true,
    },
    selectedEmail: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleEmailSelect(email) {
      this.$emit("select", email);
    },
  },
};
</script>

<style scoped>
.email-list {
  border: 1px solid #ccc;
  margin-top: 10px;
  padding: 5px;
}

.empty-message {
  text-align: center;
  color: #999;
  margin-top: 20px;
}
</style>
