<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Moneda"
            page-title-edit="Editar Tipo de Moneda"
            :type-id-nom="3"
            success-url="listTypeCash"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>