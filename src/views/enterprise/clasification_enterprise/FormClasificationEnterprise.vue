<template>
    <g-f-nomenclator
            page-title-add="Nueva Clasificación de Empresa"
            page-title-edit="Editar Clasificación de Empresa"
            :type-id-nom="1"
            success-url="listClassificationEnterprise"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>