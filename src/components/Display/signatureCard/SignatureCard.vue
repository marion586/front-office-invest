
<script setup lang="ts">
    import { ref, defineProps } from 'vue';
    import VPerfectSignature from 'v-perfect-signature';
    import IconCheck from '@/components/Icon/CheckIcon.vue';
    import IconCancel from '@/components/Icon/CancelIcon.vue';

    const props = defineProps({
        hasTitle: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: 'Votre signature'
        },
        sizePen: {
          type: Number,
          default: 1.5
        },
        width: {
          type: String,
          default: '157px'
        },
        height: {
          type: String,
          default: '132px'
        }

    });

    const signaturePad = ref();

    const strokeOptions = {
      size: props.sizePen,
      thinning: 0.75,
      smoothing: 0.5,
      streamline: 0.5,
    };

    let imageSignature = ref(null);
    const save = () => {
      const dataURL = signaturePad.value.toDataURL();
      imageSignature.value = dataURL;
      console.log(imageSignature.value);
      
    }

    const undo = () => {
      signaturePad.value.clear();
      imageSignature.value = null;
      console.log(imageSignature.value);
      
    }

</script>


<template>
  <div class="signature">
    <h4  class="signature__title"
     v-if="hasTitle">{{ props.title }}</h4>
    <div class="signature__component">
      <div class="signature__component-draw">
        <VPerfectSignature :stroke-options="strokeOptions" ref="signaturePad" />
      </div>
      <div class="signature__button">
        <div class="btn-save" @click="save">
          <IconCheck />
        </div>
        <div class="btn-cancel" @click="undo">
         <IconCancel />
        </div>
      </div>
    </div>
    <div class="signature__img"
    v-if="imageSignature != null"
    >
    <p>Votre signature: </p>
      <img :src="`${imageSignature}`"
      alt="img signature"
      >
    </div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .signature{
    &__title{
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 300;
      font-size: 12px;
      line-height: 18px;
      color: #949FB5;
    }
    &__component{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;  
    }

    &__component-draw{
      width: v-bind(width);
      height: v-bind(height);

      background: #FFFFFF;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
    }

    &__button{
      margin-left: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    &__img{
      width: 150px;
      height: 130px;
      margin-top: 58px;
    }
}

  .btn-save, .btn-cancel{
    width: 25px;
    height: 25px;
    background: #FFFFFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-cancel{
    margin-top: 10px;
  }
</style>
