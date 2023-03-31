<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Incidencia"
            page-title-edit="Editar Tipo de Incidencia"
            :type-id-nom="9"
            success-url="listTypeIncidents"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>