import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CardProducts from './CardProducts.vue';
describe('CardProducts.vue', () => {
    it('should render CardProducts.vue', () => {
        const wrapper = shallowMount(CardProducts);
        expect(wrapper.exists()).toBeTruthy();
    });
});
