<template>
    <div class="container-head-product">
        <div class="wrapper">
            <avatar src="https://joeschmoe.io/api/v1/random" :size="40" />
            <div class="content">
                <Title type="h4" :label="label" weight="bold" />
                <label>{{ Text }}</label>
            </div>
        </div>
        <div class="heart-icon">
            <span>H</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '../../Common/Title/Title.vue';
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

<style lang="scss">
    .container-head-product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .wrapper {
            display: flex;
            gap: 25px;
            align-items: center;
            .content {
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
        .heart-icon {
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
