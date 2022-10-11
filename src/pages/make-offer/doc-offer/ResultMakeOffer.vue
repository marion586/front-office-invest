
<script setup lang="ts">
    import Title from "@/components/Common/Title/Title.vue";

    defineProps({
        names: {
            type: Array <String>,
            default() {
                return [];
            },
        }
    })


let titleResult = "Apperçu du document";

const dataResutlHead = {
        title: "Moderne",
        price: "1000000",
        reference: "IMM191121113154",
        priceOffer: "0"
    }


</script>

<template>
    <div>
        <Title type="h3" 
        :label="titleResult"
        weight="600"
        class="offer__result-title"
        />

        <div
        class="mb-3.5"
        >
            <span class="offer__result-span"
            >
                Les soussignées(es):
            </span>
            <ul class="name-list">
                <li 
                class="list-disc ml-6"
                v-for="(name, index) in names" :key="index"
                >
                    {{ name }}
                </li>
            </ul>

            <h4 class="offer__result-title-dark">Font, par les présentes, offre d’achat pour le bien ci-après:</h4>

            <div class="offer__result-head">
                <p>Titre :  {{ dataResutlHead.title }}</p>
                <p>Prix :  {{ dataResutlHead.price }}</p>
                <p>Et référence :  {{ dataResutlHead.reference }}</p>
                <p>Au prix de :  {{ dataResutlHead.priceOffer }}  €</p>
            </div>

            <h4 class="offer__result-title-dark">Pour autant que :</h4>
            
            <div class="offer__result-content">
                <section>
                    <p>
                        Les soussignés font la présente offre avec la condition suspensive: De l'obtention d'un crédit de 0 € aux conditions normales du marché. Au cas où cette condition ne se réalise pas, aucune indemnité ne sera, due de quelque chef ou de quelque nature que ce soit. Cette clause suspensive est valable pendant un délai de 0 semaine(s) à dater de la signature du compromis de vente.
                    </p>
                </section>
                <section>
                    <p>
                        En cas de non-obtention du crédit, la garantie sera intégralement restituée à l’acquéreur.
                    </p>
                </section>
                <section>
                    <p>
                        Pour le surplus, la vente se fera aux conditions de vente ordinaires de droit. La présente est valable jusqu'au plus tard le ... à défaut d’acceptation par le(s)propriétaire(s) dans ce délai les soussignés seront libérés de leur offre.
                    </p>
                </section>
                <section>
                    <p>
                        Si la présente offre est acceptée endéans le délai précité, elle sera suivie d'un compromis de vente que les soussignés s'engagent à signer dans les 30 jours ouvrables sous réserve d’obtention des renseignements obligatoires.
                    </p>
                </section>
                <section>
                    <p>
                        En cas d'acception par le(s) propriétaire(s) le prix sera payable comme suit :
                    </p>
                </section>
                <section>
                    <p>
                        0 % à la signature de la convention d’option, au moyen d'un virement bancaire émis au nom du notaire de l'acquéreur, qui conservera cette garantie jusqu'au jour de l'acte authentique et auquel moment elle constituera un acompte sur le prix.
                    </p>
                </section>
                <section>
                    <p>
                        En cas d'acception par le propriétaire, l'acte sera signé devant le notaire ........... à ......... pour les vendeurs, à l’intervention du notaire à Bruxelles, pour les acquéreurs.
                    </p>
                </section>

            </div>

            <div class="offer__result-footer">
                <div class="offer__result-footer-signature">
                    <p>Fait à : </p>
                    <p>Nom et signatures</p>
                </div>

                <div class="offer__result-footer-date">
                    <p>le .../ .../.....</p>
                    <p>le(s) propriétaire(s)</p>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
  .offer{
    &__result-head{
        @apply font-semibold my-3 ;
    }

    &__result-title-dark{
        @apply my-2.5 font-normal text-[#949FB5] ;
    }

    &__result-footer{
        @apply mt-[138px] flex flex-row justify-between font-normal ;
    }

  }  

  .name-list{
    @apply my-1.5 ;
}

section{
    @apply mb-2 text-justify font-light ;
}
</style>