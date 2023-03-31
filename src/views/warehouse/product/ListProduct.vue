<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Productos"/>
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
              :data="isEmpty ? [] : desserts.results.filter(o => o !== null)"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page="currentPage"
              mobile-cards
              checkbox-position="left"
              :checked-rows="checkedRows"
              :row-class="(row, index) => row.deleted && 'is-danger'"
          >

            <b-table-column field="nombre" label="Nombre" v-slot="props">
              {{ props.row.nombre }}
            </b-table-column>

            <b-table-column field="fk_almacen" label="Código" v-slot="props">
              {{ props.row.codigo }}
            </b-table-column>

            <b-table-column field="cantidad" label="Cantidad" v-slot="props">
              {{ props.row.cantidad }}
            </b-table-column>

            <b-table-column field="proveedor" label="Proveedor" v-slot="props">
              {{ props.row.proveedor }}
            </b-table-column>

            <b-table-column field="um" label="UM" v-slot="props">
              {{ props.row.um }}
            </b-table-column>
            <b-table-column field="costo_unitario" label="Costo Unitario" v-slot="props">
              {{ props.row.costo_unitario }}
            </b-table-column>
            <b-table-column field="precio_compra" label="Precio de Compra" v-slot="props">
              {{ props.row.precio_compra }}
            </b-table-column>
            <b-table-column field="created_by" label="Creado por" v-slot="props">
              {{ props.row.created_by }}
            </b-table-column>


            <b-table-column field="action" label="Acciones" v-slot="props">
              <div class="is-flex">
                <router-link :to="{name: 'formEditProducts', params:{id:props.row.id}}">
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
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import {api_producto} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: "LProducts",
  components: {SkeletonTable, BTableColumn, BTable, HList, TopBar},
  data() {
    return {
      search: '',
      checkedRows: [],
      addUrl: '/warehouse/product/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      query: '',
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
      setProductList: 'SET_PRODUCTS_LIST'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetProductList: 'FETCH_PRODUCT'
    }),
    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = api_producto + item.id + '/';
      let uri_get_data = api_producto;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Activo`,
        message: `Estás seguro que desea ${action} el producto "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setProductList(resolve)
        }
      })
    },
    getProducts() {
      this.query = `?page=${this.paginate.current}`
      this.fetProductList(this.query)
          .then(value => {
            this.desserts = value
          })
    }
  },
  watch: {
    desserts: function () {
      let results = this.desserts
      this.paginate.current = results.page;
      this.paginate.total = results.count;
      this.paginate.perPage = results.page_size;
    },
    'paginate.current': function () {
      this.getProducts();
    }
  },
  created() {
    this.getProducts();
  },

}
</script>

<style scoped>
</style>
