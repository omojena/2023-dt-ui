<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Licencia"
            page-title-edit="Editar Tipo de Licencia"
            :type-id-nom="19"
            success-url="listTypeLicense"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>