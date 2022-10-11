import { describe, expect, it } from "vitest";
import InputDate from '@/components/Common/InputDate/InputDate.vue'
import { mount } from "@vue/test-utils";


describe("Test the input type date", () => {
      it("Should contain the input date de ant", () => {
            const wrapper = mount(InputDate);

            expect(wrapper.find("").exists()).toBe(true);
      });
})