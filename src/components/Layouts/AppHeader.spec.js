import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppHeader from './AppHeader.vue';

describe('AppHeader.vue', () => {
    it('should be mounted', () => {
        const wrapper = mount(AppHeader, {
            global: {
                stubs: ['router-link'],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
