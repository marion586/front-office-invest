<template>
    <!-- <div> -->
    <ButtonMenu  v-for="(list, index) in btnList" :key="index" :isIcon="list.icon">{{
        list.label
    }}</ButtonMenu>
    <!-- </div> -->
</template>

<script lang="ts" setup>
    import ButtonMenu from '@/components/common/ButtonMenu/ButtonMenu.vue';
    import DocumentIcon from '@/components/Icon/Document.vue';
    import LiveIcon from '@/components/Icon/Live.vue';
    import FileIcon from '@/components/Icon/File.vue';
    import HeadPhoneIcon from '@/components/Icon/HeadPhone.vue';
    import VisiteIcon from '@/components/Icon/Visite.vue';
    import LocationIcon from '@/components/Icon/Location.vue';
    import RelocationIcon from '@/components/Icon/Relocation.vue';
    import FinanceIcon from '@/components/Icon/Finance.vue';
    
    interface BtnList {
        id: number;
        label: string;
        icon?: string;
    }

    const btnList: BtnList[] = [
        {
            id: 1,
            label: 'Information détaillées',
            icon: DocumentIcon
        },
        {
            id: 2,
            label: 'Vidéo live',
            icon: LiveIcon
        },
        {
            id: 3,
            label: 'Document relatifs',
            icon: FileIcon
        },
        {
            id: 4,
            label: 'Services à proximité',
            icon: HeadPhoneIcon
        },
        {
            id: 5,
            label: 'Visites',
            icon: VisiteIcon
        },
        {
            id: 6,
            label: 'Localisation',
            icon: LocationIcon 
        },
        {
            id: 7,
            label: 'Déménagement',
            icon: RelocationIcon
        },
        {
            id: 8,
            label: 'Finance',
            icon: FinanceIcon
        },
    ];
</script>
