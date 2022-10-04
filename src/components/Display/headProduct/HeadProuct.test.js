import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HeadProduct from './HeadProduct.vue';
describe('HeadProduct.vue', () => {
    it('should render HeaderProduct.vue', () => {
        const wrapper = shallowMount(HeadProduct);
        expect(wrapper.exists()).toBeTruthy();
    });
    it('check props ', () => {
        const text = 'menye';
        const label = 'marion';

        const headProduct = {
            components: { HeadProduct },
            template: ` <HeadProduct Text="${text}" label="${label}" />`,
        };
        const headProd = mount(headProduct);

        expect(headProduct.components.HeadProduct).toBeDefined();
        expect(headProd.getComponent(HeadProduct).props()).toEqual({
            Text: text,
            label: label,
        });
    });
});
