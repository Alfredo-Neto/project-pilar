<template>
  <div class="d-flex justify-content-center align-items-center">
    <b-card class="mw-100 w-75 p-3">
      <b-card-body>
        <div
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <div>{{ email }}</div>
          <button class="mt-2 mb-2" @click="getSession">Pegar sessão</button>
        </div>
        <!-- <Header /> -->
        <div>
          <b-card>
            <b-card-body>
              <!-- <Sidebar /> -->
              <b-nav
                v-for="mail in incomingMails"
                :key="mail.id"
                vertical
                class="w-100"
              >
                <b-nav-item disabled>{{ mail.headerSubject }}</b-nav-item>
                <b-nav-item disabled>{{ mail.text }}</b-nav-item>
              </b-nav>
              <!-- < fim Sidebar /> -->
              <div class="content">
                <EmailList />
                <EmailView v-if="selectedEmail" :email="selectedEmail" />
              </div>
            </b-card-body>
          </b-card>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapState, mapActions } from "vuex";
import { getStorage, setStorage } from "@/utils/localStorage.js";

const CREATE_SESSION = gql`
  mutation {
    introduceSession {
      id
      expiresAt
      addresses {
        address
      }
    }
  }
`;

const GET_INCOMING_MAILS = gql`
  query ($id: ID!) {
    session(id: $id) {
      addresses {
        address
      }
      mails {
        rawSize
        fromAddr
        toAddr
        downloadUrl
        text
        headerSubject
      }
    }
  }
`;

export default {
  data() {
    return {
      isLoading: false,
      createSession: {
        entity: "users",
        action: "mutate",
        payload: CREATE_SESSION,
      },
      getMails: {
        entity: "users",
        action: "query",
        payload: GET_INCOMING_MAILS,
      },
      intervalId: null,
      sessionId: null,
      email: null,
      items: [],
    };
  },

  computed: mapState({
    session: (state) => state.session,
    incomingMails: (state) => state.incomingMails,
  }),

  mounted() {
    if (getStorage("session_id") && getStorage("email")) {
      console.log("cai no if");
      this.sessionId = getStorage("session_id");
      this.email = getStorage("email");
    } else {
      console.log("cai no else");
      // this.getSession();
    }

    console.log("SESSION ID: ", this.sessionId);
    if (this.sessionId) {
      this.startInterval(this.sessionId);
    }
  },

  watch: {
    sessionId() {
      if (this.sessionId) {
        this.startInterval(this.sessionId);
      }
    },
  },

  beforeUnmount() {
    this.stopInterval();
  },

  methods: {
    ...mapActions({
      fetchSession: "fetchSession",
      fetchIncomingMails: "fetchIncomingMails",
    }),

    startInterval(sessionId) {
      this.intervalId = setInterval(() => {
        console.log("SET INTERVAL SESSION ID: ", sessionId);
        this.getIncomingMails(sessionId);
      }, 15000);
    },

    stopInterval() {
      clearInterval(this.intervalId);
    },

    getSession() {
      this.isLoading = true;
      this.fetchSession(this.createSession)
        .then(() => {
          this.sessionId = this.session.id;
          setStorage("session_id", this.sessionId);
          this.email = this.session.addresses[0].address;
          setStorage("email", this.email);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });

      // const query = gql`
      //   mutation {
      //     introduceSession {
      //       id
      //       expiresAt
      //       addresses {
      //         address
      //       }
      //     }
      //   }
      // `;

      // this.$apolloProvider.defaultClient
      //   .mutate({
      //     mutation: query,
      //   })
      //   .then(({ data }) => {
      //     console.log({ data });
      //   });
    },

    getIncomingMails(sessionId = "") {
      console.log("SESSION ID NO getIncomingMails", this.session.id);

      this.getMails.query = { id: `${sessionId}` };

      this.isLoading = true;
      this.fetchIncomingMails(this.getMails)
        .then(() => {
          console.log("INCOMING MAILS: ", this.incomingMails);
          this.items = [];
          this.items.push(this.incomingMails);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });

      // const variables = { id: `${sessionId}` };

      // this.$apolloProvider.defaultClient
      //   .query({
      //     query: GET_INCOMING_MAILS,
      //     variables: {
      //       ...variables,
      //     },
      //   })
      //   .then(({ data }) => {
      //     console.log("DEU BOM?", { data });
      //   });
    },
  },
};
</script>
