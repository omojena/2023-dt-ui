<template>
    <div class="content-page">
        <section>
            <top-bar page-title="Estructuras de Servicios"/>
            <div class="mt-3 bg-withe p-5">
                <h-list :go-to-url="addUrl"
                        :only-new="isEmpty"
                        :records="desserts.length"
                        :per-page="perPage"
                        class="mb-6"/>
                <b-table
                        :data="isEmpty ? [] : desserts"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :row-class="(row, index) => row.deleted && 'is-danger'"
                        mobile-cards>

                    <b-table-column field="nom" label="Nombre" v-slot="props">
                        {{ props.row.nombre }}
                    </b-table-column>

                    <b-table-column field="count" label="Creado por" v-slot="props">
                        {{ props.row.created_by }}
                    </b-table-column>
                    <b-table-column field="count" label="Actualizado por" v-slot="props">
                        {{ props.row.updated_by }}
                    </b-table-column>

                    <b-table-column field="action" label="Acciones" width="300">
                        <b-button class="mr-2 btn-global btn-action-list edit" size="is-small"
                        >
                            <i xxl-font class="doublet icon-dt-edit"></i>
                        </b-button>
                        <b-button size="is-small" class="mr-2 btn-global btn-action-list trash"
                        >
                            <i xxl-font class="doublet icon-dt-trash"></i>
                        </b-button>
                    </b-table-column>

                </b-table>
            </div>
        </section>
    </div>

</template>
<script>
    import axios from 'axios';
    import {
        api_nomvalue, api_tipo_fixtures_menu_nomvalue
    } from "../../../urls";
    import {mapActions, mapMutations, mapGetters} from 'vuex'
    import TopBar from "../../../components/top-bar/topBar";
    import HList from "../../../components/header-list/headerList";
    import BTable from "buefy/src/components/table/Table";
    import BTableColumn from "buefy/src/components/table/TableColumn";
    import BButton from "buefy/src/components/button/Button";



    export default {
        name: 'LTServiceStructure',
        components: {BButton, BTableColumn, BTable, HList, TopBar},
        comments: {},
        data() {
            return {
                search: '',
                addUrl: '/type/service-structure/form/',
                desserts: [],
                isEmpty: false,
                isPaginated: false,
                currentPage: 1,
                perPage: 5
            }
        },
        methods: {
            ...mapMutations({
                openModalDelete: 'OPEN_MODAL_DELETE',
                loadUrlDelete: 'LOAD_URL_DELETE',
                loadUrlData: 'LOAD_URL_DATA',
                setLoading: 'SET_OVERLAY',
                confirmDelete: 'CONFIRM_DELETE',
                setToast: 'SET_TOAST',
                setStatusError: 'SET_STATUS_ERROR'
            }),
            ...mapActions({
                linkError:'LINK_ERROR'
            }),
            getFixturesMenu() {
                this.setLoading(true);
                axios.get(api_tipo_fixtures_menu_nomvalue)
                    .then(response => {
                        this.setLoading(false);
                        this.desserts = response.data;
                    })
                    .catch(err => {
                        this.setLoading(false);
                        this.setToast({
                            type: 'is-danger',
                            message: 'Ha ocurrido un error al obtener las clasificaciones para el servicio'
                        });
                        this.setStatusError(err.response.status);
                        console.log(err)
                    });

                console.log(this.desserts);
            },
            open_modal_delete: function (item) {
                let uri_delete = api_nomvalue + item.id;
                let uri_get_data = api_tipo_fixtures_menu_nomvalue;
                this.$buefy.dialog.confirm({
                    title: 'Eliminando Estructura de Servicio',
                    message: `Estás seguro que desea eliminar la estructura "${item.nombre}"`,
                    confirmText: 'Confirmar',
                    type: 'is-warning',
                    hasIcon: true,
                    onConfirm: () => {
                        this.loadUrlDelete(uri_delete);
                        this.loadUrlData(uri_get_data);
                        this.confirmDelete();
                        this.desserts = this.data_after_delete
                    }
                })
            }
        },
        created() {
            this.getFixturesMenu();
        },
        beforeMount() {
            this.getFixturesMenu();
        },
        computed:{
            ...mapGetters({
                data_after_delete: 'GET_DATA_AFTER_DELETE'
            })
        }

    }
</script>

<style scoped>

</style>