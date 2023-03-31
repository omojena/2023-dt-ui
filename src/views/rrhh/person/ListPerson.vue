<template>
  <div class="content-page">
    <section>
      <top-bar is_back page-title="Listado de Personas"/>
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
          <section>
            <div class="columns mb-4 is-flex is-align-items-center">
              <div class="column is-2">
                <b-field label="Nombre" label-position="on-border">
                  <b-input placeholder="Nombre"
                           v-model="filterQuery.name"
                           required
                           validation-message="Campo requerido"
                           type="text">
                  </b-input>
                </b-field>
              </div>
              <div class="column is-2">
                <b-field label="Apellidos" label-position="on-border">
                  <b-input placeholder="Apellidos"
                           v-model="filterQuery.last_name"
                           required
                           validation-message="Campo requerido"
                           type="text">
                  </b-input>
                </b-field>
              </div>
              <div class="column is-2">
                <b-field label="Tipo de Persona" label-position="on-border">
                  <multiselect
                      placeholder="Tipo de Persona"
                      :show-no-results="false"
                      v-model="typePersonValue"
                      :custom-label="selectText"
                      open-direction="bottom"
                      :options="type_person_list">
                  </multiselect>
                </b-field>
              </div>
              <div class="column is-2">
                <b-field label="Provincia" label-position="on-border">
                  <multiselect
                      placeholder="Provincia"
                      v-model="provinceValue"
                      :custom-label="selectName"
                      open-direction="bottom"
                      :show-no-results="false"
                      :options="provinceList">
                  </multiselect>
                </b-field>
              </div>
              <div class="column is-2">
                <b-field label="Municipio" label-position="on-border">
                  <multiselect
                      placeholder="Municipio"
                      v-model="municipalityValue"
                      :custom-label="selectName"
                      open-direction="bottom"
                      :show-no-results="false"
                      :options="municipalityList">
                  </multiselect>
                </b-field>
              </div>
                <div class="column is-1">
                <b-button @click="clearFilter" type="is-primary" rounded>Limpiar</b-button>
              </div>
              <div class="column is-1">
                <b-button @click="getPersonList" type="is-primary-light" rounded>Buscar</b-button>
              </div>
            </div>

          </section>
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

            <b-table-column field="apellidos" label="Apelidos" v-slot="props">
            <span class="col">
              {{ props.row.apellidos }}
            </span>
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
                <router-link :to="{name: 'formEditPerson', params:{id:props.row.id}}">
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
                        <span class="label-data" v-if="props.row.correo">Correo: </span>
                        <span class="label-data" v-if="props.row.dni">CI: </span>

                      </div>
                      <div class="is-flex is-flex-direction-column ml-40">
                      <span class="item ml-3" v-if="props.row.created_at">{{
                          formatYYYYMMDD(props.row.created_at)
                        }}</span>
                        <span class="item ml-3" v-if="props.row.direccion">{{ props.row.direccion }}</span>
                        <span class="item ml-3" v-if="props.row.fk_empresa">{{ props.row.fk_empresa }}</span>
                        <span class="item ml-3" v-if="props.row.correo">{{ props.row.correo }}</span>
                        <span class="item ml-3" v-if="props.row.dni">{{ props.row.dni }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="is-flex">
                      <div class="is-flex is-flex-direction-column">
                        <span class="label-data" v-if="props.row.fecha_nacimiento">Fecha de Nacimiento: </span>
                        <span class="label-data" v-if="props.row.nacionalidad">Nacionalidad: </span>
                        <span class="label-data" v-if="props.row.telefono">Telefono: </span>
                        <span class="label-data">Tipo de persona: </span>

                      </div>
                      <div class="is-flex is-flex-direction-column ml-40">
                        <span class="item ml-3" v-if="props.row.fecha_nacimiento">{{
                            props.row.fecha_nacimiento
                          }}</span>
                        <span class="item ml-3" v-if="props.row.nacionalidad">{{ props.row.nacionalidad }}</span>
                        <span class="item ml-3" v-if="props.row.telefono">{{ props.row.telefono }}</span>
                        <span class="item ml-3" v-for="(value, idx) in props.row.fk_tipo_persona"
                              :key="idx">
                    <li>{{ value.nombre }}</li>
                  </span>
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
import {mapMutations, mapActions, mapGetters} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import HList from "../../../components/header-list/headerList";
import BTable from "buefy/src/components/table/Table";
import BTableColumn from "buefy/src/components/table/TableColumn";
import {api_persona} from "@/urls";
import SkeletonTable from "@/components/skeleton/skeleton-table";
import Multiselect from "vue-multiselect";

export default {
  name: 'LPerson',
  components: {SkeletonTable, BTableColumn, BTable, HList, TopBar, Multiselect},
  comments: {},
  data() {
    return {
      search: '',
      addUrl: '/person/form/',
      isEmpty: false,
      isPaginated: false,
      currentPage: 1,
      perPage: 5,
      typePersonString: null,
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
      filterQuery: {
        name: null,
        last_name: null,
        province: null,
        municipality: null,
        type_person: null
      },
      provinceValue: null,
      municipalityValue: null,
      typePersonValue: null,
      municipalityList: [],
      type_person_list: [],
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
      fetchPersonList: 'FETCH_PERSON_LIST',
      fetchTypePersons: 'FETCH_TYPE_PERSON',
      fetchProvinceList: 'FETCH_PROVINCE_LIST',
      fetchMunicipality: 'FETCH_MUNICIPALITY_LIST'
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
    selectName({name}) {
      return name
    },
    selectText({nombre}) {
      return nombre
    },
    open_modal_delete: function (item) {
      let uri_delete = api_persona + item.id + '/';
      let uri_get_data = api_persona;
      let action = item.deleted ? 'recuperar': 'eliminar';
      let title = item.deleted ? 'Recuperar': 'Eliminando';
      this.$buefy.dialog.confirm({
        title: `${title} Persona`,
        message: `Estás seguro que desea ${action} a "${item.nombre}"`,
        confirmText: 'Confirmar',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: async () => {
          this.loadUrlDelete(uri_delete);
          this.loadUrlData(uri_get_data);
          let resolve = await this.confirmDelete();
          this.desserts = resolve
          this.setPersonList(resolve)
        }
      })
    },
    getPerson() {
      this.query = `?page=${this.paginate.current}`
      this.fetchPersonList(this.query)
          .then(value => {
            this.desserts = value
          })
    },
    clearFilter() {
      this.filterQuery.name = null
      this.provinceValue = null
      this.municipalityValue = null
      this.typePersonValue = null
      this.filterQuery.last_name = null
      this.filterQuery.province = null
      this.filterQuery.municipality = null
      this.filterQuery.type_person = null
      this.getServicesList()
    },
    getPersonList() {
      this.query = `?page=${this.paginate.current}`
      if (this.filterQuery.name) {
        this.query += `&nombre=${this.filterQuery.name}`
      }
      if (this.filterQuery.last_name) {
        this.query += `&apellidos=${this.filterQuery.last_name}`
      }
      if (this.filterQuery.province) {
        this.query += `&provincia=${this.filterQuery.province}`
      }
      if (this.filterQuery.municipality) {
        this.query += `&municipio=${this.filterQuery.municipality}`
      }
      if (this.filterQuery.type_person) {
        this.query += `&type_person=${this.filterQuery.type_person}`
      }
      this.fetchPersonList(this.query).then((result) => {
        this.desserts = result
      })
    },
    getTypePerson() {
      this.query = `?page=${this.paginate.current}&page_size=1000`
      this.fetchTypePersons(this.query)
          .then(response => {
            response.results.forEach(tp => {
              this.type_person_list.push({nombre: tp.nombre, id: tp.id});
            });
          });
    },
  },
  computed: {
    ...mapGetters({
      provinceList: 'GET_PROVINCE_LIST'
    })
  },
  watch: {
    desserts: function () {
      let results = this.desserts
      this.paginate.current = results.page;
      this.paginate.total = results.count;
      this.paginate.perPage = results.page_size;
    },
    'paginate.current': function () {
      this.getPersonList();
    },
    provinceValue: async function () {
      this.filterQuery.province = this.provinceValue.id
      this.municipalityList = await this.fetchMunicipality(this.provinceValue.id)
    },
    municipalityValue: async function () {
      this.filterQuery.municipality = this.municipalityValue.id
    },
    typePersonValue: function () {
      this.filterQuery.type_person = this.typePersonValue.id
      console.log(this.filterQuery.type_person);

    }
  },
  created() {
    this.getPerson();
    this.fetchProvinceList(`?page=1&page_size=10000`);
    this.getTypePerson();
  },

}
</script>

<style scoped>

</style>
