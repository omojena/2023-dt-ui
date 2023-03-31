<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Servicios de Renta"/>
      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
          <h-list :go-to-url="addUrl"
                  :only-new="isEmpty"
                  :records="desserts.count"
                  :per-page="perPage"
                  class="mb-6"/>
          <div class="columns filters is-flex is-justify-content-space-between">
            <div class="column is-flex is-align-items-center">
              <div>
                <b-field>
                  <b-input placeholder="Buscar"
                           custom-class="search-filter"
                           v-model="search"
                           type="search"
                           icon="magnify"
                           icon-clickable
                           @icon-click="searchIconClick">
                  </b-input>
                </b-field>
              </div>
            </div>
          </div>
          <section>
            <b-table
                :data="isEmpty ? [] : desserts.results"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page="currentPage"
                mobile-cards
                :row-class="(row, index) => row.deleted && 'is-danger'"
                checkbox-position="left"
                :checked-rows="checkedRows"
            >

              <b-table-column field="nombre" label="Nombre" v-slot="props">
           <span class="col details">
              {{ props.row.nombre }}
           </span>
              </b-table-column>

              <b-table-column field="numero" label="Numero" v-slot="props">
               <span class="col bold">
                  {{ props.row.cliente }}
               </span>
              </b-table-column>

              <b-table-column field="numero" label="Numero" v-slot="props">
               <span class="col bold">
                  {{ props.row.estacio_renta }}
               </span>
              </b-table-column>

              <b-table-column field="numero" label="Numero" v-slot="props">
               <span class="col bold">
                  {{ props.row.cant_bicicletas }}
               </span>
              </b-table-column>

              <b-table-column field="created_by" label="Creado por" v-slot="props">
            <span class="col">
              {{ props.row.created_by }}
            </span>
              </b-table-column>
              <b-table-column field="updated_by" label="Actualizado por" v-slot="props">
            <span class="col">
              {{ props.row.updated_by }}
            </span>
              </b-table-column>


              <b-table-column field="action" label="Acciones" v-slot="props">
                <div class="is-flex">
                  <router-link :to="{name: 'formEditServiceRent', params:{id:props.row.id}}">
                    <div class="mx-10">
                      <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                    </div>
                  </router-link>
                </div>
              </b-table-column>
            </b-table>
          </section>
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
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTableColumn from "buefy/src/components/table/TableColumn";
import BTable from "buefy/src/components/table/Table";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: 'LAccounts',
  components: {SkeletonTable, BTable, BTableColumn, HList, TopBar},
  comments: {},
  data() {
    return {
      viewMode: false,
      search: '',
      checkedRows: [],
      addUrl: '/service/rent/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      watchPaginate: null,
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
      query: '',
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
      this.getAccounts();
    }
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setAccounts: 'SET_ACCOUNTS'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchServices: 'FETCH_RENT_SERVICES'
    }),
    getServices() {
      this.fetchServices(this.query)
          .then(value => {
            this.desserts = value
          })
    },
    searchIconClick() {
      this.query = this.search ? `?nombre=${this.search}` : null
      this.getAccounts()
    },
  },

  created() {
    this.getServices()

  },

}
</script>
