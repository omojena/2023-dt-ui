<template>
  <div class="content-page">
    <section>
      <top-bar is_back page-title="Incidencias"/>
      <div class="mt-3 bg-withe p-5">
        <section v-if="!desserts">
          <skeleton-table/>
        </section>
        <section v-else>
          <h-list v-if="desserts" :go-to-url="addUrl"
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
              detailed
              detail-key="id"
              :show-detail-icon="true"
              :row-class="(row, index) => row.deleted && 'is-danger'"
              mobile-cards>

            <b-table-column field="nombre" label="Nombre" v-slot="props">
              <template>
                <a class="col details" @click="props.toggleDetails(props.row)">
                  {{ props.row.nombre }}
                </a>
              </template>
            </b-table-column>

            <b-table-column field="fk_tipo_incidencia" label="Tipo" v-slot="props">
              <span class="col">
                {{ props.row.fk_tipo_incidencia.nombre }}
              </span>
            </b-table-column>

            <b-table-column field="action" label="Acciones" v-slot="props">
              <div class="is-flex">
                <router-link :to="{name: 'formEditIncidents', params:{id:props.row.id}}">
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
              <section>
                <div class="columns">
                  <div class="column is-6">
                    <div class="is-flex">
                      <div class="is-flex is-flex-direction-column">
                        <span class="label-data" v-if="props.row.fk_persona">Involucrados: </span>

                      </div>
                      <div class="is-flex is-flex-direction-column ml-40" v-if="props.row.fk_persona">
                        <span v-for="(item, idx) in props.row.fk_persona" :key="idx"
                            class="item ml-3" >{{ item.nombre }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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

      </div>
    </section>
  </div>
</template>
<script>
import {api_incidencia} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import TopBar from "../../../components/top-bar/topBar";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: 'LTask',
  components: {SkeletonTable, TopBar, BTableColumn, BTable, HList},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/incidents/form/',
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
      setIncidents: 'SET_INCIDENTS'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchIncidents: 'FETCH_INCIDENTS'
    }),

    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = api_incidencia + item.id + '/';
      let uri_get_data = api_incidencia;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Incidencia`,
        message: `Estás seguro que desea ${action} la incidencia "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setIncidents(resolve);
        }
      })
    },
    getIncidents() {
      this.query = `?page=${this.paginate.current}`
      this.fetchIncidents(this.query)
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
      this.getIncidents();
    }
  },

  created() {
    this.getIncidents();
  },

}
</script>

<style scoped>

</style>
