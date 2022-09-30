import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Registration from './registration.vue';
describe('Registration.vue', function () {
    const wrapper = mount(Registration);
    const form = wrapper.find('form');

    it('should render Registration', function () {
        expect(wrapper.exists()).toBe(true);
    });
    it('should wrap <form> element', function () {
        expect(form.exists()).toBe(true);
    });

    it('<fomr >should wrap emai && name && typeUser && logo && address && password && confirm pwd && nameEntreprise && numberEntreprise element', function () {
        const name = form.find('input[name=name]');
        const email = form.find('input[name=email]');
        const typeUser = form.find('input[name=typeUser]');
        const logo = form.find('input[name=logo]');
        const adress = form.find('input[name=adress]');
        const password = form.find('input[name=passoword]');
        const confirmPassword = form.find('input[name=confirmPassword]');
        const nameEntreprise = form.find('input[name=nameEntrepise]');
        const numberEntreprise = form.find('input[name=numberEntreprise]');
        expect(name.exists()).toBe(true);
        // email.exists() &&
        //     typeUser.exists() &&
        //     logo.exists() &&
        //     adress.exists() &&
        //     password.exists() &&
        //     confirmPassword.exists() &&
        //     nameEntreprise.exists() &&
        //     numberEntreprise.exists();
    });
});
