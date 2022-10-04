<template>
    <div class="subscription__card__item">
        <Title
            type="h3"
            :label="(subscriptionCards?.subscriptionType as string)"
            weight="600"
        />
        <Title type="h1" :label="parsedAmount" weight="600" />
        <Button @click="$emit('on-choose-card')" type="secondary"
            >Bénéficier</Button
        >
        <p class="subscription__card__item__desc">
            {{ subscriptionCards?.subscriptionDesc }}
        </p>
        <ul class="subscription__card__item__info">
            <li
                v-for="(item, index) in subscriptionCards?.subscriptionInfo"
                :key="index"
            >
                <span>&check;</span>{{ item }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { computed, PropType } from 'vue';
    const props = defineProps({
        subscriptionCards: {
            type: Object as PropType<ISubscriptionCards>,
            require: true,
        },
    });

    const parsedAmount = computed(
        () => `${props.subscriptionCards?.subscriptionAmount.toFixed(2)} €`
    );
</script>

<style lang="scss">
    .subscription__card__item {
        border-radius: 8px;
        padding: 24px;
        background-color: #fff;
        width: 246.5px;
        @media screen and (max-width: 430px) {
            width: 100%;
        }
        @apply flex justify-center flex-col items-center;
        gap: 25px;
        &__desc {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            text-align: center;
            color: #606060;
        }
        &__info {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            @apply flex justify-items-center flex-col gap-[13px];
            span {
                color: #949fb5;
                font-size: 20px;
            }
            li {
                @apply flex gap-[13px];
            }
        }
    }
</style>
