<template>
    <div>
        <button
            @click="
                () => {
                    handleChoices('particulier');
                }
            "
        >
            PARTICULIER
        </button>
        <button
            @click="
                () => {
                    handleChoices('professionnel');
                }
            "
        >
            PROFESSIONNEL
        </button>
    </div>
</template>
<script lang="ts" setup>
    const emit = defineEmits<{
        (event: 'on-click-choices', userType: string): void;
    }>();

    function handleChoices(userType: string) {
        emit('on-click-choices', userType);
    }
</script>
<style lang=""></style>
