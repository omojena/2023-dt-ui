<template>
  <div class="content-page">
    <section>
      <top-bar page-title="Areas"/>

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
          <b-table
              :data="isEmpty ? [] : desserts.results"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page="currentPage"
              detailed
              detail-key="id"
              :show-detail-icon="true"
              mobile-cards
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
            </b-table-column>

            <b-table-column field="municipio" label="Municipio" v-slot="props">
              <b-tag type="is-tag-completed" rounded>
                <span class="text-status completed"> {{ props.row.municipality.name }}</span>
              </b-tag>
            </b-table-column>

            <b-table-column field="provincia" label="Provincia" v-slot="props">
              <b-tag type="is-tag-success success" rounded>
                <span class="text-status success"> {{ props.row.province.name }}</span>
              </b-tag>
            </b-table-column>

            <b-table-column field="telefono" label="Telefono" v-slot="props">
             <span class="col bold">
              {{ props.row.phone }}
            </span>

            </b-table-column>

            <b-table-column field="created_by" label="Creado por" v-slot="props">
            <span class="col">
              {{ formatYYYYMMDD(props.row.created) }}
            </span>
            </b-table-column>
            <b-table-column field="updated_by" label="Actualizado por" v-slot="props">
            <span class="col">
              {{ formatYYYYMMDD(props.row.modified) }}
            </span>
            </b-table-column>

            <b-table-column field="action" label="Acciones" v-slot="props">
              <div class="is-flex">
                <router-link :to="{name: 'formEditArea', params:{id:props.row.id}}">
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
                  <div class="column is-9">
                    <div class="is-flex">
                      <div class="is-flex is-flex-direction-column">
                        <span class="label-data">Fecha de Creación: </span>
                        <span class="label-data">Dirección: </span>
                        <span class="label-data">Empresa: </span>
                        <span class="label-data">Tipo de Area: </span>

                      </div>
                      <div class="is-flex is-flex-direction-column ml-40">
                        <span class="item ml-3">{{ props.row.created }}</span>
                        <span class="item ml-3">{{ props.row.address }}</span>
                        <span class="item ml-3">{{ props.row.fk_enterprise.name }}</span>
                        <span class="item ml-3"> {{ props.row.type }} </span>
                        <span class="item ml-3"> {{ props.row.typeOther }} </span>
                      </div>
                    </div>
                  </div>
                  <div class="column is-3">
                    <div class="is-flex is-flex-direction-column">
                      <div class="is-flex is-flex-direction-column ml-40">
                        <span class="label-data">Descripción</span>
                      </div>
                      <div class="is-flex is-flex-direction-column ml-40">
                        <span class="item">{{ props.row.description }}</span>
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
import {api_area} from "@/urls";
import {mapActions, mapMutations} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import SkeletonTable from "@/components/skeleton/skeleton-table";

export default {
  name: 'LAreas',
  components: {SkeletonTable, BTableColumn, BTable, HList, TopBar},
  comments: {},
  data() {
    return {
      search: '',
      checkedRows: [],
      addUrl: '/area/form/',
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
      setAreaList: 'SET_AREAS'
    }),
    ...mapActions({
      confirmDelete: 'CONFIRM_DELETE',
      fetchAreas: 'FETCH_AREAS'
    }),

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

    viewAll() {
      this.isPaginated = !this.isPaginated;
    },
    open_modal_delete: function (item) {
      let uri_delete = api_area + item.id + '/';
      let uri_get_data = api_area;
      let action = item.deleted ? 'recuperar' : 'eliminar';
      let title = item.deleted ? 'Recuperar' : 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Area`,
        message: `Estás seguro que desea ${action} el area "${item.name}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setAreaList(resolve);
        }
      })
    },
    searchIconClick() {
      this.query = this.search ? `?name=${this.search}` : null
      this.fetchAreas(this.query)
          .then(value => {
            this.desserts = value
          })
    },
    getAreas() {
      this.query = `?page=${this.paginate.current}`
      this.fetchAreas(this.query)
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
      this.getAreas();
    }
  },
  created() {
    this.getAreas();
  },


}
</script>

<style scoped lang="scss">
</style>
