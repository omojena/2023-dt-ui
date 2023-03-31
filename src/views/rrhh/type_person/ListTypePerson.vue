<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Tipos de Persona"/>
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
               <span class="col">
                 {{ props.row.nombre }}
              </span>
            </b-table-column>

            <b-table-column field="fk_empresa" label="Empresa" v-slot="props">
              <span class="col">
                 {{ props.row.fk_empresa }}
              </span>
            </b-table-column>
            <b-table-column field="created_by" label="Creado por" v-slot="props">
               <span class="col">
                {{ props.row.created_by }}
              </span>
            </b-table-column>
            <b-table-column field="count" label="Actualizado por" v-slot="props">
              <span class="col">
                {{ props.row.updated_by }}
              </span>
            </b-table-column>
            <b-table-column field="action" label="Acciones" v-slot="props">
              <div class="is-flex">
                <router-link :to="{name: 'formEditTypePerson', params:{id:props.row.id}}">
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
import * as URL from "../../../urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: 'LTPerson',
  components: {SkeletonTable, BTableColumn, BTable, HList, TopBar},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/type/person/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      query: null,
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
      setTypePerson: 'SET_TYPE_PERSON'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchTypePerson: 'FETCH_TYPE_PERSON'
    }),
    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = URL.api_tipo_persona + item.id + '/';
      let uri_get_data = URL.api_tipo_persona;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Tipo de Persona`,
        message: `Estás seguro que desea ${action} el tipo de persona "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setTypePerson(resolve)
        }
      })
    },
    getTypePerson(){
      this.query = `?page=${this.paginate.current}`
      this.fetchTypePerson(this.query)
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
      this.getTypePerson();
    }
  },
  created() {
    this.getTypePerson();
  },
}
</script>

<style scoped>
</style>
