import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppHeader from './AppHeader.vue';

describe('AppHeader.vue', () => {
    const wrapper = mount(AppHeader, {
        global: {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        },
    });
    it('should be mounted', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should wrap 3 link', () => {
        const links = wrapper.findAllComponents(RouterLinkStub);
        expect(links.length).toEqual(5);
        expect(links[0].text()).toEqual('HOME');
        expect(links[1].text()).toEqual('ABOUT');
        expect(links[2].text()).toEqual('CONNEXION');
        expect(links[3].text()).toEqual('INSCRIPTION');
        expect(links[4].text()).toEqual('MON COMPTE');
    });
});
