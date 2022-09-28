import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppHeader from '../components/Layouts/AppHeader.vue';
import App from '../App.vue';

describe('App.vue', () => {
    it('should be mounted', () => {
        const wrapper: VueWrapper = mount(App, {
            global: {
                stubs: ['router-view', 'router-link'],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('should wrap AppHeader', () => {
        const wrapper: VueWrapper = mount(App, {
            global: {
                stubs: ['router-view', 'router-link'],
            },
        });

        expect(wrapper.findComponent(AppHeader).exists()).toBeTruthy();
    });
});
