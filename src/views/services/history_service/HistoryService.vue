<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Historial de Servicios"/>
    </section>
    <section>
      <div v-if="!desserts">
        <skeleton-card-service/>
      </div>
      <div v-else>
        <div class="columns column-dashboard mt-1">
          <div class="column column-left is-full">
            <div class="cards is-flex is-justify-content-space-between">
              <div class="card card-box bg-blue1 is-flex is-flex-direction-column">
                <div semi-bold class="title-card">Servicios Aperturados: {{ init.init_count }}</div>
                <div semi-bold class="data-card">Mensajeria: {{ init.init_msg }}</div>
                <div semi-bold class="data-card">Renta: {{ init.init_rent }}</div>
                <div semi-bold class="data-card">Taller: {{ init.init_taller }}</div>
              </div>
              <div class="card card-box bg-blue2 card-center is-flex is-flex-direction-column">
                <div semi-bold class="title-card">Servicios en Desarrollo: {{ process.process_count }}</div>
                <div semi-bold class="data-card">Mensajeria: {{ process.process_msg }}</div>
                <div semi-bold class="data-card">Renta: {{ process.process_rent }}</div>
                <div semi-bold class="data-card">Taller: {{ process.process_taller }}</div>
              </div>
              <div class="card card-box bg-red1 card-center is-flex is-flex-direction-column">
                <div semi-bold class="title-card">Servicios Finalizados: {{ finish.finish_count }}</div>
                <div semi-bold class="data-card">Mensajeria: {{ finish.finish_msg }}</div>
                <div semi-bold class="data-card">Renta: {{ finish.finish_rent }}</div>
                <div semi-bold class="data-card">Taller: {{ finish.finish_taller }}</div>
              </div>
              <div class="card card-box bg-purple1 is-flex is-flex-direction-column">
                <div semi-bold class="title-card">Total de Servicios: {{ total.total_count }}</div>
                <div semi-bold class="data-card">Mensajeria: {{ total.total_msg }}</div>
                <div semi-bold class="data-card">Renta: {{ total.total_rent }}</div>
                <div semi-bold class="data-card">Taller: {{ total.total_taller }}</div>
              </div>
            </div>

          </div>
        </div>

        <section>
          <div class="columns is-flex is-align-items-center">
            <div class="column is-3">
              <b-field class="mt-4" label="Tipo de Servicio" label-position="on-border">
                <b-select placeholder="Seleccione"
                          v-model="typeFilter"
                          expanded>
                  <option v-for="(item, index) in typeFilterList"
                          :key="index"
                          :value="item.value">
                    {{ item.text }}
                  </option>
                </b-select>
              </b-field>
            </div>

            <div class="column is-3" v-if="typeFilter === typeService.MESSENGER">
              <b-field class="mt-4" label="Proveedor del Servicio" label-position="on-border">
                <b-select placeholder="Seleccione"
                          v-model="messengerProvider"
                          expanded>
                  <option v-for="(item, index) in messengerProviderList"
                          :key="index"
                          :value="item.id">
                    {{ item.nombre }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-3">
              <b-field class="mt-4" label="Estado" label-position="on-border">
                <b-select placeholder="Seleccione"
                          v-model="statusFilter"
                          expanded>
                  <option v-for="(item, index) in statusFilterList"
                          :key="index"
                          :value="item.value">
                    {{ item.text }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-1 is-flex is-justify-content-flex-start">
              <b-button @click="clearFilter" type="is-primary" rounded>Limpiar Filtros</b-button>
            </div>
            <div class="column is-2 is-flex is-justify-content-flex-end">
              <b-button @click="getServicesList" type="is-primary-light" rounded>Buscar</b-button>
            </div>
          </div>
        </section>
      </div>

      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
          <h-list
              :only-all="true"
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
          >

            <b-table-column field="nombre" label="Servicio" v-slot="props">
              <span class="col details">
                {{ props.row.servicio.nombre }}
              </span>
            </b-table-column>

            <b-table-column field="fk_almacen" label="Importe" v-slot="props">
              {{ props.row.servicio.importe }}
            </b-table-column>

            <b-table-column field="cantidad" label="Cliente" v-slot="props">
              <span v-if="props.row.servicio.clientId"> {{ props.row.servicio.clientId.nombre }}</span>
              <span v-else>{{ props.row.servicio.proveedor.nombre }}</span>
            </b-table-column>

            <b-table-column field="proveedor" label="Fecha" v-slot="props">
              {{ formatYYYYMMDD(props.row.servicio.created_at) }}
            </b-table-column>

            <b-table-column field="atendidoPor" label="Atendido por" v-slot="props">
              {{ props.row.servicio.created_by }}
            </b-table-column>
            <b-table-column field="estado" label="Estado" v-slot="props">
              <div @click="openModalStatus(props.row.servicio)">
                <b-tag class="pointer" type="is-tag-success success" rounded
                       v-if="props.row.servicio.estado === statusServices.COMPLETED">
                  <template v-if="props.row.servicio.type===1">
                    <b-tooltip multilined>
                      <span class="text-status success is-uppercase"> Finalizado</span>
                      <template v-slot:content>
                        <b> <i class="mdi mdi-truck-delivery mx-4"> </i> Mensajero :</b> {{
                          props.row.mensajero.nombre
                        }}
                        <br>
                        <b> <i class="mdi mdi-phone mx-4"></i> Telefono :</b> {{ props.row.mensajero.telefono }}
                      </template>
                    </b-tooltip>
                  </template>
                  <template v-else>
                    <span class="text-status success is-uppercase"> Finalizado</span>
                  </template>

                </b-tag>
                <b-tag class="pointer" type="is-tag-completed" rounded
                       v-if="props.row.servicio.estado === statusServices.PROCESS">
                  <template v-if="props.row.servicio.type===1">
                    <b-tooltip multilined>
                      <span class="text-status completed is-uppercase"> En Ejecucion</span>
                      <template v-slot:content>
                        <b> <i class="mdi mdi-truck-delivery mx-4"> </i> Mensajero :</b> {{
                          props.row.mensajero.nombre
                        }}
                        <br>
                        <b> <i class="mdi mdi-phone mx-4"></i> Telefono :</b> {{ props.row.mensajero.telefono }}
                      </template>
                    </b-tooltip>
                  </template>
                  <template v-else>
                    <span class="text-status completed is-uppercase"> En Ejecucion</span>
                  </template>
                </b-tag>
                <b-tag class="pointer" type="is-primary-light" rounded
                       v-if="props.row.servicio.estado === statusServices.PENDING">
                  <span class="text-status white is-uppercase"> Aperturado</span>
                </b-tag>
              </div>

            </b-table-column>

            <b-table-column field="action" label="Acciones" v-slot="props">
              <div class="is-flex">
                <div
                    :class="{'d-none': props.row.servicio.estado === statusServices.COMPLETED ||
                  (props.row.servicio.estado === statusServices.PROCESS &&
                  props.row.servicio.type === typeService.MESSENGER )}"
                    @click="setLinkEdit(props.row.servicio)"
                    class="mx-10">
                  <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                </div>
                <div v-if="false" :class="{'d-none': props.row.servicio.estado === statusServices.COMPLETED}"
                     @click="open_modal_delete(props.row.servicio)"
                     class="mx-10">
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
      <b-modal
          v-model="isModalChangeStatusActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="false"
          aria-role="dialog"
          aria-label="Example Modal"
          aria-modal>
        <template #default="props">
          <modal-change-status-service :service="service"
                                       @reload="reload"
                                       @close="props.close"></modal-change-status-service>

        </template>
      </b-modal>
    </section>
  </div>
</template>

<script>
import {api_services} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import router from "@/router";
import ModalChangeStatusService from "@/components/modalChangeStatusService";
import {TYPE_SERVICE, STATUS_SERVICE} from "@/enum";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import SkeletonCardService from "@/components/skeleton/skeleton-card-service";

export default {
  name: "History",
  components: {SkeletonCardService, SkeletonTable, ModalChangeStatusService, BTableColumn, BTable, HList, TopBar},
  data() {
    return {
      search: '',
      checkedRows: [],
      isEmpty: false,
      isModalChangeStatusActive: false,
      selectMessenger: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      status: null,
      service: null,
      typeService: TYPE_SERVICE,
      statusServices: STATUS_SERVICE,
      desserts: null,
      init: {
        init_count: null,
        init_rent: null,
        init_msg: null,
        init_taller: null
      },
      process: {
        process_count: null,
        process_rent: null,
        process_msg: null,
        process_taller: null
      },
      finish: {
        finish_count: null,
        finish_rent: null,
        finish_msg: null,
        finish_taller: null
      },
      total: {
        total_count: null,
        total_rent: null,
        total_msg: null,
        total_taller: null
      },

      statusFilterList: [
        {value: STATUS_SERVICE.PENDING, text: 'Aperturado'},
        {value: STATUS_SERVICE.PROCESS, text: 'En Ejecucion'},
        {value: STATUS_SERVICE.COMPLETED, text: 'Finalizado'},
      ],
      statusFilter: null,
      messengerProviderList: [],
      typeFilter: null,
      typeFilterList: [
        {value: TYPE_SERVICE.MESSENGER, text: 'Mensajeria'},
        {value: TYPE_SERVICE.TALLER, text: 'Taller'},
        {value: TYPE_SERVICE.RENT, text: 'Renta'},
      ],
      messengerProvider: null,
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
      filterQuery: {
        status: null,
        type: null,
        provider: null,
        created: null
      }
    }
  },
  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
      setService: 'SET_SERVICE'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchService: 'FETCH_ALL_SERVICES',
      fetchServiceStats: 'FETCH_STATS_OPEN_SERVICE',
      setStatusService: 'PARTIAL_UPDATE_SERVICE',
      fetchMessengerProviderList: 'FETCH_MESSENGER_PROVIDER_LIST',

    }),
    openModalStatus(prop) {
      this.service = prop
      if (prop.estado !== STATUS_SERVICE.COMPLETED) {
        this.isModalChangeStatusActive = !this.isModalChangeStatusActive
      }
    },
    viewAll() {
      this.isPaginated = !this.isPaginated;
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
    reload() {
      window.location.reload()
    },
    setLinkEdit(item) {
      switch (item.type) {
        case TYPE_SERVICE.RENT:
          router.push({name: 'formEditServiceRent', params: {id: item.fk_servicio.id}}).then(() => {
          });
          break;
        case TYPE_SERVICE.TALLER:
          router.push({name: 'formEditServiceTaller', params: {id: item.fk_servicio.id}}).then(() => {
          });
          break;
        case TYPE_SERVICE.MESSENGER:
          router.push({name: 'editFormServiceMessenger', params: {id: item.fk_servicio.id}}).then(() => {
          });
          break;
      }

    },
    open_modal_delete: function (item) {
      let uri_delete = api_services + item.id + '/';
      let uri_get_data = api_services + this.query;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Servicio Renta`,
        message: `Estás seguro que desea ${action} el servicio renta "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setService(resolve)
        }
      })
    },
    clearFilter() {
      this.filterQuery.type = null
      this.filterQuery.status = null
      this.filterQuery.provider = null
      this.filterQuery.created = null
      this.getServicesList()
    },
    getServicesList() {
      this.query = `?page=${this.paginate.current}`
      if (this.filterQuery.provider) {
        this.query += `&proveedor=${this.filterQuery.provider}`
      }
      if (this.filterQuery.type) {
        this.query += `&type=${this.filterQuery.type}`
      }
      if (this.filterQuery.status) {
        this.query += `&estado=${this.filterQuery.status}`
      }
      if (this.filterQuery.created) {
        this.query += `&created_at=${this.filterQuery.created}`
      }
      this.fetchService(this.query).then((result) => {
        this.desserts = result
      })
    }
  },
  watch: {
    messengerProvider: function () {
      this.filterQuery.provider = this.messengerProvider
    },
    statusFilter: function () {
      this.filterQuery.status = this.statusFilter
    },
    typeFilter: function () {
      this.filterQuery.type = this.typeFilter
    },
    desserts: function () {
      let results = this.desserts
      this.paginate.current = results.page;
      this.paginate.total = results.count;
      this.paginate.perPage = results.page_size;
    },
    'paginate.current': function () {
      this.getServicesList();
    }
  },
  created() {
    this.fetchServiceStats()
        .then(result => {
          this.init = result.init
          this.process = result.process;
          this.finish = result.finish;
          this.total = result.total;
        });
    this.getServicesList();
    this.fetchMessengerProviderList(false)
        .then(value => {
          this.messengerProviderList = value.results
        });
  }
}
</script>

<style scoped lang="scss">
.text-status {
  line-height: 32px;
  text-align: center;
  letter-spacing: 0.5px;
  font-weight: bold;

  &.pending {
    color: #289BA4;
  }

}

.card {
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  color: #FFFFFF;

  &.card-box {
    height: 150px;
  }

  &.card-center {
    margin: 0 15px;
  }

  .title-card {
    font-size: 25px;
  }

  .data-card {
    font-size: 20px;
  }

  .sub-title-card {
    font-size: 14px;
  }
}

.pointer {
  cursor: pointer;
}

.tag:not(body).is-rounded {
  border-radius: 290486px;
  min-width: 125px;
}
</style>
