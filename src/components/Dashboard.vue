<template>
  <div>
    <div class="mt-5 d-flex justify-content-center align-items-center">
      <b-card class="mw-100 w-75 p-3">
        <b-card-body>
          <div
            class="d-flex flex-column justify-content-center align-items-center minimum-width"
          >
            <div v-if="hasCopied">
              <b-alert variant="success" fade show>
                Copiado para a área de transferência!
              </b-alert>
            </div>
            <div v-if="!!permitNotification && haveNewMails && !selectedEmail">
              <b-alert variant="success" dismissible fade show>
                Chegou um novo e-mail para você!
              </b-alert>
            </div>
            <div class="input-group mb-3">
              <label for="email" class="me-2 d-flex align-items-center"
                >Seu e-mail temporário</label
              >
              <input
                type="text"
                class="form-control text-center"
                readonly
                id="email"
                v-model="email"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="cpyToClipboard"
                >
                  Copiar e-mail
                </button>
              </div>
            </div>
            <button
              class="btn btn-outline-success mt-2 mb-2"
              @click="getSession"
            >
              Gerar novo e-mail
            </button>
          </div>
          <div class="d-flex minimum-width">
            <EmailList
              :emails="incomingMails"
              :selectedEmail="selectedEmail"
              @select="handleEmailSelect"
            />
            <EmailView v-if="selectedEmail" :email="selectedEmail" />
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapState, mapActions } from "vuex";
import { getStorage, setStorage, removeStorage } from "@/utils/localStorage.js";
import { copyToClipboard } from "@/utils/string.js";
import EmailList from "./EmailList.vue";
import EmailView from "./EmailView.vue";
import { BAlert } from "bootstrap-vue";
import Swal from "sweetalert2";

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
      selectedEmail: null,
      previousEmailsLength: null,
      haveNewMails: false,
      permitNotification: false,
      hasCopied: false,
    };
  },

  components: {
    EmailList,
    EmailView,
    BAlert,
  },

  computed: mapState({
    session: (state) => state.session,
    incomingMails: (state) => state.incomingMails,
  }),

  mounted() {
    if (getStorage("permitNotification")) {
      this.permitNotification = getStorage("permitNotification");
      if (this.permitNotification == "true") this.permitNotification = true;
      if (this.permitNotification == "false") this.permitNotification = false;
    }
    if (!this.permitNotification) {
      Swal.fire({
        title: "Você deseja receber notificações de novos e-mails?",
        icon: "success",
        confirmButtonText: "Sim",
        showCancelButton: true,
        cancelButtonText: "Dispensar",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Você receberá uma notificação em tela sempre que um novo e-mail chegar"
          ).then(() => {
            setStorage("permitNotification", true);
            this.permitNotification = true;
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setStorage("permitNotification", false);
          this.permitNotification = false;
        }
      });
    }

    if (getStorage("session_id") && getStorage("email")) {
      this.sessionId = getStorage("session_id");
      this.email = getStorage("email");
    } else {
      this.getSession();
    }

    if (this.sessionId) {
      this.getIncomingMails(this.sessionId);
    }
  },

  watch: {
    sessionId() {
      if (this.sessionId) {
        this.startInterval(this.sessionId);
      } else {
        removeStorage("session_id");
        this.stopInterval();
      }
    },

    incomingMails(newMails, oldMails) {
      this.haveNewMails = newMails.length > oldMails.length;
      this.previousEmailsLength = newMails.length;
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
    },

    getIncomingMails(sessionId = "") {
      this.getMails.query = { id: `${sessionId}` };

      this.isLoading = true;
      this.fetchIncomingMails(this.getMails)
        .then(() => {
          this.items = [];
          this.items.push(this.incomingMails);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },

    handleEmailSelect(email) {
      this.selectedEmail = email;
    },

    cpyToClipboard() {
      this.hasCopied = true;
      copyToClipboard(this.email);
      setTimeout(() => {
        this.hasCopied = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.minimum-width {
  min-width: 400px;
}
</style>
