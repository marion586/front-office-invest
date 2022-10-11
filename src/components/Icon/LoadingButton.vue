<template>
    <i class="custom-icon__loaging">
        <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
            style="enable-background: new 0 0 50 50"
            xml:space="preserve"
        >
            <path
                fill="#FFF"
                d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
            >
                <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"
                ></animateTransform>
            </path>
        </svg>
    </i>
</template>
<script lang="ts" setup>
    import { PropType, onMounted, ref } from 'vue';
    const props = defineProps({
        size: {
            type: String as PropType<'sm' | 'md'>,
            default: 'md',
        },
    });
    const svgSize = ref<string>('');
    onMounted(() => {
        switch (props.size) {
            case 'md':
                svgSize.value = '40px';
                break;
            case 'sm':
                svgSize.value = '30px';
                break;
            default:
                break;
        }
    });
</script>
<style lang="scss" scoped>
    svg {
        display: inline;
        height: v-bind('svgSize');
        width: v-bind('svgSize');
    }
</style>
