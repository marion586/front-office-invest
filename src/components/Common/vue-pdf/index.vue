<template>
      
    <div>
             <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="true"
            :paginate-elements-by-height="1400"
            filename="hee hee"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            pdf-orientation="landscape"
            pdf-content-width="800px"
            @progress="onProgress($event)"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            ref="html2Pdf"
        >
                    
            <section slot="pdf-content">
                <slot></slot>
            </section>
                </vue-html2pdf
        >
        <Button class="btn-export" @on-click="generateReport">
            Exporter en pdf
        </Button>
    </div>
</template>

<script>
    import Button from '@/components/Common/Button/Button.vue';

    import VueHtml2pdf from 'vue-html2pdf';
    export default {
        methods: {
            /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
            generateReport() {
                this.$refs.html2Pdf.generatePdf();
            },
        },
        components: {
            VueHtml2pdf,
        },
    };
</script>
