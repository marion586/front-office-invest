import { mount, VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import UserType from './RegistrationSection/UserType/UserType.vue';
import registration from './registration.vue';
import Subscription from './SubscriptionSection/Subscription.vue';

describe('registration.vue', () => {
    it('should render rgistration cmp', () => {
        const wrapper: VueWrapper = shallowMount(registration);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render UserType cmp and not Sub cmp when usertype not assigned', async () => {
        const wrapper: VueWrapper = shallowMount(registration);
        const userTypeWrapper: VueWrapper = wrapper.findComponent(UserType);
        const SubscriptionWrapper: VueWrapper =
            wrapper.findComponent(Subscription);
        // render on mount
        (wrapper.vm as any).usertype = '';

        await wrapper.vm.$nextTick();
        expect(userTypeWrapper.exists()).toBe(true);
        expect(SubscriptionWrapper.exists()).toBe(false);
        // unmount on choice made
        (wrapper.vm as any).usertype = 'particulier';
        await wrapper.vm.$nextTick();
        expect(userTypeWrapper.exists()).toBe(false);
    });
});
