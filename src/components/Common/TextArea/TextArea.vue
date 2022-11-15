<script lang="ts" setup>
    import Textarea from 'ant-design-vue/lib/input/TextArea';
    import { ref, watch } from 'vue';

    const value = ref<string>('');

    const emit = defineEmits<{
        (event: 'on-input-area', value: object): void;
    }>();

    const handleInput = (event: Event) => {
        emit('on-input-area', event);
    };

    const props = defineProps({
        label: {
            type: String,
            required: true,
        },
        nameInput: {
            type: String,
            required: true,
        },
        maxLength: {
            type: Number,
        },
        showCount: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
    });
</script>

<template>
    <div class="textarea">
        <label class="textarea__label">
            <span v-if="props.required" class="textarea__required">*</span>
            {{ props.label }}
        </label>
        <Textarea
            :name="props.nameInput"
            :maxlength="props.maxLength"
            :show-count="props.showCount"
            v-model:value="value"
            :required="required"
            @input="handleInput"
        />
    </div>
</template>

<style lang="scss" scoped>
    .textarea {
        @apply flex flex-col gap-[10px];

        &:deep() {
            .textarea:hover {
                border: solid var(--color-primary) 1px;
                box-shadow: none;
            }
            .ant-input:hover {
                border: solid var(--color-primary) 1px;
                box-shadow: none;
            }
            .ant-input:focus {
                border: solid var(--color-primary) 1px;
                box-shadow: none;
            }
        }

        &__required {
            color: red;
            margin-right: 5px;
        }

        &__label {
            font-size: 14px;
            font-weight: 600;
            color: var(--color-gray-icon);
            display: block;
        }
    }
</style>
