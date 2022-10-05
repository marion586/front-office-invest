<template>
    <div class="fields">
        <label for="">{{ label }}</label>
        <a-input
            :placeholder="placeholder"
            type="text"
            v-model:value="model"
            :name="nameInput"
            @input="handleInput"
            @change="handleChange"
        />
    </div>
</template>

<script lang="ts" setup>
    import AInput from 'ant-design-vue/lib/input';
    import { onMounted, ref } from 'vue';
    const username = ref(null);
    onMounted(() => {
        console.log(username.value);
    });
    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        model: {
            type: String,
            default: '',
        },
        nameInput: {
            type: String,
            default: '',
        },
    });

    const emit = defineEmits<{
        (event: 'onInput', value: object): void;
        (event: 'change'): void;
    }>();

    const handleInput = (event: Event) => {
        const value = {
            [(event.target as HTMLInputElement).name]: (
                event.target as HTMLInputElement
            ).value,
        };

        emit('onInput', value);
    };

    const handleChange = () => {
        emit('change');
    };
</script>

<style lang="scss" scoped>
    .fields {
        @apply mb-[18px];
        label {
            font-size: 14px;
            font-weight: 600;
            color: var(--color-gray-icon);
            margin-bottom: 10px;
        }
        &:deep() {
            .ant-input {
                border: 1px solid var(--color-stroke-gray);
                font-size: 14px;
                height: 38px;
                border-radius: 4px;
                &::placeholder {
                    font-size: 14px;
                    font-weight: 300;
                }
            }
        }
    }
</style>
