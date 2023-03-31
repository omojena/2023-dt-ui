<template>
    <g-f-nomenclator
            page-title-add="Nuevo Tipo de Plaza"
            page-title-edit="Editar Tipo de Plaza"
            :type-id-nom="20"
            success-url="listTypeWorkplace"
    />
</template>

<script>

    import GFNomenclator from "../../../components/form/generic-nom-form";

    export default {
        name: 'FTWorkplace',
        components: {GFNomenclator},
    }
</script>
<style lang="scss" scoped>

</style>