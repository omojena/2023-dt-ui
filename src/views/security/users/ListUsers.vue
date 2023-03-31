<template>
    <div class="content-page">
        <section>
            <top-bar is_back page-title="Listado de Usuarios"/>
            <div class="mt-3 bg-withe p-5">
                <h-list :go-to-url="addUrl"
                        :only-new="isEmpty"
                        :records="desserts.count"
                        :per-page="perPage"
                        @btn-view-all="viewAll"
                        class="mb-6"/>
                <b-table
                        :data="isEmpty ? [] : desserts.results"
                        :paginated="isPaginated"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :row-class="(row, index) => row.deleted && 'is-danger'"
                        mobile-cards>

                    <b-table-column field="avatar" label="Imagen" v-slot="props">
                        <img v-if="props.row.avatar" class="img_list" :src="props.row.avatar">
                        <img v-else class="img_list" :src="Avatar">
                    </b-table-column>

                    <b-table-column field="nombre" label="Nombre" v-slot="props">
                        {{ props.row.first_name }}
                    </b-table-column>

                    <b-table-column field="apellidos" label="Apelidos" v-slot="props">
                        {{ props.row.last_name }}
                    </b-table-column>
                    <b-table-column field="Correo" label="Correo" v-slot="props">
                        {{ props.row.email }}
                    </b-table-column>
                    <b-table-column field="Usuario" label="Usuario" v-slot="props">
                        {{ props.row.username }}
                    </b-table-column>


                    <b-table-column field="created_by" label="Creado por" v-slot="props">
                        {{ props.row.created_by }}
                    </b-table-column>

                    <b-table-column field="updated_by" label="Actualizado por" v-slot="props">
                        {{ props.row.updated_by }}
                    </b-table-column>


                  <b-table-column field="action" label="Acciones" v-slot="props">
                    <div class="is-flex">
                      <router-link :to="{name: 'FormEditUsers', params:{id:props.row.id}}">
                        <div class="mx-10">
                          <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                        </div>
                      </router-link>
                      <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                        <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
                      </div>
                    </div>
                  </b-table-column>

                </b-table>
            </div>
        </section>
    </div>
</template>
<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex'
    import TopBar from "../../../components/top-bar/topBar";
    import HList from "../../../components/header-list/headerList";
    import BTable from "buefy/src/components/table/Table";
    import BTableColumn from "buefy/src/components/table/TableColumn";
    import {api_users} from "@/urls";
    import Avatar from "../../../assets/img/profile-picture.png"

    export default {
        name: 'LUsers',
        components: {BTableColumn, BTable, HList, TopBar},
        comments: {},
        data() {
            return {
                Avatar,
                search: '',
                addUrl: '/user/form/',
                isEmpty: false,
                isPaginated: false,
                currentPage: 1,
                perPage: 5,
            }
        },
        computed: {
            ...mapGetters({
                desserts: 'GET_USER_LIST'
            }),
        },
        methods: {
            ...mapMutations({
                openModalDelete: 'OPEN_MODAL_DELETE',
                loadUrlDelete: 'LOAD_URL_DELETE',
                loadUrlData: 'LOAD_URL_DATA',
                setUserList: 'SET_USER_LIST'
            }),
            ...mapActions({
                confirmDelete: 'CONFIRM_DELETE',
                fetchUserList: 'FETCH_USER_LIST'
            }),
            viewAll() {
                this.isPaginated = !this.isPaginated;
            },
            open_modal_delete: function (item) {
                let uri_delete = api_users + item.id + '/';
                let uri_get_data = api_users;
                let action = item.deleted ? 'recuperar': 'eliminar';
                let title = item.deleted ? 'Recuperar': 'Eliminando';
                this.$buefy.dialog.confirm({
                    title: `${title} Usuario`,
                    message: `Estás seguro que desea ${action} a "${item.first_name}"`,
                    confirmText: 'Confirmar',
                    type: 'is-warning',
                    hasIcon: true,
                    onConfirm: async () => {
                        this.loadUrlDelete(uri_delete);
                        this.loadUrlData(uri_get_data);
                        let resolve = await this.confirmDelete();
                        this.setUserList(resolve)
                    }
                })
            },
        },

        created() {
            this.fetchUserList();
        },

    }
</script>

<style scoped>
.img_list{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
