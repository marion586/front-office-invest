<template>
    <div class="bread">
        <a-breadcrumb >
            <a-breadcrumb-item
                class="menuItem-active-link"
                v-for="(item, index) in items"
                :key="index"
            >
                <router-link v-if="item.url" :to="`${item.url}`">
                    <span
                        class="bread__label"
                        :class="{ disabled: isLast(index) }"
                        >{{ item.label }}</span
                    >
                </router-link>
                <span class="bread__label" v-else>{{ item.label }}</span>
                <!-- <a-breadcrumb-separator v-if="index < items.length - 1">/</a-breadcrumb-separator> -->
                <span
                    class="bread__label"
                    v-if="index < items.length - 1"
                    >|</span>
                    <!-- <a-breadcrumb-separator>/</a-breadcrumb-separator>  -->
                </a-breadcrumb-item>

        </a-breadcrumb>
    </div>
</template>
<!-- flex justify-start items-center px-2.5 py-2 mx-2 bg- rounded-lg h-8 -->
<script setup>
    import ABreadcrumb from 'ant-design-vue/lib/breadcrumb/BreadCrumb';
    // import ABreadcrumbSeparator from 'ant-design-vue/lib/breadcrumb/BreadCrumbItem';
    import ABreadcrumbItem from 'ant-design-vue/lib/breadcrumb/BreadCrumbSeparator';

    // import Breadcrumb from "ant-design-vue";
    // import ABreadcrumb from "ant-design-vue/lib/breadcrumb"
    // import a-breadcrumb,a-breadcrumb-item,a-breadcrumb-separator} from "ant-design-vue"
    import { ref, reactive } from 'vue';
    const props = defineProps({
        items: {
            type: Array,
            required: true,
        },
    });
    // active not OP
    const state = reactive({
        isActive: true,
    });

    function isLast(index) {
        // console.log(props.items.length - 1);
        // index === props.items.length - 1
    }
</script>

<style lang="scss" scoped>
    .bread {
        background-color: #ffffff;
        @apply flex justify-start items-center px-2.5 py-2 rounded-lg h-8;
        @media (min-width: 1024px) {
            background-color: white;
            border-radius: 8px;
            margin: 0 15px 18px 15px;
            padding: 14px;
        }
        .ant-breadcrumb-separator{
            margin: 0
        }
        &__label {
            @apply mr-2;
        }
    }
    .active {
        color: green;
    }
</style>
