<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Activos Fijos Tangibles"/>
      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
          <h-list :go-to-url="addUrl"
                  :only-new="isEmpty"
                  :records="listActive.length"
                  :per-page="perPage"
                  @btn-view-all="viewAll"
                  class="mb-6"/>
          <b-tabs>
            <b-tab-item>
              <template #header>
                <b-button @click="getAftTangibles(paginate.current)" type="is-link"> Tanjibles</b-button>
              </template>
              <b-table
                  :data="isEmpty ? [] : listActive"
                  :paginated="isPaginated"
                  :per-page="perPage"
                  :current-page="currentPage"
                  mobile-cards
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >

                <b-table-column field="nombre" label="Nombre" v-slot="props">
                  {{ props.row.nombre }}
                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen" v-slot="props">
                  <span v-if="props.row.fk_almacen">{{ props.row.fk_almacen }}</span>
                  <span v-else>-</span>
                </b-table-column>
                <b-table-column field="fk_area" label="Area" v-slot="props">
                  <span v-if="props.row.fk_area">{{ props.row.fk_area }}</span>
                  <span v-else>-</span>
                </b-table-column>

                <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                  {{ props.row.cantidad }}
                </b-table-column>

                <b-table-column field="proveedor" label="Proveedor" v-slot="props">
                  {{ props.row.proveedor }}
                </b-table-column>

                <b-table-column field="vida_util" label="Vida Util (años)" v-slot="props">
                  {{ props.row.vida_util }}
                </b-table-column>
                <b-table-column field="depreciacion" label="Depreciación (años)" v-slot="props">
                  {{ props.row.depreciacion }}
                </b-table-column>

                <b-table-column field="action" label="Acciones" v-slot="props">
                  <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                    <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
                  </div>
                </b-table-column>

              </b-table>
            </b-tab-item>
            <b-tab-item>
              <template #header>
                <b-button @click="getAftIntangibles(paginate.current)" type="is-link"> Intanjibles</b-button>
              </template>
              <b-table
                  :data="isEmpty ? [] : listActive"
                  :paginated="isPaginated"
                  :per-page="perPage"
                  :current-page="currentPage"
                  mobile-cards
                  detailed
                  detail-key="id"
                  :show-detail-icon="true"
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >

                <b-table-column field="nombre" label="Nombre" v-slot="props">
                  <template>
                    <a class="col details" @click="props.toggleDetails(props.row)">
                      {{ props.row.nombre }}
                    </a>
                  </template>
                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen" v-slot="props">
                  <span class="col" v-if="props.row.fk_almacen">{{ props.row.fk_almacen }}</span>
                  <span v-else>-</span>
                </b-table-column>
                <b-table-column field="fk_area" label="Area" v-slot="props">
                  <span class="col" v-if="props.row.fk_area">{{ props.row.fk_area }}</span>
                  <span v-else>-</span>
                </b-table-column>

                <b-table-column field="cantidad" label="Cantidad" v-slot="props">
                <span class="col">
                  {{ props.row.cantidad }}
                </span>
                </b-table-column>

                <b-table-column field="proveedor" label="Proveedor" v-slot="props">
                <span class="col">
                  {{ props.row.proveedor }}
                </span>
                </b-table-column>

                <b-table-column field="vida_util" label="Vida Util" v-slot="props">
                <span class="col">
                  {{ props.row.vida_util }}
                </span>
                </b-table-column>
                <b-table-column field="depreciacion" label="Depreciación" v-slot="props">
                <span class="col">
                  {{ props.row.depreciacion }}
                </span>
                </b-table-column>

                <b-table-column field="action" label="Acciones" v-slot="props">
                  <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                    <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
                  </div>
                </b-table-column>
                <template #detail="props">
                  <section>
                    <div class="columns">
                      <div class="column is-6">
                        <div class="is-flex">
                          <div class="is-flex is-flex-direction-column">
                            <span class="label-data" v-if="props.row.created_at">Fecha de Creación: </span>
                            <span class="label-data" v-if="props.row.fecha_compra">Fecha de Compra: </span>

                          </div>
                          <div class="is-flex is-flex-direction-column ml-40">
                      <span class="item ml-3" v-if="props.row.created_at">{{
                          formatYYYYMMDD(props.row.created_at)
                        }}</span>
                            <span class="item ml-3"
                                  v-if="props.row.fecha_compra">{{ formatYYYYMMDD(props.row.fecha_compra) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </template>
              </b-table>
            </b-tab-item>
            <b-tab-item>
              <template #header>
                <b-button @click="getAftBike(paginate.current)" type="is-link"> Bicicletas</b-button>
              </template>
              <b-table
                  :data="isEmpty ? [] : listActive"
                  :paginated="isPaginated"
                  :per-page="perPage"
                  :current-page="currentPage"
                  mobile-cards
                  checkbox-position="left"
                  :checked-rows="checkedRows"
                  :row-class="(row, index) => row.deleted && 'is-danger'"
              >

                <b-table-column field="nombre" label="Numero" v-slot="props">
                  {{ props.row.numero }}
                </b-table-column>

                <b-table-column field="fk_almacen" label="Almacen" v-slot="props">
                  <span v-if="props.row.fk_almacen">{{ props.row.fk_almacen }}</span>
                  <span v-else>-</span>
                </b-table-column>
                <b-table-column field="fk_area" label="Area" v-slot="props">
                  <span v-if="props.row.fk_area">{{ props.row.fk_area }}</span>
                  <span v-else>-</span>
                </b-table-column>

                <b-table-column field="marca" label="Marca" v-slot="props">
                  {{ props.row.marca }}
                </b-table-column>

                <b-table-column field="vida_util" label="Modelo" v-slot="props">
                  {{ props.row.modelo }}
                </b-table-column>
                <b-table-column field="calidad" label="Calidad" v-slot="props">
                  {{ props.row.calidad }}
                </b-table-column>

                <b-table-column field="action" label="Acciones" v-slot="props">
                  <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                    <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
                  </div>
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
import {api_aft} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import BButton from "buefy/src/components/button/Button";
import {TYPE_ACTIVE} from '@/enum'
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: "ListOfAft",
  components: {SkeletonTable, BButton, BTableColumn, BTable, HList, TopBar},
  data() {
    return {
      search: '',
      checkedRows: [],
      addUrl: '/warehouse/aft/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      type: TYPE_ACTIVE.AFT,
      listActive: [],
      watchPaginate: null,
      aftTangible: null,
      aftIntangible: null,
      aftBike: null,
      query: `?tipo_activo=${TYPE_ACTIVE.AFT}`,
      fullQuery: '',
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
      setAftList: "SET_AFT_LIST"
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchAftList: 'FETCH_AFT'
    }),
    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    getAftTangibles(page = null) {
      this.listActive = []
      this.type = TYPE_ACTIVE.AFT
      this.query = `?tipo_activo=${TYPE_ACTIVE.AFT}`
      if (page) {
        this.query += `&page=${page}`
      }
      this.fetchAftList(this.query)
          .then(value => {
            this.desserts = value
            this.aftTangible = value
            this.watchPaginate = value
            this.listActive = value.results
          });
    },
    getAftIntangibles(page = null) {
      this.listActive = []
      this.type = TYPE_ACTIVE.AFI
      this.query = `?tipo_activo=${TYPE_ACTIVE.AFI}`
      if (page) {
        this.query += `&page=${page}`
      }
      this.fetchAftList(this.query)
          .then(value => {
            this.aftIntangible = value
            this.watchPaginate = value
            this.listActive = value.results
          });
    },
    getAftBike(page = null) {
      this.listActive = []
      this.type = TYPE_ACTIVE.AFB
      this.query = `?tipo_activo=${TYPE_ACTIVE.AFB}`
      if (page) {
        this.query += `&page=${page}`
      }
      this.fetchAftList(this.query)
          .then(value => {
            this.aftBike = value
            this.watchPaginate = value
            this.listActive = value.results
          });
    },

    open_modal_delete: function (item) {
      let uri_delete = api_aft + item.id + '/';
      let uri_get_data = api_aft + this.query;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Activo`,
        message: `Estás seguro que desea ${action} el activo "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.listActive = resolve.results;
          this.setAftList(resolve);
        }
      })
    },
    formatYYYYMMDD(value) {
      const date = new Date(value)
      if (value && !isNaN(date)) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return year + '-' +
            ((month < 10 ? '0' : '') + month) + '-' +
            ((day < 10 ? '0' : '') + day)
      }
      return ''
    },

  },
  watch: {
    watchPaginate: function () {
      let results = this.watchPaginate
      this.paginate.current = results.page;
      this.paginate.total = results.count;
      this.paginate.perPage = results.page_size;
    },
    'paginate.current': function () {
      switch (this.type) {
        case TYPE_ACTIVE.AFT:
          this.getAftTangibles(this.paginate.current)
          break;
        case TYPE_ACTIVE.AFI:
          this.getAftIntangibles(this.paginate.current)
          break;
        case TYPE_ACTIVE.AFB:
          this.getAftBike(this.paginate.current)
          break;
      }
    }
  },
  created() {
    switch (this.type) {
      case TYPE_ACTIVE.AFT:
        this.getAftTangibles(this.paginate.current)
        break;
      case TYPE_ACTIVE.AFI:
        this.getAftIntangibles(this.paginate.current)
        break;
      case TYPE_ACTIVE.AFB:
        this.getAftBike(this.paginate.current)
        break;
    }
  },


}
</script>

<style scoped>

</style>
