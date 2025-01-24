<template>
    <a-upload
        list-type="picture-card"
        v-model:file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
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
    import type { UploadFile } from 'ant-design-vue';
    import { ref } from 'vue';

    // State variables
    const previewVisible = ref(false); // Controls the visibility of the modal
    const previewImage = ref<string | undefined>(undefined); // Stores the image to preview
    const fileList = ref<UploadFile[]>([]); // Manages the uploaded file list

    // Helper function to convert file to base64
    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Modal close handler
    const handleCancel = () => {
        previewVisible.value = false;
    };

    // Preview handler
    const handlePreview = async (file: UploadFile<any>) => {
        if (!file.url && !file.preview) {
            if (file.originFileObj) {
                file.preview = await getBase64(file.originFileObj);
            } else {
                console.warn('No origin file object found for preview.');
            }
        }

        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
    };

    // Change handler for file upload
    const handleChange = (info: {
        file: UploadFile<any>;
        fileList: UploadFile<any>[];
    }) => {
        console.log('File changed:', info);
        fileList.value = info.fileList;
    };
</script>

<style scoped>
    /* Add your scoped styles here if needed */
</style>
