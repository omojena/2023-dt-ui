<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Tipos de Devolución"/>
      <div class="mt-3 bg-withe p-5">
        <h-list :go-to-url="addUrl"
                :only-new="isEmpty"
                :records="desserts.length"
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
            {{ props.row.descripcion }}
          </b-table-column>
          <b-table-column field="action" label="Acciones" width="300" v-slot="props">
            <div class="is-flex">
              <div class="mx-10">
                <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
              </div>
              <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
              </div>
            </div>
          </b-table-column>

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

      </div>
    </section>
  </div>
</template>
<script>
import {
  api_nomvalue, api_tipo_devolucion_nomvalue
} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import TopBar from "../../../components/top-bar/topBar";

export default {
  name: 'LTRefund',
  components: {TopBar, BTableColumn, BTable, HList},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/type/refund/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      desserts:null,
      query: null,
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
      setTypeRefund: 'SET_TYPE_OFFER'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchTypeRefund: 'FETCH_TYPE_REFUND'
    }),

    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = api_nomvalue + item.id;
      let uri_get_data = api_tipo_devolucion_nomvalue;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Tipo de Devolución`,
        message: `Estás seguro que desea ${action} el tipo de devolución "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setTypeRefund(resolve)
        }
      })
    },
    getTypeRefund(){
      this.query = `?page=${this.paginate.current}`
      this.fetchTypeRefund(this.query)
          .then(value => {
            this.desserts = value
          })
    }
  },
  watch:{
    desserts: function () {
      let results = this.desserts
      this.paginate.current = results.page;
      this.paginate.total = results.count;
      this.paginate.perPage = results.page_size;
    },
    'paginate.current':function () {
      this.getTypeRefund();
    }
  },
  created() {
    this.getTypeRefund();
  },

}
</script>

<style scoped>

</style>