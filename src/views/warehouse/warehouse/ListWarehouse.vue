<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Almacenes"/>
      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
                 <h-list :go-to-url="addUrl"
                :only-new="isEmpty"
                :records="desserts.count"
                :per-page="perPage"
                :view-mode="true"
                @view-module="viewMode = false"
                @view-list="viewMode=true"
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
        <section v-if="viewMode">
          <b-table
              :data="isEmpty ? [] : desserts.results"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page="currentPage"
              mobile-cards
              detailed
              detail-key="id"
              :show-detail-icon="true"
              checkbox-position="left"
              :checked-rows="checkedRows"
              :row-class="(row, index) => row.deleted && 'is-danger'"
          >

            <b-table-column field="nombre" label="Nombre" v-slot="props">
              <template>
                <a class="col details" @click="props.toggleDetails(props.row)">
                  {{ props.row.name }}
                </a>
              </template>
              <span class="col bold">

           </span>
            </b-table-column>

            <b-table-column field="fk_area" label="Area" v-slot="props">
            <span class="col">
              {{ props.row.fk_area.name }}
            </span>
            </b-table-column>

            <b-table-column field="cantidad" label="Principal" v-slot="props">
              <div class="main mt-2">
                <b-checkbox v-model="props.row.master"></b-checkbox>
              </div>
            </b-table-column>

            <b-table-column field="proveedor" label="Creado por " v-slot="props">
            <span class="col">
              {{ props.row.created }}
            </span>
            </b-table-column>

            <b-table-column field="vida_util" label="Actualizado por" v-slot="props">
            <span class="col">
              {{ props.row.modified }}
            </span>
            </b-table-column>


            <b-table-column field="action" label="Acciones" v-slot="props">
              <div class="is-flex">
                <router-link :to="{name: 'formEditWarehouse', params:{id:props.row.id}}">
                  <div class="mx-10">
                    <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                  </div>
                </router-link>
                <div @click="open_modal_delete(props.row)" class="mx-10 mt-1">
                  <b-icon type="is-danger" icon="delete" class="mx-4 cursor-pointer"></b-icon>
                </div>
              </div>
            </b-table-column>
            <template #detail="props">
              <div class="columns is-flex is-flex-direction-column">
                <div class="column is-half is-flex">
                  <span class="details-name">Jefe Almacen:</span>
                  <span class="ml-2">{{ props.row.boss.user.first_name }}</span>
                  <span class="details-name ml-5">Telefono:</span>
                  <span class="ml-2">{{ props.row.boss.user.phone_number }}</span>
                </div>
                <div class="column is-half is-flex">
                  <span class="details-name">Almacenero:</span>
                  <span class="ml-2">{{ props.row.grocer.user.first_name}}</span>
                  <span class="details-name ml-5">Telefono:</span>
                  <span class="ml-2">{{ props.row.grocer.user.phone_number }}</span>
                </div>
              </div>
            </template>
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
        <section v-else>
          <div class="columns is-flex-wrap-wrap">
            <div @click="modalWarehouse(item)" class="column is-one-quarter pointer"
                 v-for="(item, idx) in desserts.results" :key="idx">
              <div class="is-flex is-flex-direction-column is-align-items-center">
                <b-icon size="is-large" icon="database"></b-icon>
                <span class="col bold">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </section>
        <b-modal #default="props"
                 v-model="isComponentModalActive"
                 has-modal-card
                 full-screen
                 :can-cancel="true">
          <modal-warehouse :warehouse="warehouse" @close="props.close" v-bind="warehouse"></modal-warehouse>
        </b-modal>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import {api_almacen} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import ModalWarehouse from "@/components/modalWarehouse";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: "LWarehouse",
  components: {SkeletonTable, ModalWarehouse, BTableColumn, BTable, HList, TopBar},
  data() {
    return {
      search: '',
      checkedRows: [],
      viewMode: false,
      addUrl: '/warehouse/form/',
      isEmpty: false,
      isPaginated: false,
      isComponentModalActive: false,
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
      records: null,
      warehouse: null,
    }
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setWarehouse: 'SET_WAREHOUSE_LIST'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchWarehouse: 'FETCH_WAREHOUSE',
    }),

    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    modalWarehouse(props) {
      this.warehouse = props
      this.isComponentModalActive = !this.isComponentModalActive
    },
    open_modal_delete: function (item) {
      let uri_delete = api_almacen + item.id + '/';
      let uri_get_data = api_almacen;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Almacen`,
        message: `Estás seguro que desea ${action} el almacen "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.getWarehouse();
          this.setWarehouse(resolve);
        }
      })
    },
    searchIconClick() {
      this.query = this.search ? `?nombre=${this.search}` : null
      this.fetchWarehouse(this.query)
          .then(value => {
            this.desserts = value
          })
    },
    getWarehouse() {
      this.query = `?page=${this.paginate.current}`
      this.fetchWarehouse(this.query)
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
      this.getWarehouse();
    }
  },
  created() {
    this.getWarehouse();
  },
}
</script>

<style lang="scss" scoped>
.main {
  pointer-events: none;
}

.pointer {
  cursor: pointer;
}

.details-name {
  font-weight: bold;
  font-size: 16px;
  color: #0B2B46;
}
</style>