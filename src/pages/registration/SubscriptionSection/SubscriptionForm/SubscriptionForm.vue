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
            Payement
        </button>
    </div>
    <!-- <StripeElement :element="cardElement" @change="event = $event" />
    <button @click="registerCard">Add</button> -->
    <!-- <div v-if="event && event.error">{{ event.error.message }}</div> -->
</template>
<script lang="ts" setup>
    import { loadStripe, Stripe } from '@stripe/stripe-js';
    import { onMounted, reactive, ref, watch } from 'vue';
    const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_API_KEY;
    let stripe: Stripe | Object = reactive({});

    let cardNbElement: any = reactive({});
    let cardExpElement: any = reactive({});
    let cardCVCElement: any = reactive({});

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
        stripe = (await loadStripe(STRIPE_KEY)) as Stripe;
        let element = (stripe as Stripe).elements();
        // number
        cardNbElement = element.create('cardNumber', {
            classes: {
                base: 'card-number-stripe',
            },
        });
        (cardNbElement as any).mount('#card-number-element');
        cardNbElement.on('change', function (event: object) {
            validCardFields.cardNbElement = (event as any).complete
                ? true
                : false;
        });

        // expiry
        cardExpElement = element.create('cardExpiry', {
            classes: {
                base: 'card-expiry-stripe',
            },
        });
        (cardExpElement as any).mount('#card-expiry-element');
        cardExpElement.on('change', function (event: object) {
            validCardFields.cardExpElement = (event as any).complete
                ? true
                : false;
        });

        // cvc
        cardCVCElement = element.create('cardCvc', {
            classes: {
                base: 'card-cvc-stripe',
            },
        });
        (cardCVCElement as any).mount('#card-cvc-element');
        cardCVCElement.on('change', function (event: object) {
            validCardFields.cardCVCElement = (event as any).complete
                ? true
                : false;
        });
    }

    async function processPayement() {
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
        } catch (error) {
            // TODO handle error
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
