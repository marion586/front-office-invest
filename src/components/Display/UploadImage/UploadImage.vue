<template>
    <a-upload
        list-type="picture-card"
        v-model:file-list="fileList"
        @preview="handlePreview"
        @change="handlechange"
    >
        <div>
            <plus-outlined />

            <div style="margin-top: 8px">Ajouter du fichier</div>
        </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>

<script setup lang="ts">
    import { PlusOutlined } from '@ant-design/icons-vue';
    import { Upload as AUpload, Modal as AModal } from 'ant-design-vue';
    import type { UploadProps } from 'ant-design-vue';

    import { ref } from 'vue';

    const previewVisible = ref(false);
    const previewImage = ref('');
    const fileList = ref([]);

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCancel = () => {
        previewVisible.value = false;
    };

    const handlePreview = async (file: UploadProps['fileList'][number]) => {
        if (!file.url && !file.preview) {
            file.preview = (await getBase64(file.originFileObj)) as string;
        }

        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
    };

    const handlechange = (file: any) => {
        console.log(file);
    };
</script>

<style scoped></style>
