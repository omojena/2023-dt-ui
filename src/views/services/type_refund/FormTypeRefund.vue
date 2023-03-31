<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Devolución"
            page-title-edit="Editar Tipo de Devolución"
            :type-id-nom="8"
            success-url="listTypeRefund"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>