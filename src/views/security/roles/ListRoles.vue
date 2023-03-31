<template>
  <div class="content-page">
    <section>
      <top-bar is_back page-title="Listado de Roles"/>
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


          <b-table-column field="nombre" label="Roles" v-slot="props">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="apellidos" label="Descripcion" v-slot="props">
            {{ props.row.descripcion }}
          </b-table-column>

          <b-table-column field="action" label="Acciones" v-slot="props">
            <div class="is-flex">
              <router-link :to="{name: 'FormEditRoles', params:{id:props.row.id}}">
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
 import {api_roles} from "@/urls";

export default {
  name: 'LRoles',
  components: {BTableColumn, BTable, HList, TopBar},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/roles/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      typePersonString: null
    }
  },
  computed: {
    ...mapGetters({
      desserts: 'GET_ROLE_LIST'
    }),
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setROLEList: 'SET_ROLE_LIST'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchROLEList: 'FETCH_ROLE_LIST'
    }),
    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = api_roles + item.id + '/';
      let uri_get_data = api_roles;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Rol`,
        message: `Estás seguro que desea ${action} a "${item.name}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          console.log(resolve);
          this.setROLEList(resolve)
        }
      })
    },
  },
  created() {
    this.fetchROLEList();
  },
}
</script>

<style scoped>

</style>
