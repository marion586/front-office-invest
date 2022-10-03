import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Login from './Login.vue';

describe('Login.vue', () => {
    it('should render Login.vue', () => {
        const wrapper = shallowMount(Login);
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should wrap be a valid form {<form></form>}', () => {
        const wrapper = shallowMount(Login);
        expect(wrapper.find('form').exists()).toBeTruthy();
    });

    it('should have form who wrap input:text&&password && button:submit', () => {
        const wrapper = shallowMount(Login);
        const form = wrapper.find('form');
        const emailInput = wrapper.find('#username');
        const passwordInput = wrapper.find('#password');
        const submitButton = wrapper.find('button[type=submit]');

        expect(form.findAll('input').length).toBe(2);
        expect(emailInput.attributes('type')).toEqual('username');
        expect(passwordInput.attributes('type')).toEqual('password');
        expect(submitButton.attributes('type')).toEqual('submit');
    });
});
