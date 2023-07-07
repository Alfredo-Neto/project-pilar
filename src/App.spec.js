/* eslint-disable no-undef */
import { shallow } from "@vue/test-utils";
import App from "@/App.vue";

describe("App", () => {
  test("is a Vue instance", () => {
    const wrapper = shallow(App);
    expect(wrapper.vm).toBeTruthy();
  });
});
