<template>
    <div class="card__form">
        <p>Numbero de carte</p>
        <div id="card-number-element"></div>

        <p>Date d'expiration</p>
        <div id="card-expiry-element"></div>

        <p>CVC</p>
        <div id="card-cvc-element"></div>
        <button
            v-if="isAllCardFieldsValid"
            style="border: 1px solid; padding: 10px"
            @click="processPayement"
        >
            <span v-if="loadPayement">chargement...</span
            ><span v-else>Payement</span>
        </button>
    </div>
</template>
<script lang="ts" setup>
    import { loadStripe, Stripe } from '@stripe/stripe-js';
    import { onMounted, reactive, ref, watch } from 'vue';
    const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_API_KEY;
    let stripe: Stripe | Object = reactive({});

    let cardNbElement: any = reactive({});
    let cardExpElement: any = reactive({});
    let cardCVCElement: any = reactive({});
    const loadPayement = ref<boolean>(false);

    let validCardFields = reactive<{
        cardNbElement: boolean;
        cardExpElement: boolean;
        cardCVCElement: boolean;
    }>({
        cardNbElement: false,
        cardExpElement: false,
        cardCVCElement: false,
    });

    const isAllCardFieldsValid = ref<boolean>(false);

    onMounted(() => {
        initStripeApi();
    });

    watch(
        () => validCardFields,
        (valid) => {
            isAllCardFieldsValid.value = Object.values(valid).every(
                (value) => value
            );
        },
        { deep: true }
    );

    async function initStripeApi() {
        try {
            stripe = (await loadStripe(STRIPE_KEY)) as Stripe;
            // create elt
            let element = (stripe as Stripe).elements();
            cardNbElement = element.create('cardNumber', {
                classes: {
                    base: 'card-number-stripe',
                },
            });
            cardExpElement = element.create('cardExpiry', {
                classes: {
                    base: 'card-expiry-stripe',
                },
            });
            cardCVCElement = element.create('cardCvc', {
                classes: {
                    base: 'card-cvc-stripe',
                },
            });

            // mount elt
            (cardNbElement as any).mount('#card-number-element');
            (cardExpElement as any).mount('#card-expiry-element');
            (cardCVCElement as any).mount('#card-cvc-element');

            // trigger event elt
            cardNbElement.on('change', function (event: object) {
                validCardFields.cardNbElement = (event as any).complete
                    ? true
                    : false;
            });
            cardExpElement.on('change', function (event: object) {
                validCardFields.cardExpElement = (event as any).complete
                    ? true
                    : false;
            });
            cardCVCElement.on('change', function (event: object) {
                validCardFields.cardCVCElement = (event as any).complete
                    ? true
                    : false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function processPayement() {
        loadPayement.value = true;
        try {
            const res = await (stripe as Stripe).createToken(cardNbElement);
            console.log(res);
            if (res.error) {
                // TODO hanlde error
                console.log(res.error);
            } else {
                // TODO res.token
                console.log(res.token);
            }
            loadPayement.value = false;
        } catch (error) {
            // TODO handle error
            loadPayement.value = false;
            console.log(error);
        }
    }
</script>
<style lang="scss" scoped>
    #card-number-element,
    #card-expiry-element,
    #card-cvc-element {
        background: white;
        padding: 10px;
        border: 1px solid #ececec;
        border-radius: 2px;
        box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.7);
    }
</style>
