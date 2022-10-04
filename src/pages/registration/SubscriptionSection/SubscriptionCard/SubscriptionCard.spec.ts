import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SubscriptionCard from './SubscriptionCard.vue';

describe('SubscriptionCard.vue', () => {
    it('should render SubscriptionCard.vue', () => {
        const wrapper: VueWrapper = shallowMount(SubscriptionCard);
        expect(wrapper.exists()).toBe(true);
    });
});
