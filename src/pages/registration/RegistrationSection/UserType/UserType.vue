<template>
    <div>
        <ButtonMenu
            :is-icon="Professional"
            width="100%"
            @click="handleChoices('professionnel')"
        >
            Professionnel
        </ButtonMenu>
        <ButtonMenu
            :is-icon="User"
            width="100%"
            @click="handleChoices('particulier')"
        >
            Particulier
        </ButtonMenu>
    </div>
</template>
<script lang="ts" setup>
    import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import Professional from '@/components/Icon/Professional.vue';
    import User from '@/components/Icon/User.vue';

    const emit = defineEmits<{
        (
            event: 'on-click-choices',
            userType: 'particulier' | 'professionnel' | ''
        ): void;
    }>();

    function handleChoices(userType: 'particulier' | 'professionnel' | '') {
        emit('on-click-choices', userType);
    }
</script>
<style lang=""></style>
