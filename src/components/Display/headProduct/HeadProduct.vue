<template>
    <div class="container-head">
        <div class="container-head__left">
            <avatar src="https://joeschmoe.io/api/v1/random" :size="40" />
            <div class="container-head__left--profile">
                <Title type="h4" :label="label" weight="bold" />
                <Paragraphe>
                    {{ Text }}
                </Paragraphe>
            </div>
        </div>
        <div class="container-head__right">
            <span>H</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import avatar from 'ant-design-vue/lib/avatar';
    defineProps({
        label: {
            type: String,
            required: true,
        },
        Text: {
            type: String,
            required: true,
        },
    });
</script>

<style lang="scss" scoped>
    .container-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__left {
            display: flex;
            gap: 25px;
            align-items: center;
            &--profile {
                display: flex;
                flex-direction: column;
                gap: 4px;
                label {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 17px;
                    color: #8f8f8f;
                }
            }
        }
        &__right {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 10px;
            gap: 10px;
            width: 38px;
            height: 38px;
            background: var(--color-gray);
            border-radius: 100px;
        }
    }
</style>
