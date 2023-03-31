<template>

  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo Almacen':'Editar Almacen'"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Nombre" label-position="on-border">
                <b-input placeholder="Nombre"
                         v-model="warehouse.name"
                         required
                         validation-message="Campo requerido"
                         type="text">
                </b-input>
              </b-field>
              <b-field label="Area" label-position="on-border">
                <multiselect
                    placeholder="Area"
                    v-model="fk_areaValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="areas_list">
                </multiselect>
              </b-field>
              <b-field label="Jefe Almacen" label-position="on-border">
                <multiselect
                    placeholder="Jefe Almacen"
                    v-model="boss_warehouseValue"
                    :custom-label="selectNameText"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_workers">
                </multiselect>
              </b-field>
              <b-field label="Almacenero" label-position="on-border">
                <multiselect
                    placeholder="Almacenero"
                    v-model="worker_warehouseValue"
                    :custom-label="selectNameText"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="list_workers">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">
              <b-checkbox v-model="warehouse.master">Principal?</b-checkbox>
            </div>
          </div>
          <div class="buttons is-pulled-right">
            <b-button @click="save" class="btn-global btn-accept is-rounded form mt-3"><span
                lg-font regular main-color>Guardar</span>
            </b-button>
          </div>
        </section>
      </div>

    </section>
  </div>

</template>

<script>
import {api_almacen} from "@/urls";
import {mapMutations, mapActions} from 'vuex'
import TopBar from "../../../components/top-bar/topBar";
import Multiselect from "vue-multiselect";
import {getStorage} from "@/utils";

export default {
  components: {TopBar, Multiselect},
  watch: {
    fk_areaValue: function () {
      this.fk_area = this.fk_areaValue.id
    },
    boss_warehouseValue: function () {
      this.boss_warehouse = this.boss_warehouseValue.id
    },
    worker_warehouseValue: function () {
      this.worker_warehouse = this.worker_warehouseValue.id
    }
  },
  data: () => ({
    warehouse: {
      id: null,
      name: null,
      master: false,
      boss: null,
      grocer: null,
      fk_area: null,
      fk_enterprise: null
    },
    valid: true,
    post: true,
    item_id: null,
    fk_area: null,
    fk_areaValue: null,
    boss_warehouse: null,
    boss_warehouseValue: null,
    worker_warehouse: null,
    worker_warehouseValue: null,
    areas_list: [],
    list_workers: [],
  }),

  methods: {
    ...mapMutations({
      openModalDelete: 'OPEN_MODAL_DELETE',
      loadUrlDelete: 'LOAD_URL_DELETE',
      loadUrlData: 'LOAD_URL_DATA',
    }),
    ...mapActions({
      getAttributesNomType: 'GET_ATTRIBUTES_NOM_TYPE',
      updateValues: 'UPDATE_VALUES',
      saveWarehouse: 'SAVE_WAREHOUSE',
      editWarehouse: 'EDIT_WAREHOUSE',
      fetchAreas: 'FETCH_AREAS',
      fetchWorkers: 'FETCH_WORKER_LIST',
    }),

    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_almacen}${id}/`)
          .then(item => {
            this.warehouse = item
            this.getAreas()
                .then(value => {
                  this.fk_areaValue = value.find(f => f.id === item.fk_area.id);
                })
            this.getWorkersList()
                .then(value => {
                  this.boss_warehouseValue = value.find(f => f.id === item.boss.id);
                  this.worker_warehouseValue = value.find(f => f.id === item.grocer.id);
                })
            this.fk_enterprise = item.fk_enterprise.id;
            this.item_id = item.id
          });
    },
    selectNameText({user}) {
      return user.first_name
    },
    selectName({name}) {
      return name
    },
    save() {
      this.warehouse.boss = this.boss_warehouse
      this.warehouse.grocer = this.worker_warehouse
      this.warehouse.fk_area = this.fk_area
      this.warehouse.id = this.item_id
      this.warehouse.fk_enterprise = getStorage("enterprise_id", false)
      if (this.post)
        this.saveWarehouse(this.warehouse)
      else
        this.editWarehouse(this.warehouse)
    },
    getWorkersList() {
      return new Promise(resolve => {
        let query = '?page_size=1000';
        this.fetchWorkers(query)
            .then(response => {
              this.list_workers = response.results
              resolve(this.list_workers)
            });
      })

    },
    getAreas() {
      return new Promise(resolve => {
        let query = '?page_size=1000'
        this.fetchAreas(query).then(response => {
          this.areas_list = response.results;
          resolve(this.areas_list)
        })
      })
    },
  },
  created() {
    this.getAreas();
    this.getWorkersList();
    if (this.$route.params.id) {
      this.update_values();
    }

  },
  computed: {},
}
</script>

<style scoped>

</style>