<template>
  <div class="content-page">
    <section>
      <top-bar is_back page-title="Tipos de Pago"/>
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

          <b-table-column field="nombre" label="Nombre" v-slot="props">
            <span class="col bold">
              {{ props.row.nombre }}
            </span>
          </b-table-column>

          <b-table-column field="descripcion" label="Descripcion" v-slot="props">
            <b-tooltip multilined :label="props.row.descripcion">
              <span class="col">{{ props.row.descripcion | truncate(50, '...')}}</span>
            </b-tooltip>
          </b-table-column>

          <b-table-column field="action" label="Acciones" v-slot="props">
            <div class="is-flex">
              <router-link :to="{name: 'formEditTypePay', params:{id:props.row.id}}">
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

import {mapMutations, mapActions} from 'vuex'
import * as URL from "../../../urls";
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";


export default {
  name: 'LTPay',
  components: {BTableColumn, BTable, HList, TopBar},
  comments: {},
  data() {
    return {
      search: '',
      checkedRows: [],
      addUrl: '/type/pay/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      query: '',
      desserts:null,
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
      setTypePay: 'SET_TYPE_PAY'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchTypePayments: 'FETCH_TYPE_PAYMENTS'

    }),
    open_modal_delete: function (item) {
      let uri_delete = URL.api_nomvalue + item.id + '/';
      let uri_get_data = URL.api_tipo_pago_nomvalue;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Tipo de Pago`,
        message: `Estás seguro que desea ${action} el tipo de pago "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setTypePay(resolve)
        }
      })
    },
    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    getTypePayments(){
      this.query = `?page=${this.paginate.current}`
      this.fetchTypePayments(this.query)
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
      this.getTypePayments();
    }
  },
  created() {
    this.getTypePayments();
  },


}
</script>

<style scoped>

</style>
