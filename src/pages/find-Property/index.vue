<script setup>
import { reactive } from "vue";
import MenuButton from "@/components/Common/ButtonMenu/ButtonMenu.vue";
import  MapPinIcon from "@/components/Icon/mapPin.vue";
import CityOutlinedIcon from "@/components/Icon/CityOutlined.vue";
import MapCardIcon from "@/components/Icon/mapCard.vue";
import SettingConfigIcon  from "@/components/Icon/SettingConfig.vue";
import ARIcon from "@/components/Icon/AugmentedReality.vue";
import Title from "@/components/Common/Title/Title.vue";
    const data = reactive({
        menus : [
            {
                title : "A partir d'une ville",
                desc : "Sélectionner une ou plusieurs villes",
                icon :  MapPinIcon
            },
            {
                title : "A partir d'une agence",
                desc : "Sélectionner une agence",
                icon : CityOutlinedIcon
            },
            {
                title : "A partir d'un dessin sur la carte",
                desc : "rechercher un bien dans une zone délimitée par un dessin sur la carte",
                icon : MapCardIcon
            },
            {
                title : "A partir des critères",
                desc : "Rechercher un bien selon les critères ajouotées",
                icon : SettingConfigIcon
            },
            {
                title : "A partir de la réalité augmentée",
                desc : "recherche de bien avec ImmoGo",
                icon : ARIcon
            },
            
        ]
    })
</script>
<template>
    <div class="w-full py-5">
        <div class=" container w-full columns-1">
            <MenuButton
                v-for="(menu, key) in data.menus"
                :key="key"
                width="100%"
                class="w-full flex justify-between"
                :isIcon="menu.icon"
            >
                <div class="w-full">
                   <p class="text-start"><b>{{ menu.title }}</b></p>
                   <p class="text-start text-xs text-gray">{{ menu.desc }}</p>
                </div>
            </MenuButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.text-gray{
    color : var(--color-stroke-gray)
}
</style>

