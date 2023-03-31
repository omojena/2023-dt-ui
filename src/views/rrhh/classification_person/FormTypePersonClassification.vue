<template>
    <g-f-nomenclator
            page-title-add="Nueva Clasificación de Persona"
            page-title-edit="Editar Clasificación de Persona"
            :type-id-nom="13"
            success-url="listClassificationPerson"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>