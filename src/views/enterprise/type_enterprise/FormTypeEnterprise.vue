<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Empresa"
            page-title-edit="Editar Tipo de Empresa"
            :type-id-nom="2"
            success-url="listTypeEnterprise"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>