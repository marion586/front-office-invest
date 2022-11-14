<template>
    <a-modal
        v-model:visible="show"
        :dialog-style="{ top: '50px' }"
        :width="modalWidth ? parseInt(modalWidth) : 900"
        @cancel="onBack(false)"
        :footer="null"
        :title="title"
        :get-container="getContainer(contentId)"
    >
        <!-- <div class="contact-vendeur__overlay" @click="onBack(false)"></div> -->
        <div class="">
            <div v-if="!title" class="">
                <!-- contact-vendeur__title -->
                <slot name="header" />
            </div>
            <slot name="content" />
        </div>

        <template v-slot:footer>
            <div>
                <slot name="footerModal" />
                test
            </div>
        </template>
    </a-modal>
</template>

<script>
    import AModal from 'ant-design-vue/lib/modal/Modal';
    export default {
        props: [
            'isShowModal',
            'modalWidth',
            'titleModal',
            'contentId',
            'centered',
        ],
        watch: {
            isShowModal: {
                immediate: true,
                handler(isSHow) {
                    this.show = isSHow;
                },
            },
            titleModal: {
                immediate: true,
                handler(title) {
                    this.title = title;
                },
            },
        },
        data() {
            return {
                show: false,
                title: '',
            };
        },
        methods: {
            onBack(type) {
                this.$emit('onBack', type);
            },
            getContainer(id) {
                return document.getElementById(id);
            },
        },
    };
</script>

<style lang="scss">
    // .ant-modal .ant-modal-body {
    // 	background-color: #f4f5f7;
    // }
</style>
