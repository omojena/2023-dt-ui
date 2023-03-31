<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Tipos de Servicio"/>
      <div class="mt-3 bg-withe p-5">
        <h-list :go-to-url="addUrl"
                :only-new="isEmpty"
                :records="data.length"
                :per-page="perPage"
                @btn-view-all="viewAll"
                class="mb-6"/>
        <b-table
            :data="isEmpty ? [] : data"
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
            <b-button class="mr-2 btn-global btn-action-list edit" size="is-small">
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
import *as URL from "../../../urls";
import {mapMutations, mapActions, mapGetters} from 'vuex'

import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import BButton from "buefy/src/components/button/Button";

export default {
  name: 'LTService',
  components: {BButton, BTableColumn, BTable, HList, TopBar},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/type/service/form/',
      desserts: [],
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5
    }
  },
  methods: {
    getTypeService() {
      this.setLoading(true);
      axios.get(URL.api_get_type_service)
          .then(response => {
            this.setLoading(false);
            this.setTypeService(response.data);
          })
          .catch((err) => {
            this.setLoading(false);
            this.setToast({
              type: 'is-danger',
              message: 'Ha ocurrido un error al obtener los tipos de servicio'
            });
            this.setStatusError(err.response.status);
          });
    },
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setLoading: 'SET_OVERLAY',
      setToast: 'SET_TOAST',
      setStatusError: 'SET_STATUS_ERROR',
      setTypeService: 'SET_TYPE_SERVICE_STORE'

    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
    }),
    open_modal_delete: function (item) {
      let uri_delete = URL.api_attributenomtype + item.id;
      let uri_get_data = URL.api_get_type_service;
      this.$buefy.dialog.confirm({
        title: 'Eliminando Tipo de Servicio',
        message: `Estás seguro que desea eliminar el tipo de servicio "${item.nombre}"`,
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
    },
    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    edit(typeService) {
      this.$router.push({name: 'formTypeService', params: {id: typeService.id}});
    }
  }
  ,
  created() {
    this.getTypeService();
  },
  computed: {
    ...mapGetters({
      data_after_delete: 'GET_DATA_AFTER_DELETE',
      data: 'GET_TYPE_SERVICE_STORE'
    })
  }

}
</script>

<style scoped>

</style>
