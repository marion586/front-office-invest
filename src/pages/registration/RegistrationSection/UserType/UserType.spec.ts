import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it, Mock, vitest } from 'vitest';
import UserType from './UserType.vue';

describe('UserType.vue', () => {
    it('should render UserType Cmp', () => {
        const wrapper: VueWrapper = mount(UserType);
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should wrap <div>', () => {
        const wrapper: VueWrapper = mount(UserType);
        expect(wrapper.find('div').exists()).toBeTruthy();
    });

    it('should have 2 btn choices', () => {
        const wrapper: VueWrapper = mount(UserType);
        const buttons: DOMWrapper<HTMLButtonElement>[] =
            wrapper.findAll('button');
        expect(buttons.length).toEqual(2);

        expect(buttons[0].text()).toEqual('PARTICULIER');
        expect(buttons[1].text()).toEqual('PROFESSIONNEL');
    });

    it('BUTTON should have event click', () => {
        const wrapper: VueWrapper | any = mount(UserType);
        const buttons: DOMWrapper<HTMLButtonElement>[] =
            wrapper.findAll('button');

        const particulierBtn: DOMWrapper<HTMLButtonElement> = buttons[0];
        const mockFn: Mock = vitest.fn();
        wrapper.vm.handleChoices = mockFn;
        particulierBtn.trigger('click');

        expect(mockFn).toBeCalledTimes(1);
    });
});
