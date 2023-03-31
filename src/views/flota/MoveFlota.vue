<template>
  <div class="content-page">
    <section>
      <top-bar :page-title="post?'Nuevo Movimiento':'Editar Movimiento'"/>
      <div class="mt-3 bg-withe p-5 card">
        <section>
          <div class="columns">
            <div class="column is-half">
              <b-field label="Area Origen" label-position="on-border">
                <multiselect
                    placeholder="Area Origen"
                    v-model="areaFromValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="listArea">
                </multiselect>
              </b-field>
              <b-field label="Bicicletas" label-position="on-border">
                <multiselect
                    placeholder="Bicicletas"
                    v-model="bikeValue"
                    :custom-label="selectNumber"
                    multiple
                    track-by="id"
                    open-direction="bottom"
                    :show-no-results="false"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :options="listBike">
                </multiselect>
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Area destino" label-position="on-border">
                <multiselect
                    placeholder="Area destino"
                    v-model="areaToValue"
                    :custom-label="selectName"
                    open-direction="bottom"
                    :show-no-results="false"
                    :options="listArea">
                </multiselect>
              </b-field>
              <b-field label="Descripción" label-position="on-border">
                                <textarea
                                    v-model="description"
                                    class="textarea"
                                    placeholder="Descripcion"
                                    rows="3"
                                >
                                </textarea>
              </b-field>
            </div>
          </div>

        </section>
        <section v-if="bikes.length">
          <div class="columns is-flex is-justify-content-center"
            v-for="(item, idx) in bikes" :key="idx"
          >
            <div class="column">
              {{ item.nombre }}--{{ item.numero }}
            </div>
            <div class="column is-flex is-justify-content-center">
              {{ areaToValue.nombre }}
            </div>
            <div class="column is-flex is-justify-content-center is-align-items-center">
              <b-button @click="cancel(item.id)">Cancel</b-button>
              <b-button @click="save(item)">Mover</b-button>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>


</template>

<script>
import {api_cuenta} from "@/urls";
import {mapActions} from 'vuex'
import BButton from "buefy/src/components/button/Button";
import Multiselect from "vue-multiselect";
import TopBar from "@/components/top-bar/topBar";
import {TYPE_ACTIVE} from "../../enum/typeActive";

export default {
  components: {TopBar, BButton, Multiselect},
  watch: {
    bikeValue: function () {
      this.bikes = []
      this.bikeValue.forEach(item => {
        this.bikes.push(item)
      });

    },
    areaFromValue:function () {
      this.getBicycleStock(this.areaFromValue.id);
      this.areaFrom = this.areaFromValue.id;
    },
    areaToValue:function () {
      this.areaTo = this.areaToValue.id;
    },
  },
  data: () => ({
    bikes: [],
    bikeValue: [],
    areaToValue: [],
    areaFromValue: [],
    areaFrom: null,
    areaTo: null,
    listArea: [],
    listBike: [],
    description: '',
    valid: true,
    post: true,
    item_id: null,
    fk_enterprise: localStorage.getItem('enterprise_id'),

  }),

  methods: {
    ...mapActions({
      updateValues: 'UPDATE_VALUES',
      saveMov: 'SAVE_MOVE',
      editMov: 'EDIT_ACCOUNT',
      fetchAreas: 'FETCH_AREAS',
      fetBicycleStock: 'FETCH_AFT',
    }),
    selectName({nombre}) {
      return nombre
    },
    selectNumber({numero}) {
      return `Bici->${numero}`
    },
    update_values() {
      let id = this.$route.params.id;
      this.post = false;
      this.updateValues(`${api_cuenta}${id}/`)
          .then(item => {
            this.name = item.nombre;
            this.number = item.numero;
            this.cashType = item.moneda;
            this.accountType = item.type;
            this.fk_enterprise = item.fk_empresa;
            this.description = item.descripcion;
            this.item_id = item.id
          })
    },
    cancel(id){
      let itemIndex = this.bikeValue.findIndex(i => i.id === id);
      this.bikeValue.splice(itemIndex,1);
      this.getBicycleStock(this.areaFrom);
    },
    save(item) {
      console.log(item);
      let mov = {
        oa: 'AFT',
        almacen_origen:item.fk_almacen_id,
        almacen_destino:null,
        fk_objeto_almacen: item.id,
        area_origen: this.areaFrom,
        area_destino: this.areaTo,
        fk_empresa: parseInt(this.fk_enterprise),
        id: this.item_id,
        cantidad:1,
        flag:false,
      };

      if (this.post)
        this.saveMov(mov)
        .then((objectId) => {
          this.cancel(objectId)
        })
        ;
      else
        this.editMov(mov);
    },

    getAreas() {
      let query = '?page_size=1000'
      this.fetchAreas(query).then(value => {
        this.listArea = value.results;
      });
    },
    getBicycleStock(area) {
      let id_area = this.listArea.find(a => a.id === area)
      let query = `?page=1&page_size=1000&tipo_activo=${TYPE_ACTIVE.AFB}`
      this.listBike = [];
      this.fetBicycleStock(query).then(value => {
        value.results.forEach(result => {
          if (result.fk_area_id === id_area.id) {
            this.listBike.push(result)
          }
        })
      })
    },
  },
  created() {
    this.getAreas();
    if (this.$route.params.id) {
      this.update_values();
    }
  }
}
</script>
