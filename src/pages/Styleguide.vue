<template>
    <div>
        <div>
            <Title type="h2" label="title" :weight="600" />
            <Title type="h1" label="title h1" :weight="700" />
        </div>
        <div>
            <Title type="h2" label="Button" :weight="600" />
            <Button> primary </Button>
            <Button type="secondary"> Secondary </Button>
        </div>
        <div>
            <Title type="h2" label="Button menu" :weight="600" />
            <ButtonMenu> Functionnal </ButtonMenu>
        </div>
        <div>
            <Title type="h2" label="Input" :weight="600" />
            <Input label="Input label" placeholder="input" />
        </div>
        <div>
            <Title type="h2" label="Select" :weight="600" />
            <Select name="select" placeholder="select" :options="options" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import ButtonMenu from '@/components/common/ButtonMenu/ButtonMenu.vue';
    import Select from '@/components/Common/Select/Select.vue';

    import { ref } from 'vue';

    interface Option {
        value: string;
        label: string;
    }

    const options = ref<Option[]>([
        {
            value: 'jack',
            label: 'Jack',
        },
        {
            value: 'lucy',
            label: 'Lucy',
        },
        {
            value: 'disabled',
            label: 'Disabled',
        },
        {
            value: 'yiminghe',
            label: 'Yiminghe',
        },
    ]);
</script>

<style scoped></style>
