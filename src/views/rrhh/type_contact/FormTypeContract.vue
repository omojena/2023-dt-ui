<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Contrato"
            page-title-edit="Editar Tipo de Contrato"
            :type-id-nom="21"
            success-url="listTypeContract"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>