<template>
  <div>
    <div v-for="domain in domainsToRender" :key="domain.id">
      {{ domain }}
    </div>
    <button @click="getDomains">Pegar domínios</button>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapState, mapActions } from "vuex";

const GET_DOMAINS = gql`
  query {
    domains {
      id
      name
      introducedAt
      availableVia
    }
  }
`;

export default {
  data() {
    return {
      isLoading: false,
      queryDomains: {
        entity: "users",
        action: "getDomains",
        query: GET_DOMAINS,
      },
      domainsToRender: [],
    };
  },

  computed: mapState({
    domains: (state) => state.domains,
  }),

  mounted() {
    this.getDomains();
  },

  methods: {
    ...mapActions({
      fetchDomains: "fetchDomains",
    }),

    getDomains() {
      this.isLoading = true;

      this.fetchDomains(this.queryDomains)
        .then(() => {
          this.renderDomains(this.domains);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },

    renderDomains() {
      this.domainsToRender = this.domains.map((domain) => domain);
    },
  },
};
</script>
