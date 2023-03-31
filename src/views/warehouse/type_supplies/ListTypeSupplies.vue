<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Tipos de Insumo"/>
      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
          <h-list :go-to-url="addUrl"
                  :only-new="isEmpty"
                  :records="desserts.length"
                  :per-page="perPage"
                  @btn-view-all="viewAll"
                  class="mb-6"/>
          <b-table
              :data="isEmpty ? [] : desserts"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page="currentPage"
              :row-class="(row, index) => row.deleted && 'is-danger'"
              mobile-cards>

            <b-table-column field="nombre" label="Nombre" v-slot="props">
              {{ props.row.nombre }}
            </b-table-column>

            <b-table-column field="created_by" label="Creado por" v-slot="props">
              {{ props.row.created_by }}
            </b-table-column>
            <b-table-column field="count" label="Actualizado por" v-slot="props">
              {{ props.row.updated_by }}
            </b-table-column>

            <b-table-column field="action" label="Acciones" v-slot="props">
              <div class="is-flex">
                <router-link :to="{name: 'formTypeSupplies', params:{id:props.row.id}}">
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
<!--          <b-pagination class="mt-5"-->
<!--              :total="paginate.total"-->
<!--              v-model="paginate.current"-->
<!--              :range-before="paginate.rangeBefore"-->
<!--              :range-after="paginate.rangeAfter"-->
<!--              :order="paginate.order"-->
<!--              :size="paginate.size"-->
<!--              :simple="paginate.isSimple"-->
<!--              :rounded="paginate.isRounded"-->
<!--              :per-page="paginate.perPage"-->
<!--              :icon-prev="paginate.prevIcon"-->
<!--              :icon-next="paginate.nextIcon"-->
<!--              aria-next-label="Next page"-->
<!--              aria-previous-label="Previous page"-->
<!--              aria-page-label="Page"-->
<!--              aria-current-label="Current page">-->
<!--          </b-pagination>-->
        </section>

      </div>
    </section>
  </div>

</template>
<script>
import * as URL from "../../../urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import SkeletonTable from "@/components/skeleton/skeleton-table";


export default {
  name: 'LTSupplies',
  components: {SkeletonTable, BTableColumn, BTable, HList, TopBar},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/type/supplies/form/',
      isEmpty: false,
      isPaginated: true,
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
      setTypeSuppliesList: 'SET_SUPPLIES_TYPE_LIST'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchTypeSuppliesList: 'FETCH_TYPE_SUPPLIES'
    }),
    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = URL.api_attributenomtype + item.id + '/';
      let uri_get_data = URL.api_get_type_insumo;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Tipo de Insumo`,
        message: `Estás seguro que desea ${action} el tipo de Insumo "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setTypeSuppliesList(resolve);
        }
      })
    },
    getTypeSupplies() {
      this.query = `?page=${this.paginate.current}`
      this.fetchTypeSuppliesList(this.query)
          .then(value => {
            this.desserts = value
          })
    }
  },
  // watch: {
  //   desserts: function () {
  //     let results = this.desserts
  //     this.paginate.current = results.page;
  //     this.paginate.total = results.count;
  //     this.paginate.perPage = results.page_size;
  //   },
  //   'paginate.current': function () {
  //     this.getTypeSupplies();
  //   }
  // },
  created() {
    this.getTypeSupplies();
  },


}
</script>

<style scoped>

</style>