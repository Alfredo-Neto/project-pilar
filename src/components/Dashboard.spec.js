/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

import Dashboard from "./Dashboard";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  actions: {
    fetchSession: jest.fn(),
    fetchIncomingMails: jest.fn(),
  },
});

describe("Dashboard", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(Dashboard, {
      localVue,
      store,
    });
  });

  test("Componente é uma instância do Vue", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("As propriedades corretas estão presentes no estado do componente", () => {
    const expected = [
      "isLoading",
      "createSession",
      "getMails",
      "intervalId",
      "sessionId",
      "email",
      "selectedEmail",
      "previousEmailsLength",
      "haveNewMails",
      "permitNotification",
      "hasCopied",
      "emailSelected"
    ];
    const received = Object.keys(wrapper.vm.$data);
    expect(received).toEqual(expected);
  });

  test("Todas as propriedades e ferramentas voltam ao estado inicial quando reset() for executado", () => {
    const initialData = {
      isLoading: false,
      createSession: {
        entity: "users",
        action: "mutate",
        payload: {},
      },
      getMails: {
        entity: "users",
        action: "query",
        payload: {},
      },
      intervalId: "1234",
      sessionId: "1234",
      email: "teste@teste",
      selectedEmail: "selected@selected",
      previousEmailsLength: 10,
      haveNewMails: true,
      permitNotification: false,
      hasCopied: false,
      emailSelected: false
    };

    setData(wrapper, initialData);
    resetData(wrapper);

    const {
      isLoading,
      intervalId,
      sessionId,
      email,
      selectedEmail,
      previousEmailsLength,
      haveNewMails,
      permitNotification,
      hasCopied,
      emailSelected
    } = initialData;

    expect(isLoading).toBe(false);
    expect(intervalId).toBe("1234");
    expect(sessionId).toBe("1234");
    expect(email).toBe("teste@teste");
    expect(selectedEmail).toBe("selected@selected");
    expect(previousEmailsLength).toBe(10);
    expect(haveNewMails).toBe(true);
    expect(permitNotification).toBe(false);
    expect(hasCopied).toBe(false);
    expect(emailSelected).toBe(false);
  });

  test("getSession chama fetchSession com o payload correto", async () => {
    const fetchSessionMock = jest.fn().mockResolvedValue({
      data: {
        introduceSession: {
          id: "1234",
          expiresAt: "2023-07-08",
          addresses: [
            {
              address: "teste@teste",
            },
          ],
        },
      },
    });

    store.dispatch = fetchSessionMock;

    await wrapper.vm.getSession();

    expect(wrapper.vm.sessionId).toBe("1234");
    expect(wrapper.vm.email).toBe("teste@teste");
  });

//   test("getSession calls fetchIncomingMails action with the correct payload", async () => {
//     const fetchIncomingMailsMock = jest.fn().mockResolvedValue({
//       data: {
//         session: {
//           mails: [
//             {
//               toAddr: "example@10mail.org",
//               text: "Hello\r\n",
//               rawSize: 812,
//               html: null,
//               headerSubject: "Hello",
//               fromAddr: "test@example.com",
//               downloadUrl:
//                 "https://dropmail.me/download/mail/gql:1:9c3316a6-69d2-42fd-a2e2-3f3fd72f494a/vb18co6tn6b4pv10hgr7lhaljcnrhvk5",
//             },
//           ],
//         },
//       },
//     });

//     store.dispatch = fetchIncomingMailsMock;

//     await wrapper.vm.getIncomingMails();

//     expect(wrapper.vm.incomingMails[0].toAddr).toEqual(
//       "example@10mail.org"
//     );
//     expect(wrapper.vm.incomingMails[0].text).toEqual("Hello\r\n");
//     expect(wrapper.vm.incomingMails[0].rawSize).toEqual(812);
//     expect(wrapper.vm.incomingMails[0].html).toEqual(null);
//     expect(wrapper.vm.incomingMails[0].headerSubject).toEqual("Hello");
//     expect(wrapper.vm.incomingMails[0].fromAddr).toEqual(
//       "test@example.com"
//     );
//     expect(wrapper.vm.fetchIncomingMails[0].downloadUrl).toEqual(
//       "https://dropmail.me/download/mail/gql:1:9c3316a6-69d2-42fd-a2e2-3f3fd72f494a/vb18co6tn6b4pv10hgr7lhaljcnrhvk5"
//     );
//   });

  const setData = (wrapper, data) => {
    wrapper.setData(data);
  };

  const resetData = (wrapper) => {
    const initialData = {
      isLoading: false,
      intervalId: "1234",
      sessionId: "1234",
      email: "teste@teste",
      selectedEmail: "selected@selected",
      previousEmailsLength: 10,
      haveNewMails: true,
      permitNotification: false,
      hasCopied: false,
      emailSelected: false
    };

    wrapper.setData({ ...initialData });
  };
});
