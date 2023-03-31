<template>
    <div class="content-page">
        <section>
            <top-bar page-title="Listado de Flota"/>
            <div class="mt-3 bg-withe p-5">
                <section v-if="!desserts">
                    <skeleton-table/>
                </section>
                <section v-else>
                    <b-table
                            :data="isEmpty ? [] : listActive"
                            :paginated="isPaginated"
                            :per-page="perPage"
                            :current-page="currentPage"
                            mobile-cards
                            checkbox-position="left"
                            :checked-rows="checkedRows"
                            :row-class="(row, index) => row.deleted && 'is-danger'"
                    >

                        <b-table-column field="nombre" label="Numero" v-slot="props">
                            {{ props.row.numero }}
                        </b-table-column>

                        <b-table-column field="fk_almacen" label="Almacen" v-slot="props">
                            <span v-if="props.row.fk_almacen">{{ props.row.fk_almacen }}</span>
                            <span v-else>-</span>
                        </b-table-column>
                        <b-table-column field="fk_area" label="Area" v-slot="props">
                            <span v-if="props.row.fk_area">{{ props.row.fk_area }}</span>
                            <span v-else>-</span>
                        </b-table-column>

                        <b-table-column field="marca" label="Marca" v-slot="props">
                            {{ props.row.marca }}
                        </b-table-column>

                        <b-table-column field="vida_util" label="Modelo" v-slot="props">
                            {{ props.row.modelo }}
                        </b-table-column>
                        <b-table-column field="calidad" label="Calidad" v-slot="props">
                            {{ props.row.calidad }}
                        </b-table-column>

                        <!--                                <b-table-column field="action" label="Acciones" v-slot="props">-->
                        <!--                                    <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">-->
                        <!--                                        <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>-->
                        <!--                                    </div>-->
                        <!--                                </b-table-column>-->

                    </b-table>

                    <b-pagination class="mt-5"
                            :total="paginate.total"
                            v-model="paginate.current"
                            :range-before="paginate.rangeBefore"
                            :range-after="paginate.rangeAfter"
                            :order="paginate.order"
                            :size="paginate.size"
                            :simple="paginate.isSimple"
                            :rounded="paginate.isRounded"
                            :per-page="paginate.perPage"
                            :icon-prev="paginate.prevIcon"
                            :icon-next="paginate.nextIcon"
                            aria-next-label="Next page"
                            aria-previous-label="Previous page"
                            aria-page-label="Page"
                            aria-current-label="Current page">
                    </b-pagination>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
    import {api_aft} from "@/urls";
    import {mapMutations, mapActions} from 'vuex'
    import TopBar from "../../components/top-bar/topBar";
    // import HList from "../../components/header-list/headerList";
    import BTable from "buefy/src/components/table/Table";
    import BTableColumn from "buefy/src/components/table/TableColumn";
    // import BButton from "buefy/src/components/button/Button";
    import {TYPE_ACTIVE} from '@/enum'
    import SkeletonTable from "@/components/skeleton/skeleton-table";

    
    export default {
        name: "ListFlota",
        components: {SkeletonTable, BTableColumn, BTable, TopBar},
        data() {
            return {
                search: '',
                checkedRows: [],
                addUrl: '/warehouse/aft/form/',
                isEmpty: false,
                isPaginated: false,
                currentPage: 1,
                perPage: 5,
                type: TYPE_ACTIVE.AFT,
                listActive: [],
                watchPaginate: null,
                aftTangible: null,
                aftIntangible: null,
                aftBike: null,
                query: `?tipo_activo=${TYPE_ACTIVE.AFT}`,
                fullQuery: '',
                desserts: null,
                paginate: {
                    total: null,
                    current: 1,
                    perPage: 10,
                    rangeBefore: 3,
                    rangeAfter: 3,
                    order: '',
                    size: '',
                    isSimple: false,
                    isRounded: true,
                    prevIcon: 'chevron-left',
                    nextIcon: 'chevron-right'
                },

            }
        },
        methods: {
            ...mapMutations({
                openModalDelete: 'OPEN_MODAL_DELETE',
                loadUrlDelete: 'LOAD_URL_DELETE',
                loadUrlData: 'LOAD_URL_DATA',
                setAftList: "SET_AFT_LIST"
            }),
            ...mapActions({
                confirmDelete: 'CONFIRM_DELETE',
                fetchAftList: 'FETCH_AFT'
            }),
            viewAll() {
                this.isPaginated = !this.isPaginated;
            },
            getAftBici(page = null) {
                this.listActive = []
                this.type = TYPE_ACTIVE.AFB
                this.query = `?tipo_activo=${TYPE_ACTIVE.AFB}`
                if (page) {
                    this.query += `&page=${page}`
                }
                this.fetchAftList(this.query)
                    .then(value => {
                        this.desserts = value
                        this.aftBike = value
                        this.watchPaginate = value
                        this.listActive = value.results
                    });
            },
            open_modal_delete: function (item) {
                let uri_delete = api_aft + item.id + '/';
                let uri_get_data = api_aft + this.query;
                let action = item.deleted ? 'recuperar': 'eliminar';
                let title = item.deleted ? 'Recuperar': 'Eliminando';
                this.$buefy.dialog.confirm({
                    title: `${title} Activo`,
                    message: `Estás seguro que desea ${action} el activo "${item.nombre}"`,
                    confirmText: 'Confirmar',
                    type: 'is-warning',
                    hasIcon: true,
                    onConfirm: async () => {
                        this.loadUrlDelete(uri_delete);
                        this.loadUrlData(uri_get_data);
                        let resolve = await this.confirmDelete();
                        this.listActive = resolve.results
                        this.setAftList(resolve)
                    }
                })
            },
            formatYYYYMMDD(value) {
                const date = new Date(value)
                if (value && !isNaN(date)) {
                    const year = date.getFullYear()
                    const month = date.getMonth() + 1
                    const day = date.getDate()
                    return year + '-' +
                        ((month < 10 ? '0' : '') + month) + '-' +
                        ((day < 10 ? '0' : '') + day)
                }
                return ''
            },
        },
        watch: {
            watchPaginate: function () {
                let results = this.watchPaginate
                this.paginate.current = results.page;
                this.paginate.total = results.count;
                this.paginate.perPage = results.page_size;
            },
            'paginate.current': function () {
                this.getAftBici(this.paginate.current)
            }

        },
        created() {
            this.getAftBici(this.paginate.current)
        },


    }
</script>

<style scoped>

</style>
