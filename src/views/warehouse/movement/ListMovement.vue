<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Movimientos de Almacen"/>
      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
          <h-list :go-to-url="addUrl"
                  :only-new="isEmpty"
                  :records="20"
                  :per-page="perPage"
                  @btn-view-all="viewAll"
                  class="mb-6"/>
          <b-tabs>
            <b-tab-item>
              <template #header>
                <b-button @click="getMovProd(paginate.current)" type="is-link"> Productos</b-button>
              </template>
              <b-table
                  :data="desserts_P"
                  :per-page="perPage"
                  :current-page="currentPage"
                  mobile-cards
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >
                <b-table-column field="object" label="Nombre" v-slot="props">
               <span class="col details">
                  {{ props.row.fk_objeto_almacen }}
                </span>
                </b-table-column>

                <b-table-column field="Area" label="Area Origen" v-slot="props">
                  <b-tag type="is-tag-success success" rounded>
                    <span class="text-status success" v-if="props.row.area_origen">
                      {{ props.row.area_origen }}</span>
                    <span class="text-status success" v-else>-</span>
                  </b-tag>

                </b-table-column>
                <b-table-column field="Area" label="Area Destino" v-slot="props">
                  <b-tag type="is-tag-completed" rounded>
                    <span class="text-status completed" v-if=" props.row.area_destino">
                      {{ props.row.area_destino }}</span>
                    <span class="text-status completed" v-else>-</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen Origen" v-slot="props">
                  <b-tag type="is-pink-opacity" rounded>
                    <span class="text-status pink">  {{ props.row.almacen_origen }}</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen Destino" v-slot="props">
                  <b-tag type="is-tag-success" rounded>
                    <span class="text-status pink" v-if="props.row.almacen_destino">
                      {{ props.row.almacen_destino }}</span>
                    <span class="text-status pink" v-else>-</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                <span class="col bold">
                {{ props.row.cantidad }}
                </span>
                </b-table-column>
                <b-table-column field="date" label="Fecha" v-slot="props">
                <span class="col">
                  {{formatYYYYMMDD(props.row.fecha)}}
                </span>
                </b-table-column>

              </b-table>
            </b-tab-item>

            <b-tab-item>
              <template #header>
                <b-button @click="getMovActive(paginate.current)" type="is-link"> Activos</b-button>
              </template>
              <b-table
                  :data="desserts_A"
                  :per-page="perPage"
                  :current-page="currentPage"
                  mobile-cards
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >

                <b-table-column field="object" label="Nombre" v-slot="props">
               <span class="col details">
                  {{ props.row.fk_objeto_almacen }}
                </span>
                </b-table-column>

                <b-table-column field="Area" label="Area Origen" v-slot="props">
                  <b-tag type="is-tag-success success" rounded>
                    <span class="text-status success" v-if="props.row.area_origen">
                      {{ props.row.area_origen }}</span>
                    <span class="text-status success" v-else>-</span>
                  </b-tag>

                </b-table-column>
                <b-table-column field="Area" label="Area Destino" v-slot="props">
                  <b-tag type="is-tag-completed" rounded>
                    <span class="text-status completed" v-if="props.row.area_destino">
                      {{ props.row.area_destino }}</span>
                    <span class="text-status completed" v-else>-</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen Origen" v-slot="props">
                  <b-tag type="is-pink-opacity" rounded>
                    <span class="text-status pink" v-if="props.row.almacen_origen">
                      {{ props.row.almacen_origen }}</span>
                    <span class="text-status pink" v-else>-</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen Destino" v-slot="props">
                  <b-tag type="is-tag-success" rounded>
                    <span class="text-status pink" v-if="props.row.almacen_destino">
                      {{ props.row.almacen_destino }}</span>
                    <span class="text-status pink" v-else>-</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                <span class="col bold">
                {{ props.row.cantidad }}
                </span>
                </b-table-column>
                <b-table-column field="date" label="Fecha" v-slot="props">
                <span class="col">
                  {{formatYYYYMMDD(props.row.fecha)}}
                </span>
                </b-table-column>

              </b-table>
            </b-tab-item>
            <b-tab-item>
              <template #header>
                <b-button @click="getMovSupplies(paginate.current)" type="is-link"> Insumos</b-button>
              </template>
              <b-table
                  :data="desserts_I"
                  :per-page="perPage"
                  :current-page="currentPage"
                  mobile-cards
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >
                <b-table-column field="object" label="Nombre" v-slot="props">
               <span class="col details">
                  {{ props.row.fk_objeto_almacen }}
                </span>
                </b-table-column>

                <b-table-column field="Area" label="Area Origen" v-slot="props">
                  <b-tag type="is-tag-success success" rounded>
                    <span class="text-status success" v-if="props.row.area_origen">
                      {{ props.row.area_origen }}</span>
                    <span class="text-status success" v-else>-</span>
                  </b-tag>

                </b-table-column>
                <b-table-column field="Area" label="Area Destino" v-slot="props">
                  <b-tag type="is-tag-completed" rounded>
                    <span class="text-status completed" v-if="props.row.area_destino">
                      {{ props.row.area_destino }}</span>
                    <span class="text-status completed" v-else>-</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen Origen" v-slot="props">
                  <b-tag type="is-pink-opacity" rounded>
                    <span class="text-status pink" v-if="props.row.almacen_origen">
                      {{ props.row.almacen_origen }}</span>
                    <span class="text-status pink" v-else>-</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen Destino" v-slot="props">
                  <b-tag type="is-tag-success" rounded>
                    <span class="text-status pink" v-if="props.row.almacen_destino">
                      {{ props.row.almacen_destino }}</span>
                    <span class="text-status pink" v-else>-</span>
                  </b-tag>

                </b-table-column>

                <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                <span class="col bold">
                {{ props.row.cantidad }}
                </span>
                </b-table-column>
                <b-table-column field="date" label="Fecha" v-slot="props">
                <span class="col">
                  {{ formatYYYYMMDD(props.row.fecha) }}
                </span>
                </b-table-column>

              </b-table>

            </b-tab-item>
          </b-tabs>
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
import BTabs from "buefy/src/components/tabs/Tabs";
import BTabItem from "buefy/src/components/tabs/TabItem";
import {OBJECT_WAREHOUSE} from '@/enum'
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: "ListOfMovement",
  components: {SkeletonTable, BTabItem, BTabs, HList, TopBar},
  data() {
    return {
      search: '',
      checkedRows: [],
      desserts_P: [],
      desserts_I: [],
      desserts_A: [],
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      type: OBJECT_WAREHOUSE.PRODUCT_QUERY,
      addUrl: '/warehouse/movement/form/',
      listMovement: [],
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
      query: {
        oa: `?oa=${OBJECT_WAREHOUSE.PRODUCT}`
      }

    }
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      fetchMovement: 'FETCH_MOVE'
    }),
    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    getMovActive(page = null) {
      this.type = OBJECT_WAREHOUSE.AF_QUERY;
      this.query.oa = `?object_warehouse=${OBJECT_WAREHOUSE.AF_QUERY}`
      if (page) {
        this.query.oa += `&page=${page}`
      }
      this.fetchMovement(this.query)
          .then(value => {
            this.desserts = value
            this.desserts_A = value.results
            this.watchPaginate = value
          })

    },
    formatYYYYMMDD(value) {
      const date = new Date(value)
      if (value && !isNaN(date)) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return year + '-' +
            ((month < 10 ? '0' : '') + month) + '-' +
            ((day < 10 ? '0' : '') + day) + ' ' +
            ((hours < 10 ? '0' : '') + hours) + ':' +
            ((minutes < 10 ? '0' : '') + minutes)
      }
      return ''
    },
    getMovProd(page = null) {
      this.type = OBJECT_WAREHOUSE.PRODUCT_QUERY;
      this.query.oa = `?object_warehouse=${OBJECT_WAREHOUSE.PRODUCT_QUERY}`
      if (page) {
        this.query.oa += `&page=${page}`
      }
      this.fetchMovement(this.query)
          .then(value => {
            this.desserts = value
            this.desserts_P = value.results
            this.watchPaginate = value
          })
    },
    getMovSupplies(page = null) {
      this.type = OBJECT_WAREHOUSE.SUPPLIES_QUERY;
      this.query.oa = `?object_warehouse=${OBJECT_WAREHOUSE.SUPPLIES_QUERY}`
      if (page) {
        this.query.oa += `&page=${page}`
      }
      this.fetchMovement(this.query)
          .then(value => {
            this.desserts = value
            this.desserts_I = value.results
            this.watchPaginate = value
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
      switch (this.type) {
        case OBJECT_WAREHOUSE.PRODUCT_QUERY:
          this.getMovProd(this.paginate.current)
          break;
        case OBJECT_WAREHOUSE.AF_QUERY:
          this.getMovActive(this.paginate.current)
          break;
        case OBJECT_WAREHOUSE.SUPPLIES_QUERY:
          this.getMovSupplies(this.paginate.current)
          break;
      }
    }
  },
  created() {
    switch (this.type) {
      case OBJECT_WAREHOUSE.PRODUCT_QUERY:
        this.getMovProd(this.paginate.current)
        break;
      case OBJECT_WAREHOUSE.AF_QUERY:
        this.getMovActive(this.paginate.current)
        break;
      case OBJECT_WAREHOUSE.SUPPLIES_QUERY:
        this.getMovSupplies(this.paginate.current)
        break;
    }
  },

}
</script>

<style scoped lang="scss">

</style>