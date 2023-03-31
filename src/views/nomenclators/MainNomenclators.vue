<template>
    <div class="content-page">
        <section>
            <top-bar page-title="Nomencladores"/>
            <div class="mt-3 bg-withe p-5">
                <h-list
                        @btn-view-all="viewAll"
                        only-all
                        :only-new="isEmpty"
                        :records="data.length"
                        :per-page="perPage"
                        class="mb-6"/>
                <b-table
                        pagination-size="is-small"
                        :data="isEmpty ? [] : data"
                        :bordered="isBordered"
                        :striped="isStriped"
                        :narrowed="isNarrowed"
                        :hoverable="isHoverable"
                        :loading="isLoading"
                        :focusable="isFocusable"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :pagination-simple="isPaginationSimple"
                        :mobile-cards="hasMobileCards"
                        :checkable="false"
                        checkbox-position="left"
                        :checked-rows.sync="checkedRows"
                >

                    <b-table-column field="nom" label="Nombre" v-slot="props">
                        <span md-font text-color regular
                        >{{ props.row.nom }}</span>
                    </b-table-column>

                    <b-table-column field="count" label="Cantidad" v-slot="props">
                        <span md-font text-color regular>{{ props.row.count }}</span>
                    </b-table-column>

                    <b-table-column field="url" label="Acciones" width="300" v-slot="props">
                        <i xxl-font purple-color class="doublet icon-dt-plus"></i>
                        <i xxl-font primary-ligth-color class="doublet icon-dt-list-1"></i>
                        <b-button v-if="props.row.form" class="mr-2 btn-global btn-action-list plus" size="is-small"
                                  @click="goTo(props.row.form)">
                            <i xxl-font class="doublet icon-dt-plus"></i>
                        </b-button>
                        <b-button v-if="props.row.list" size="is-small" class="mr-2 btn-global btn-action-list list" @click="goTo(props.row.list)">
                            <i xxl-font class="doublet icon-dt-list-1"></i>
                        </b-button>

                    </b-table-column>

                </b-table>
            </div>
        </section>
    </div>

</template>

<script>
    import BTable from "buefy/src/components/table/Table";
    import BTableColumn from "buefy/src/components/table/TableColumn";
    import TopBar from "../../components/top-bar/topBar";
    import HList from "../../components/header-list/headerList";
    import BButton from "buefy/src/components/button/Button";

    export default {
        components: { BButton, HList, TopBar, BTableColumn, BTable},
        data() {
            const data = [



            ];

            return {
                data,
                checkedRows: [data[1], data[3]],
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isHoverable: false,
                isFocusable: false,
                isLoading: false,
                hasMobileCards: true,

                isPaginated: true,
                isPaginationSimple: false,
                paginationPosition: 'bottom',
                currentPage: 1,
                perPage: 5
            }
        },
        methods: {
            viewAll() {
                this.isPaginated = !this.isPaginated;
            },
            goTo(name) {
                this.$router.push({name: name})
            }
        }
    }
</script>
<style lang="scss">

</style>


