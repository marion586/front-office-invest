<template>
    <!-- <div> -->
        <ButtonMenu  v-for="(list, index) in btnList" :key="index">{{list.label}}</ButtonMenu>
    <!-- </div> -->
</template>

<script lang="ts" setup>
    import ButtonMenu from '@/components/common/ButtonMenu/ButtonMenu.vue';
    interface BtnList {
        id: number,
        label:string,
    }

    const btnList: BtnList[] = [
        {
            id: 1,
            label: "Information détaillées",
        },
        {
            id: 2,
            label: "Vidéo live",
        },
        {
            id: 3,
            label: "Document relatifs",
        },
        {
            id: 4,
            label: "Services à proximité"
        },
        {
            id: 5,
            label:"Visites"
        },
        {
            id: 6,
            label : "Localisation"
        },
        {
            id: 7,
            label : "Déménagement"
        },
        {
            id: 8,
            label: "Finance"
        }

    ]
</script>
