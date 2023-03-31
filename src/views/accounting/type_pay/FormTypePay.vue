<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Pago"
            page-title-edit="Editar Tipo de Pago"
            :type-id-nom="4"
            success-url="listTypePay"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>