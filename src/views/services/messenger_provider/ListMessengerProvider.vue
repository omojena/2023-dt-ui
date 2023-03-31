<template>
  <div class="content-page">
    <section>
      <top-bar is_back page-title="Listado de Proveedores de Mensajeria"/>
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
              detailed
              detail-key="dni"
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

            <b-table-column field="municipio" label="Municipio" v-slot="props">
              <b-tag type="is-tag-completed" rounded>
                <span class="text-status completed"> {{ props.row.municipio.name }}</span>
              </b-tag>
            </b-table-column>

            <b-table-column field="provincia" label="Provincia" v-slot="props">
              <b-tag type="is-tag-success success" rounded>
                <span class="text-status success"> {{ props.row.provincia.name }}</span>
              </b-tag>
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
                <router-link :to="{name: 'formEditMessengerProvider', params:{id:props.row.id}}">
                  <div class="mx-10">
                    <b-icon type="is-primary-light" icon="pencil" class="mx-4 cursor-pointer"></b-icon>
                  </div>
                </router-link>
                <div @click="open_modal_delete(props.row)" class="mx-10">
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
                        <span class="label-data" v-if="props.row.created_at">Fecha de Creación: </span>
                        <span class="label-data" v-if="props.row.direccion">Dirección: </span>
                        <span class="label-data" v-if="props.row.fk_empresa">Empresa: </span>

                      </div>
                      <div class="is-flex is-flex-direction-column ml-40">
                      <span class="item ml-3" v-if="props.row.created_at">{{
                          formatYYYYMMDD(props.row.created_at)
                        }}</span>
                        <span class="item ml-3" v-if="props.row.direccion">{{ props.row.direccion }}</span>
                        <span class="item ml-3" v-if="props.row.fk_empresa">{{ props.row.fk_empresa }}</span>
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
import {mapActions, mapMutations} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import {api_messenger_provider} from "@/urls";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: 'LPerson',
  components: {SkeletonTable, BTableColumn, BTable, HList, TopBar},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/messenger_provider/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      desserts: null,
      typePersonString: null,
      query: null,
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
      setPersonList: 'SET_PERSON_LIST'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchMessengerProviderList: 'FETCH_MESSENGER_PROVIDER_LIST'
    }),
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
    open_modal_delete: function (item) {
      let uri_delete = api_messenger_provider + item.id + '/';
      let uri_get_data = api_messenger_provider;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Provedor`,
        message: `Estás seguro que desea ${action} a "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          this.desserts = await this.confirmDelete()
        }
      })
    },
    getMessengerProvider() {
      this.query = `?page=${this.paginate.current}`
      this.fetchMessengerProviderList(this.query)
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
      this.getMessengerProvider();
    }
  },
  created() {
    this.getMessengerProvider()
  },

}
</script>

<style scoped>

</style>
