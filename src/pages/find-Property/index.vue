<script setup>
    import { onMounted, onBeforeMount, ref, reactive, shallowRef } from 'vue';
    import MenuButton from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import MapPinIcon from '@/components/Icon/mapPin.vue';
    import CityOutlinedIcon from '@/components/Icon/CityOutlined.vue';
    import MapCardIcon from '@/components/Icon/mapCard.vue';
    import SettingConfigIcon from '@/components/Icon/SettingConfig.vue';
    import ARIcon from '@/components/Icon/AugmentedReality.vue';
    import Title from '@/components/Common/Title/Title.vue';

    const width = ref('');
    const title = shallowRef('Recherche');
    const screenSize = { sm: 640 };
    const menus = shallowRef([
        {
            title: "A partir d'une ville",
            desc: 'Sélectionner une ou plusieurs villes',
            icon: MapPinIcon,
        },
        {
            title: "A partir d'une agence",
            desc: 'Sélectionner une agence',
            icon: CityOutlinedIcon,
        },
        {
            title: "A partir d'un dessin sur la carte",
            desc: 'rechercher un bien dans une zone délimitée par un dessin sur la carte',
            icon: MapCardIcon,
        },
        {
            title: 'A partir des critères',
            desc: 'Rechercher un bien selon les critères ajouotées',
            icon: SettingConfigIcon,
        },
        {
            title: 'A partir de la réalité augmentée',
            desc: 'recherche de bien avec ImmoGo',
            icon: ARIcon,
        },
    ]);

    onBeforeMount(() => {
        if (window.innerWidth < screenSize.sm + 1) {
            width.value = '100%';
            console.log('for sm', width.value);
        } else {
            width.value = undefined;
            console.log('for md and wider', width.value);
        }
    });

    defineExpose({ width, title, menus });
</script>
<template>
    <div class="w-full py-3">
        <div class="container-wrapper">
            <div class="container-title">
                <Title
                    class="font-bold"
                    type="normal" 
                    :label="title" 
                />
            </div>
            <MenuButton
                v-for="(menu, key) in menus"
                :key="key"
                :width="width"
                class="menu"
                :isIcon="menu.icon"
            >
                <div class="w-full">
                    <p class="text-menu-title">{{ menu.title }}</p>
                    <p class="text-menu-sub">{{ menu.desc }}</p>
                </div>
            </MenuButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
               
    .container{
        &-title{
            @apply w-full rounded-lg bg-white p-3 my-3;
        }
    }
    .text {
        
        &-menu{
            &-title {
                @apply text-start font-bold;
            }
            &-sub {
                @apply text-start text-xs;
                color: var(--color-stroke-gray);
            }
        }
        
    }
    .menu {
        @apply w-full flex justify-between rounded-lg;
    }
    @screen sm{
        .container{
            &-wrapper{
                @apply container w-full flex-col justify-between;
            }
        }
    }
    @screen md{
        .container{
            @apply bg-white h-full;

            &-wrapper{
                display : flex;
                flex-flow : row wrap;
                @apply container w-full justify-start gap-5;
            }
        }
        .menu{
            @apply w-[32%];
        }
    }
</style>
