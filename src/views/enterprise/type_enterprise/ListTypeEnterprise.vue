<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Tipos de Empresa"/>
      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
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

            <b-table-column field="nombre" label="Nombre" v-slot="props">
              {{ props.row.nombre }}
            </b-table-column>

            <b-table-column field="descripcion" label="Descripcion" v-slot="props">
              <b-tooltip multilined :label="props.row.descripcion">
                <span class="col">{{ props.row.descripcion | truncate(50, '...') }}</span>
              </b-tooltip>
            </b-table-column>

            <b-table-column field="action" label="Acciones" v-slot="props">
              <div class="is-flex">
                <router-link :to="{name: 'formEditTypeEnterprise', params:{id:props.row.id}}">
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
        </section>

      </div>
    </section>
  </div>
</template>
<script>
import {
  api_nomvalue, api_tipo_empresa_nomvalue
} from "@/urls";
import {mapMutations, mapActions, mapGetters} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: 'LTEnterprise',
  components: {SkeletonTable, BTableColumn, BTable, HList, TopBar},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/type/enterprise/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    ...mapGetters({
      desserts: 'GET_TYPE_ENTERPRISE'
    })
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setEnterpriseTypeList: 'SET_TYPE_ENTERPRISE'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchTypeEnterprise: 'FETCH_TYPE_ENTERPRISE'
    }),

    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = api_nomvalue + item.id + '/';
      let uri_get_data = api_tipo_empresa_nomvalue;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Tipo de Empresa`,
        message: `Estás seguro que desea ${action} el tipo de empresa "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.setEnterpriseTypeList(resolve)
        }
      })
    }
  },
  created() {
    this.fetchTypeEnterprise();
  },


}
</script>

<style scoped>

</style>
