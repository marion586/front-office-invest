import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HeadProduct from './HeadProduct.vue';
describe('HeadProduct.vue', () => {
    it('should render HeaderProduct.vue', () => {
        const wrapper = shallowMount(HeadProduct);
        expect(wrapper.exists()).toBeTruthy();
    });
});
