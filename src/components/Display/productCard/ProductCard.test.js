import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import productCard from './ProductCard.vue';
describe('productCard.vue', () => {
    it('should render productCard.vue', () => {
        const wrapper = shallowMount(productCard);
        expect(wrapper.exists()).toBeTruthy();
    });
});
