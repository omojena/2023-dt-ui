<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Tarea"
            page-title-edit="Editar Tipo de Tarea"
            :type-id-nom="7"
            success-url="listTypeTask"
    />
</template>

<script>
    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        components: {GFNomenclator},

    }
</script>
