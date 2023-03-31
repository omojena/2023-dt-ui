<template>
    <g-f-nomenclator
            page-title-add="Nueva Estructura de Servicio"
            page-title-edit="Editar Estructura de Servicio"
            :type-id-nom="18"
            success-url="listServiceStructure"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>