<template>
    <div>
        <button @click="onClickBack" style="border: 1px solid grey">
            RETOUR
        </button>
        <div
            class="test__card"
            v-for="(cardType, index) in cardTypes"
            :key="index"
        >
            <p>{{ cardType }}</p>
            <button
                @click="
                    () => {
                        onClickChoose(cardType);
                    }
                "
            >
                CHOISIR
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';

    const store: Store<any> = useStore();
    const router: Router = useRouter();
    const cardTypes = ref<Array<string>>([]);
    const particularCardTypes: string[] = [
        'Economique',
        'Premium',
        'Gold',
        'Gratuit',
    ];
    const professionalCardTypes: string[] = [
        'Basic',
        'Premium',
        'Gold',
        'Gratuit',
    ];
    onMounted(() => {
        initCard();
    });

    const emit = defineEmits<{
        (e: 'click-choose', cardType: string): void;
        (e: 'click-back'): void;
    }>();

    function onClickChoose(cardType: string) {
        emit('click-choose', cardType);
    }
    function onClickBack() {
        router.go(-1);
    }

    function initCard() {
        const usertype: string =
            store.getters['UserModule/getRegisteredUser'].usertype;
        switch (usertype) {
            case 'particulier':
                cardTypes.value = [...particularCardTypes];
                break;
            case 'professionnel':
                cardTypes.value = [...professionalCardTypes];
                break;
            default:
                break;
        }
    }
</script>
<style lang="scss" scoped>
    // this styles if for test pupose
    .test__card {
        width: fit-content;
        border: 1px dotted grey;
        padding: 10px;
        margin: 10px;
        button {
            border: 1px solid grey;
            padding: 5px;
        }
    }
</style>
